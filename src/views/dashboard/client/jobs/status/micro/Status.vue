<template>
  <div class="content">
    <md-card class="padding">
      <div v-if="select" class="margin">
        <md-button class="btn-next md-info button" @click="payment">Payment</md-button>
        &nbsp;&nbsp;&nbsp;
        <md-button class="btn-next md-success button" @click="edit">Edit</md-button>
        &nbsp;&nbsp;&nbsp;
        <md-button class="btn-next md-danger button" @click="remove">Delete</md-button>
      </div>
      
      <Select v-if="select" />
      <Active v-if="active" />
      <Complete v-if="complete" />
      <Rate v-if="rate" />
    </md-card>
    <!-- Modal: Error handling -->
    <modal v-if="modal" @close="modalHide">
      <template slot="header">
        <h4 class="modal-title black">Make Payment</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">Your payment is outstanding.</p>
        <md-button class="md-button md-info" @click="makePayment">Got it</md-button>
      </template>

      <template slot="footer">
        <div class="centre">
          <md-button class="md-button md-success" @click="modalHide">Got it</md-button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import db from '@/firebase/init';
import Select from './flow/select/Select.vue';
import Active from './flow/active/Active.vue';
import Complete from './flow/complete/Complete.vue';
import Rate from './flow/rate/Rate.vue';
import { Modal } from "@/components";
export default {
  components: {
    Select,
    Active,
    Complete,
    Rate,
    Modal
  },
  data() {
    return {
      job: {},
      select: false,
      active: false,
      complete: false,
      rate: false,
      incomplete: false,
      api: "https://joboxza.herokuapp.com"
    };
  },
  methods: {
    edit() {
      this.$router.push({ name: 'edit-micro-job', params: {id: this.$route.params.id} });
    },
    remove() {
      
    },
    payment() {

    },
    sagePay(id, job, ref, profile, uid) {
      let orderID = "Ref"+id.trim();
      let sageGUID = "df6a3041-7658-45a8-b3f6-a27031d04999";
      let payNowServiceKey = "761cd03f-b86e-4dc6-976d-8db20549ea66"; 

      var cart = simpleCart({
        checkout: {
            type: "SendForm" ,
            url: "https://paynow.sagepay.co.za/site/paynow.aspx" ,
            // HTTP method for form, "POST"
            method: "POST" ,
            // URL to redirect browser to after successful checkout
            success: "/#/microjob/"+id,
            // URL to redirect browser to after checkout was cancelled by buyer
            cancel: "/#/microjob/"+id,
            extra_data: {
                currency_code: "ZAR",
                m1 : payNowServiceKey,
                m2 : sageGUID,
                p2 : (new Date).getTime(),
                p3 : job.name+"    ("+orderID.trim()+")",
                m3 : sageGUID,
                m4 : ref,
                p4 : job.budget                           // Total amount = item1 + item2 + item3 etc
            }
        },
        beforeCheckout: function( data ){
            data.currency = "ZAR";
            data.cancel_url = data.cancel_return;
            data.return_url = data.return;
            data.item_description = job.summary;
            data.item_name = "Microjob"+id+"-"+job.name;
        }
      });
      console.log(cart)
      simpleCart.checkout();
    },
    makePayment() {
      let request = new XMLHttpRequest();
      request.open('POST', api + 'start-payment/' + this.$route.params.id, true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.onload = () => {
        if(request.status >= 200 && request.status < 400) {
          // success
          let response = JSON.parse(request.response);
          let ref = response.payload.reference;
          //this.sagePay(this.$route.params.id,state.jobcache[id],ref,state.user.profile,state.user.fb.uid);

        }
        else {
          // We reached our target server, but it returned an error
          var resp = JSON.parse(request.response);
          console.log(resp)
        }
      };
      request.send(data);
    },
    status() {
      if(this.job.status == "select")
        this.select = true;
      else
        this.select = false;

      if(this.job.status == "active")
        this.active = true;
      else
        this.active = false;

      if(this.job.status == "complete")
        this.complete = true;
      else
        this.complete = false;

      if(this.job.status == "rate")
        this.rate = true;
      else
        this.rate = false;
    }
  },
  created() {
    let jobs = db.collection('micro');
    jobs.where('jobId', '==', this.$route.params.id).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.job = doc.data();
        this.status();
      })
    })
    jobs.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.job = change.doc.data();
          this.status();
        }
      })
    })
  }
};
</script>
<style scoped>
.padding {
  padding: 20px;
}
.centre {
    text-align: center;
}
.button {
  max-width: 88px;
}
.margin {
  margin: auto;
}
</style>
