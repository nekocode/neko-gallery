<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  let hint: HTMLElement;

  const onResize = () => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    hint.innerText = `${width}x${height}`;
  };

  onMount(() => {
    onResize();
    window.addEventListener('resize', onResize);
  });
  onDestroy(() => {
    window.removeEventListener('resize', onResize);
  });
</script>

<main>
  <div class='hint' bind:this={hint}></div>
  <div>Hello world!</div>
</main>

<style lang="scss">
  main {
    div {
      color: #fff;
      font-size: 22px;

      &.hint {
        font-size: 12px;
      }
    }
  }
</style>