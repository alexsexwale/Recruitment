import Vue from "vue";
import Vuex from 'vuex';
import InboundPayment from "./modules/payment/inbound/store";
import OutboundPayment from "./modules/payment/outbound/store";
import Login from "./modules/login/store";
import Forgot from "./modules/forgot/store";
import Register from "./modules/register/store";
import Feedback from "./modules/feedback/store";
import Support from "./modules/support/store";
import Micro from "./modules/dashboard/client/jobs/micro/store";
Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        InboundPayment,
        OutboundPayment,
        Login,
        Forgot,
        Register,
        Feedback,
        Support,
        Micro
    }
});