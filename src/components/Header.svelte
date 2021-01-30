<script lang="ts">
import { onMount } from "svelte";
import type { User, Repo } from "../utils/types";
export let user: User;
export let repos: Repo[] = [];
export let selectedTopic: string;
export let onTopicSelect: (topic: string | null) => void;
let topics: [string, number][] = [];

const onTopicClick = (topic: string) => {
  if (selectedTopic === topic) {
    // https://stackoverflow.com/a/28155967
    history.replaceState({}, document.title, ".");
    onTopicSelect("");
    return false;
  }

  window.location.hash = `#${window.escape(topic)}`;
  onTopicSelect(topic);
  return false;
};

onMount(() => {
  const map = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.topics) {
      continue;
    }
    for (const topic of repo.topics) {
      const count = map.get(topic);
      map.set(topic, count ? count + 1 : 1);
    }
  }
  for (const topic of map.entries()) {
    topics.push(topic);
  }
  topics.sort((a, b) => {
    if (a[1] !== b[1]) {
      return b[1] - a[1];
    }
    return a[0].localeCompare(b[0]);
  });
  topics = topics;
});
</script>

<div class="pagehead">
  <h1 id="title">{user.name} Open Source</h1>
  <a id="github" href="{user.html_url}" target="_blank">
    {user.html_url.substr(8)}
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
        class="{selectedTopic === topic[0] ? ['selected'] : null}"
        on:click="{() => onTopicClick(topic[0])}">
        {topic[0]} <strong>{topic[1]}</strong>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
@import "../styles/vars.scss";

$divider-color: $green;

.pagehead {
  position: relative;
  padding-top: 40px;
  padding-bottom: 13px;
  border-bottom: 2px solid $divider-color;
  display: flex;
  justify-content: space-between;

  h1 {
    font-size: 24px;
    font-weight: bold;
    padding-top: 16px;
    padding-bottom: 16px;
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
  border-bottom: 2px solid $divider-color;
  padding-top: 46px;
  padding-bottom: 36px;

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
    margin-top: 6px;

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
      border: 2px solid $green;

      &:hover {
        border-color: $white;
        color: $white;
      }
      strong {
        font-weight: bold;
      }
    }
    :global(li.selected) {
      border-color: $white;
      color: $white;
    }
  }
}
</style>
