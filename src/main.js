import "./assets/main.css";

import { createApp } from "vue";
import { pageTitle } from "vue-page-title";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(pageTitle({ router }));

app.mount("#app");
