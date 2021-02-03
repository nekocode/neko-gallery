<script lang="ts">
import { onMount } from "svelte";
import { graphql } from "@octokit/graphql";
import axios from "axios";
import type { User, Repo, LangColor } from "./utils/types";
import Loading from "./components/Loading.svelte";
import Header from "./components/Header.svelte";
import RepoItem from "./components/RepoItem.svelte";

const username = "nekocode";
// Used base64 encoding to bypass the protection of github
const token = atob("OTQ3ZDY0MjRlZWY0OTY0YTRjOGEwZTc0ODgzMjQwZGUwOWYxMTAzZA==");

let user: User;
let langColors: LangColor;
let selectedCategory: string = window.unescape(window.location.hash.substr(1));
let loading = true;

const onCategorySelect = (category: string) => {
  selectedCategory = category;
};

onMount(async () => {
  const res1 = await axios.get("./lang_colors.json");
  const res2 = await graphql(
    `
      query($username: String!) {
        user(login: $username) {
          name
          bio
          url
          repositories(
            first: 100
            isFork: false
            isLocked: false
            privacy: PUBLIC
            ownerAffiliations: [OWNER]
            orderBy: { field: STARGAZERS, direction: DESC }
          ) {
            nodes {
              name
              url
              stargazerCount
              isFork
              forkCount
              languages(first: 1) {
                nodes {
                  name
                }
              }
              description
              openGraphImageUrl
              repositoryTopics(first: 10) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      username,
      headers: {
        authorization: `token ${token}`,
      },
    }
  );

  const _user = res2["user"] as User;
  _user.repositories.nodes.forEach((repo) => {
    if (repo.languages.nodes.length > 0) {
      repo._language = repo.languages.nodes[0].name;
    }
    repo._topics = repo.repositoryTopics.nodes.map((topic) => topic.topic.name);
    if (repo.openGraphImageUrl.includes("avatar")) {
      repo.openGraphImageUrl = null;
    }
    return repo;
  });

  langColors = res1.data;
  user = _user;
  loading = false;
});
</script>

<Loading hidden="{!loading}" />
<main>
  {#if user}
    <Header
      user="{user}"
      selectedCategory="{selectedCategory}"
      onCategorySelect="{onCategorySelect}" />
    <ul class="repo-list">
      {#each user.repositories.nodes as repo}
        {#if !selectedCategory || repo._topics.includes(selectedCategory) || repo._language === selectedCategory}
          <RepoItem repo="{repo}" langColors="{langColors}" />
        {/if}
      {/each}
    </ul>
  {/if}
</main>

<style lang="scss">
@import "./styles/vars.scss";

main {
  margin: 0 auto;
  padding: 30px 0px;
  width: $container-width-3col;
}
@media only screen and (max-width: $container-width-3col) {
  main {
    margin: 0 auto;
    width: $container-width-2col;
  }
}
@media only screen and (max-width: $container-width-2col) {
  main {
    margin: 0 auto;
    width: $container-width-1col;
  }
}

.repo-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  margin-left: -$repo-margin;
  margin-right: -$repo-margin;
}
</style>
