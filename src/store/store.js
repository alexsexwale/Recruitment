import Vue from "vue";
import Vuex from 'vuex';
import InboundPayment from "./modules/payment/inbound/store";
import OutboundPayment from "./modules/payment/outbound/store";
import Login from "./modules/login/store";
import Forgot from "./modules/forgot/store";
import Register from "./modules/register/store";
import ClientAccount from "./modules/register/client/store";
import StudentAccount from "./modules/register/student/store";
Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        InboundPayment,
        OutboundPayment,
        Login,
        Forgot,
        Register,
        ClientAccount,
        StudentAccount
    }
});