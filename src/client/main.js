import { createApp } from "vue";
import App from "@/App.vue";
import { createPinia } from "pinia";
import "normalize.css";
import "@/assets/base.css";

createApp(App).use(createPinia()).mount("#app");
