import Vue from "vue";
import { store } from './store/store';
import { firestorePlugin } from 'vuefire';
import DashboardPlugin from "./material-dashboard";
import { Carousel, CarouselItem } from 'element-ui';
import Notifications from './components/NotificationPlugin';

// plugins
import App from "./App.vue";
import Chartist from "chartist";
import ElementUI from 'element-ui';

// router setup
import router from "./routes/routes";

import firebase from "firebase/app";
require('firebase/auth');

Vue.config.productionTip = false;
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Notifications);

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
      store,
      el: "#app",
      render: h => h(App),
      router,
      data: {
        Chartist: Chartist
      }
    });
  }
});
