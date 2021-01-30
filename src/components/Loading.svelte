<script lang="ts">
export let hidden: boolean = false;
</script>

<div id="splash" class="{hidden ? ['hidden'] : null}">
  <div class="content">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
    <div class="text-hint">Gallery is now loading...</div>
  </div>
</div>

<style lang="scss">
@import "../styles/vars.scss";

#splash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $background;
  color: $foreground;
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s linear;
}
:global(#splash.hidden) {
  opacity: 0;
  z-index: -1;
  visibility: hidden;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.text-hint {
  margin-top: 10px;
  font-weight: bold;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid $foreground;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
