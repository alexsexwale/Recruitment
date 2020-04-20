import Vue from "vue";
import { firestorePlugin } from 'vuefire';
import DashboardPlugin from "./material-dashboard";
import { Carousel, CarouselItem } from 'element-ui';

// plugins
import App from "./App.vue";
import Chartist from "chartist";
import ElementUI from 'element-ui';

// router setup
import router from "./routes/routes";

import firebase from "firebase/app";

Vue.config.productionTip = false;
Vue.use(Carousel);
Vue.use(CarouselItem);

// plugin setup
Vue.use(DashboardPlugin);
Vue.use(firestorePlugin);

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
