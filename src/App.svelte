<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios';
  import Repo from './components/Repo.svelte';
  import { fakeRepos } from './fake_data';
  let repos = [];
  let langColors = {};

  onMount(() => {
    axios.get('./lang_colors.json')
      .then(function (response) {
        langColors = response.data;
        repos = fakeRepos;
      })
      .catch(function (error) {
        console.log(error);
      });
  });
</script>

<main>
  <ul class="repo-list">
  {#each repos as repo}
    <Repo repo={repo} langColors={langColors} />
  {/each}
  </ul>
</main>

<style lang="scss">
  @import './styles/vars.scss';
  $container-width-3: #{$repo-final-width * 3 + $repo-margin * 4};
  $container-width-2: #{$repo-final-width * 2 + $repo-margin * 2};
  $container-width-1: $repo-final-width;

  main {
    margin: 0 auto;
    width: $container-width-3;
  }
  @media only screen and (max-width: $container-width-3) {
    main {
      margin: 0 auto;
      width: $container-width-2;
    }
  }
  @media only screen and (max-width: $container-width-2) {
    main {
      margin: 0 auto;
      width: $container-width-1;
    }
  }

  .repo-list {
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    margin-left: -40px;
    margin-right: -40px;
    margin-top: 0;
    margin-bottom: 0;
  }
</style>