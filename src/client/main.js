import { createApp } from "vue";
import App from "@client/App.vue";
import { createPinia } from "pinia";
import "normalize.css";
import "@client/assets/base.css";

createApp(App).use(createPinia()).mount("#app");
