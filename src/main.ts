/// <reference path="../node_modules/svelte/types/runtime/index.d.ts" />
import "./styles/main.scss";
import App from "./App.svelte";

const app = new App({
  target: document.body,
});

export default app;
