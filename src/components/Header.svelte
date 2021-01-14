<script lang="ts">
  import type { User } from "../utils/types";
  export let user: User;
</script>

{#if user}
<div class="pagehead">
  <h1 id="title">{user.name} Open Source</h1>
  <a id="github" href={user.html_url} target="_blank">
    {user.html_url.substr(8)}
  </a>
</div>

<div class="profile">
  <p id="description">
    {user.bio}
    <br/>
    Here are some projects I have contributed to the community.
  </p>
</div>
{/if}

<style lang="scss">
  @import '../styles/vars.scss';

  .pagehead {
    position: relative;
    padding-top: 40px;
    padding-bottom: 13px;
    border-bottom: 1px solid #e1e4e8;
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: 24px;
      font-weight: 300;
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
    border-bottom: 1px solid #e1e4e8;
    padding-top: 46px;
    padding-bottom: 36px;

    p {
      font-size: 18px;
      width: 76%;
      margin: auto;
      text-align: center;
    }
  }
</style>
