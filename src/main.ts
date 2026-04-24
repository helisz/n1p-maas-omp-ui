// [AI_START TIMESTAMP=2025-06-15 12:00:00]
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./stores/auth";
import { globalComponentsPlugin } from "./components";
import "./style.css";

console.log(
  "%c N1P MaaS OMP UI ",
  "background: #000000; color: #ffffff; font-size: 14px; font-weight: bold; padding: 6px 12px; border-radius: 4px;",
);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

const auth = useAuthStore();
auth.restoreSession();

app.use(globalComponentsPlugin);
app.use(router);
app.mount("#app");
// [AI_END LINES=19 TIMESTAMP=2025-06-15 12:00:00]
