<script lang="ts">
import type { Repo, LangColor } from "../utils/types";
export let repo: Repo;
export let langColors: LangColor = {};

// https://stackoverflow.com/a/2901298/5729581
function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getLangColor(lang: string): string {
  const c = langColors[lang];
  if (c && c["color"]) {
    return c["color"];
  }
  return "#DDD";
}
</script>

<li class="repo-item">
  <!-- svelte-ignore a11y-missing-content -->
  <a href="{repo.url}" target="_blank"></a>
  {#if repo.openGraphImageUrl}
    <div class="repo-preview">
      <img src="{repo.openGraphImageUrl}" alt="preview" />
    </div>
  {/if}
  <div class="repo-content">
    <h2>{repo.name}</h2>
    <div class="repo-info">
      <span id="starts-info">
        <svg
          aria-label="stars"
          class="octicon"
          height="16"
          role="img"
          version="1.1"
          viewBox="0 0 14 16"
          width="14">
          <path
            fill-rule="evenodd"
            d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"
          ></path>
        </svg>
        {numberWithCommas(repo.stargazerCount)}
      </span>
      <span id="forks-info">
        <svg
          aria-label="forks"
          class="octicon"
          height="16"
          role="img"
          version="1.1"
          viewBox="0 0 10 16"
          width="10">
          <path
            fill-rule="evenodd"
            d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
          ></path>
        </svg>
        {numberWithCommas(repo.forkCount)}
      </span>
      {#if repo._language}
        <span class="language">
          <i
            class="repo-language-color"
            style="background-color: {getLangColor(repo._language)}"></i>
          {repo._language}
        </span>
      {/if}
    </div>
    <p>{repo.description}</p>
    {#if repo._topics.length > 0}
      <ul>
        {#each repo._topics as topic}
          <li>{topic}</li>
        {/each}
      </ul>
    {/if}
  </div>
</li>

<style lang="scss">
@import "../styles/vars.scss";
$icon-margin-right: 1px;

.repo-item {
  position: relative;
  width: $repo-width;
  margin-left: $repo-margin;
  margin-right: $repo-margin;
  margin-bottom: 20px;
  font-size: 12px;
  cursor: pointer;
  border: $repo-border-width solid $foreground;
  transition: $transition;

  $preview-width: $repo-width;
  $preview-height: calc($repo-width / 2);
  .repo-preview {
    width: $preview-width;
    height: $preview-height;
    overflow: hidden;

    img {
      width: $preview-width;
      height: $preview-height;
      transition: $transition;
    }
    & + .repo-content {
      padding-top: 0px;
    }
  }
  .repo-content {
    padding: 16px;
  }

  &:hover {
    border-color: $active;
    color: $active;

    $preview-width-hover: $preview-width * 1.1;
    $preview-height-hover: $preview-height * 1.1;
    .repo-preview img {
      width: $preview-width-hover;
      height: $preview-height-hover;
    }
  }
}
a {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
h2 {
  font-size: 16px;
  font-weight: bold;
}
.repo-info {
  margin-top: 6px;
  span {
    font-weight: bold;
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
  width: 10px;
  height: 10px;
  border: 1px solid $active;
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
    font-weight: bold;

    line-height: 20px;
    padding: 0 8px;
    border: 2px solid $foreground;
    border-color: inherit !important;
  }
}
</style>
