<script lang="ts">
import { onMount } from "svelte";
import { Octokit } from "@octokit/rest";
import axios from "axios";
import type { User, Repo, LangColor } from "./utils/types";
import Loading from "./components/Loading.svelte";
import Header from "./components/Header.svelte";
import RepoItem from "./components/RepoItem.svelte";
import { fakeRepos, fakeUser } from "./fake_data";

const username = "nekocode";
const octokit = new Octokit({
  previews: ["mercy-preview"],
});

let user: User;
let repos: Repo[] = [];
let langColors: LangColor;
let selectedTopic: string = window.unescape(window.location.hash.substr(1));
let loading = true;

const onTopicSelect = (topic: string) => {
  selectedTopic = topic;
};

onMount(async () => {
  const res1 = await axios.get("./lang_colors.json");
  const res2 = await octokit.users.getByUsername({
    username,
  });
  const res3 = await octokit.repos.listForUser({
    username,
    per_page: 200,
  });

  langColors = res1.data;
  user = res2.data;
  repos = res3.data;
  loading = false;
});
</script>

<Loading hidden="{!loading}" />
<main>
  {#if user}
    <Header
      user="{user}"
      repos="{repos}"
      selectedTopic="{selectedTopic}"
      onTopicSelect="{onTopicSelect}" />
  {/if}
  <ul class="repo-list">
    {#each repos as repo}
      {#if !selectedTopic || repo.topics.includes(selectedTopic)}
        <RepoItem repo="{repo}" langColors="{langColors}" />
      {/if}
    {/each}
  </ul>
</main>

<style lang="scss">
@import "./styles/vars.scss";

main {
  margin: 0 auto;
  padding-bottom: 50px;
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
  margin-top: 46px;
  margin-bottom: 0;
}
</style>
