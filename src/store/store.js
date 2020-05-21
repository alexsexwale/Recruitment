import Vue from "vue";
import Vuex from 'vuex';
import LoadScript from 'vue-plugin-load-script';
Vue.use(Vuex);
Vue.use(LoadScript);

// Vendors
Vue.loadScript("/vendor/jquery3.min.js");
Vue.loadScript("/vendor/simpleCart.min.js");

function sagePay(job,ref)
{
    console.log(ref)
    var sageGUID = "df6a3041-7658-45a8-b3f6-a27031d04999";
    var payNowServiceKey = "761cd03f-b86e-4dc6-976d-8db20549ea66"; 

    var cart = simpleCart({
        checkout: {
            type: "SendForm" ,
            url: "https://paynow.sagepay.co.za/site/paynow.aspx" ,
            // HTTP method for form, "POST"
            method: "POST" ,
            // URL to redirect browser to after successful checkout
            success: "jobs/micro/status/"+job.id,
            // URL to redirect browser to after checkout was cancelled by buyer
            cancel: "/jobs/micro/status/"+job.id,
            extra_data: {
                currency_code: "ZAR",
                m1 : payNowServiceKey,
                m2 : sageGUID,
                p2 : (new Date).getTime(),
                p3 : job.name+"    ("+"Ref"+job.id.trim().trim()+")",
                m3 : sageGUID,
                m4 : ref,
                p4 : parseInt(job.total)                        // Total amount = item1 + item2 + item3 etc
            }
        },
        beforeCheckout: function( data ){
            data.currency = "ZAR";
            data.cancel_url = data.cancel_return;
            data.return_url = data.return;
            data.item_description = job.description;
            data.item_name = "Microjob"+job.id+"-"+job.name;
        }
    });
    console.log(cart)
    simpleCart.checkout();
}
const api = "https://joboxza.herokuapp.com";

export const store = new Vuex.Store({
    strict: true,
    state: {
    },
    getters: {
    },
    mutations: {
        makePayment: (state, job) => {
            var data = {
            id:job.id
            }
            var request = new XMLHttpRequest();
            request.open('POST', api + '/start-payment/' + job.id, true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    var resp = JSON.parse(request.response);
                    var ref = resp.payload.reference;
                    sagePay(job,ref);
                    console.log(ref);
                } 
                else 
                {
                    // We reached our target server, but it returned an error
                    var resp = JSON.parse(request.response);
                    console.log(resp)
                }
            };
            request.send(data);
        }
    },
    actions: {
        makePayment: (context, job) => {
            context.commit('makePayment', job);
        }
    }
});