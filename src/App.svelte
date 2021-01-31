<script lang="ts">
import { onMount } from "svelte";
import { Octokit } from "@octokit/rest";
import axios from "axios";
import type { User, Repo, LangColor } from "./utils/types";
import Loading from "./components/Loading.svelte";
import Header from "./components/Header.svelte";
import RepoItem from "./components/RepoItem.svelte";

const username = "nekocode";
const octokit = new Octokit({
  previews: ["mercy-preview"],
});

let user: User;
let repos: Repo[] = [];
let langColors: LangColor;
let selectedCategory: string = window.unescape(window.location.hash.substr(1));
let loading = true;

const onCategorySelect = (category: string) => {
  selectedCategory = category;
};

onMount(async () => {
  const res1 = await axios.get("./lang_colors.json");
  const res2 = await octokit.users.getByUsername({
    username,
  });
  const res3 = await octokit.repos.listForUser({
    username,
    type: "owner",
    per_page: 100,
  });

  langColors = res1.data;
  user = res2.data;
  repos = res3.data
    .filter((a) => !a.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
  loading = false;
});
</script>

<Loading hidden="{!loading}" />
<main>
  {#if user}
    <Header
      user="{user}"
      repos="{repos}"
      selectedCategory="{selectedCategory}"
      onCategorySelect="{onCategorySelect}" />
  {/if}
  <ul class="repo-list">
    {#each repos as repo}
      {#if !selectedCategory || repo.topics.includes(selectedCategory) || repo.language === selectedCategory}
        <RepoItem repo="{repo}" langColors="{langColors}" />
      {/if}
    {/each}
  </ul>
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
