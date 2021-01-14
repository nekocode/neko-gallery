<script lang="ts">
  import type { Repo } from "../utils/types";
  export let repo: Repo;
  export let langColors: {
    [key: string]: {
      'color'?: string;
    }
  } = {};

  // https://stackoverflow.com/a/2901298/5729581
  function numberWithCommas(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function getLangColor(lang: string): string {
    const c = langColors[lang];
    if (c && c['color']) {
      return c['color'];
    }
    return '#DDD';
  }
</script>

<li class="repo-item">
  <!-- svelte-ignore a11y-missing-content -->
  <a href={repo.html_url} target="_blank"></a>
  <h3>{repo.name}</h3>
  <div class="repo-info">
    <span id="starts-info">
      <svg aria-label="stars" class="octicon" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>
      {numberWithCommas(repo.stargazers_count)}
    </span>
    <span id="forks-info">
      <svg aria-label="forks" class="octicon" height="16" role="img" version="1.1" viewBox="0 0 10 16" width="10"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
      {numberWithCommas(repo.forks_count)}
    </span>
    {#if repo.language}
    <span class="language">
      <i class="repo-language-color" style="background-color: {getLangColor(repo.language)}"></i>
      {repo.language}
    </span>
    {/if}
  </div>
  <p>{repo.description}</p>
  {#if repo.topics && repo.topics.length > 0}
  <ul>
    {#each repo.topics as topic}
      <li>{topic}</li>
    {/each}
  </ul>
  {/if}
</li>

<style lang="scss">
  @import '../styles/vars.scss';
  $icon-margin-right: 2px;

  .repo-item {
    position: relative;
    width: $repo-width;
    padding: $repo-padding;
    margin-left: $repo-margin;
    margin-right: $repo-margin;
    margin-bottom: 20px;
    border-radius: 3px !important;
    font-size: 12px;
    color: #586069;

    border: $repo-border-width solid #e1e4e8;
    border-radius: 6px;

    &:hover {
      cursor: pointer;
      background: #f5f5f5;
    }
  }

  a {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  h3 {
    font-size: 14px;
    font-weight: 600 !important;
    color: #3e8cb7;
  }
  .repo-info {
    margin-top: 6px;
    span {
      margin-right: 12px;
    }
  }
  .octicon {
    display: inline-block;
    vertical-align: text-bottom;
    fill: currentColor;
    margin-right: $icon-margin-right;
  }
  .repo-language-color {
    position: relative;
    top: 2px;
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 1px solid var(--color-repo-language-color-border);
    border-radius: 50%;
    margin-right: $icon-margin-right;
  }
  p {
    margin-top: 4px;
  }

  ul {
    list-style: none;
    margin-top: 6px;

    li {
      display: inline-block;
      position: relative;
      margin-right: 4px;
      margin-top: 4px;
      font-size: 12px;
      color: #0366d6;

      line-height: 20px;
      padding: 0 8px;
      background-color: #f1f8ff;
      border-radius: 2em;
    }
  }
</style>
