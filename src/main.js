import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/router";
import "../node_modules/materialize-css/dist/css/materialize.min.css";
import "../node_modules/materialize-css/dist/js/materialize.min.js";
import "./assets/index.css";
import TheLoader from "../src/components/TheLoader.vue";
import tooltipDirective from "./directives/tooltip.directive";
import { errors } from "./utils/errors";
import ThePagination from "../src/components/ThePagination.vue"
import { i18nPlugin } from "./plugins/i18n.plugin";


const app = createApp(App);
const pinia = createPinia();

app.config.errorHandler = (error) => {errors(error)};

app
.use(pinia)
.use(router)
.use(i18nPlugin)
.component("ThePagination", ThePagination)
.component("TheLoader", TheLoader)
.directive("tooltip", tooltipDirective)
.mount("#app");
