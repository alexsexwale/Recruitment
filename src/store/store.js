import Vue from "vue";
import Vuex from 'vuex';
import db from '@/firebase/init';
import firebase from "firebase/app";
import LoadScript from 'vue-plugin-load-script';
Vue.use(Vuex);
Vue.use(LoadScript);

// Vendors
Vue.loadScript("/vendor/jquery3.min.js");
Vue.loadScript("/vendor/simpleCart.min.js");

// Payment gateway data
var meta_data = null;
let paymentGateway = db.collection('Settings').doc('Payment Gateway');
paymentGateway.get().then(doc => {
    meta_data = doc.data();
});
var dropdowns = {};
let settings = db.collection('Settings').doc('Drop-down Lists');
settings.get().then(doc => {
    dropdowns = doc.data();
});

// New database
function database(collection, id) {
    var row = {};
    db.collection(collection).doc(id).get().then(doc => {
        row = doc.data();
    });
    return row;
}

// Sage Pay - Checkout
function sagePay(job,ref)
{
    var cart = simpleCart({
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
                m4 : ref,
                p4 : parseInt(job.total)
            }
        },
        beforeCheckout: function( data ){
            data.currency = meta_data.currency_code;
            data.cancel_url = data.cancel_return;
            data.return_url = data.return;
            data.item_description = job.description;
            data.item_name = "Microjob"+job.id+"-"+job.name;
        }
    });
    console.log(cart)
    simpleCart.checkout();
}
// Backend Url
const api = "https://joboxza.herokuapp.com";

export const store = new Vuex.Store({
    strict: true,
    state: {
        dropdowns: dropdowns
    },
    getters: {
        user: () => {
            return firebase.auth().currentUser;
        },
        dropdown: () => {
           return database('Settings', 'Drop-down Lists');
        }
    },
    mutations: {
        makePayment: job => {
            var data = {
              id:job.id
            }
            var request = new XMLHttpRequest();
            request.open('POST', api + '/start-payment/' + job.id, true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    var resp = JSON.parse(request.response);
                    var ref = resp.payload.reference;
                    sagePay(job,ref);
                } 
                else 
                {
                    // We reached our target server, but it returned an error
                    var resp = JSON.parse(request.response);
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