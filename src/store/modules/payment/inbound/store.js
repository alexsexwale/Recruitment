import db from "@/firebase/init";
import Vue from "vue";
import LoadScript from "vue-plugin-load-script";
Vue.use(LoadScript);

// Vendors
Vue.loadScript("/vendor/jquery3.min.js");
Vue.loadScript("/vendor/simpleCart.min.js");

// Payment gateway data
var meta_data = null;
let paymentGateway = db.collection("Settings").doc("Payment Gateway");
paymentGateway.get().then(doc => {
    meta_data = doc.data();
});

export default {
    mutations: {
        makePayment: (state, job) => {
            simpleCart({
                checkout: {
                    type: "SendForm" ,
                    url: meta_data.url ,
                    // HTTP method for form, "POST"
                    method: "POST" ,
                    // URL to redirect browser to after successful checkout
                    success: "jobs/micro/status/"+job.id,
                    // URL to redirect browser to after checkout was cancelled by buyer
                    cancel: "/jobs/micro/status/"+job.id,
                    extra_data: {
                        currency_code: meta_data.currency_code,
                        m1 : meta_data.payNowServiceKey,
                        m2 : meta_data.sageGUID,
                        p2 : (new Date).getTime(),
                        p3 : job.name,
                        m3 : meta_data.sageGUID,
                        m4 : job.id,
                        p4 : parseInt(job.total),
                        m9 : job.email,
                        m11: job.phone
                    }
                },
                beforeCheckout: function( data ) {
                    data.currency = meta_data.currency_code;
                    data.cancel_url = data.cancel_return;
                    data.return_url = data.return;
                    data.item_description = job.description;
                    data.item_name = job.name;
                }
            });
            simpleCart.checkout();
        }
    },
    actions: {
        makePayment: (context, job) => {
            context.commit('makePayment', job);
        }
    }
};