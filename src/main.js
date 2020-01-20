import Vue from "vue";
import DashboardPlugin from "./material-dashboard";

// plugins
import App from "./App.vue";
import Chartist from "chartist";

// router setup
import router from "./routes/routes";

import firebase from "firebase/app";

Vue.config.productionTip = false;

// plugin setup
Vue.use(DashboardPlugin);

// global library setup
Object.defineProperty(Vue.prototype, "$Chartist", {
  get() {
    return this.$root.Chartist;
  }
});

let app = null;

firebase.auth().onAuthStateChanged(() => {
  // init app if not already created
  if (!app) {
    app = new Vue({
      el: "#app",
      render: h => h(App),
      router,
      data: {
        Chartist: Chartist
      }
    });
  }
});
