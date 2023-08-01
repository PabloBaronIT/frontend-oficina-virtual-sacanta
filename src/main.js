import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import vue3GoogleLogin from "vue3-google-login";
import { plugin, defaultConfig } from "@formkit/vue";
import { GOOGLE_CLIENT_ID } from "./env";
import "bootstrap/dist/css/bootstrap.css";
import "@formkit/themes/genesis";
import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App)
  .use(plugin, defaultConfig)
  .use(store)
  .use(router)
  .use(vue3GoogleLogin, {
    clientId: GOOGLE_CLIENT_ID,
    buttonConfig: { theme: "filled_blue", shape: "rectangular" },
  })
  .mount("#app");
