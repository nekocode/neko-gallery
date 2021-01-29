<script lang="ts">
import { onMount } from "svelte";
import { Octokit } from "@octokit/rest";
import axios from "axios";
import type { User, Repo, LangColor } from "./utils/types";
import Header from "./components/Header.svelte";
import RepoItem from "./components/RepoItem.svelte";
import { fakeRepos, fakeUser } from "./fake_data";

const octokit = new Octokit({
  previews: ["mercy-preview"],
});
let user: User;
let repos: Repo[] = [];
let langColors: LangColor;
let selectedTopic: string = window.unescape(window.location.hash.substr(1));

const onTopicSelect = (topic: string) => {
  selectedTopic = topic;
};

onMount(() => {
  axios
    .get("./lang_colors.json")
    .then(function (response) {
      langColors = response.data;
      user = fakeUser;
      repos = fakeRepos;
    })
    .catch(function (error) {
      console.log(error);
    });
});
</script>

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
