<script lang="ts">
import { onMount } from "svelte";
import type { User, Repo } from "../utils/types";
export let user: User;
export let selectedCategory: string;
export let onCategorySelect: (category: string | null) => void;
let topics: [string, number][] = [];
let langs: [string, number][] = [];

const onCategoryClick = (category: string) => {
  if (selectedCategory === category) {
    // https://stackoverflow.com/a/28155967
    history.replaceState({}, document.title, ".");
    onCategorySelect(null);
    return false;
  }

  window.location.hash = `#${window.escape(category)}`;
  onCategorySelect(category);
  return false;
};

onMount(() => {
  const topicMap = new Map<string, number>();
  const langMap = new Map<string, number>();
  for (const repo of user.repositories.nodes) {
    if (repo._topics) {
      for (const topic of repo._topics) {
        const count = topicMap.get(topic);
        topicMap.set(topic, count ? count + 1 : 1);
      }
    }
    if (repo._language) {
      const count = langMap.get(repo._language);
      langMap.set(repo._language, count ? count + 1 : 1);
    }
  }

  for (const topic of topicMap.entries()) {
    topics.push(topic);
  }
  topics.sort((a, b) => {
    if (a[1] !== b[1]) {
      return b[1] - a[1];
    }
    return a[0].localeCompare(b[0]);
  });

  for (const lang of langMap.entries()) {
    langs.push(lang);
  }
  langs.sort((a, b) => {
    if (a[1] !== b[1]) {
      return b[1] - a[1];
    }
    return a[0].localeCompare(b[0]);
  });

  topics = topics;
  langs = langs;
});
</script>

<div class="pagehead">
  <h1 id="title">{user.name} Open Source</h1>
  <a id="github" href="{user.url}" target="_blank">
    {user.url.substr(8)}
  </a>
</div>

<div class="profile">
  <p id="description">
    {user.bio}
    <br />
    Here are some projects I have contributed to the community.
  </p>
  <ul>
    {#each topics as topic}
      <li
        class="{selectedCategory === topic[0] ? ['selected'] : null}"
        on:click="{() => onCategoryClick(topic[0])}">
        {topic[0]} <strong>{topic[1]}</strong>
      </li>
    {/each}
  </ul>
  <ul>
    {#each langs as lang}
      <li
        class="{selectedCategory === lang[0] ? ['selected'] : null}"
        on:click="{() => onCategoryClick(lang[0])}">
        {lang[0]} <strong>{lang[1]}</strong>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
@import "../styles/vars.scss";

$divider-color: $foreground;

.pagehead {
  position: relative;
  display: flex;
  justify-content: space-between;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin: auto;
    width: 100%;
    text-align: left;
  }

  a {
    margin: auto;
    width: 100%;
    text-align: right;
  }
}
@media only screen and (max-width: $container-width-2col) {
  .pagehead {
    text-align: center;
    display: block;

    h1 {
      text-align: center;
    }
  }
}

.profile {
  border-top: 2px solid $divider-color;
  border-bottom: 2px solid $divider-color;
  padding: 30px 0px;
  margin: 30px 0px;

  p {
    font-size: 18px;
    width: 80%;
    margin: auto;
    text-align: center;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    list-style: none;
    width: 80%;
    margin: 10px auto 0px auto;

    li {
      display: inline-block;
      position: relative;
      margin-right: 6px;
      margin-top: 6px;
      font-size: 12px;
      font-weight: bold;
      user-select: none;
      cursor: pointer;

      line-height: 20px;
      padding: 0 8px;
      border: 2px solid $foreground;

      &:hover {
        border-color: $active2;
        color: $active2;
      }
      strong {
        font-weight: bold;
      }
    }
    :global(li.selected) {
      border-color: $active;
      color: $active;
    }
  }
}
</style>
