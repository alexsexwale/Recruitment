<template>
  <div class="content">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"><div class="loading"></div></div></div>
    <md-card class="padding">
      <div class="margin">
        <md-button v-if="select && enableInvoice" class="btn-next md-primary button" @click="viewInvoice" style="max-width:110px;">Get Invoice</md-button>
        &nbsp;&nbsp;&nbsp;
        <md-button v-if="!paid" class="btn-next md-info button" @click="payment" style="max-width:110px;">Make payment</md-button>
        &nbsp;&nbsp;&nbsp;
        <md-button v-if="select" class="btn-next md-success button" @click="edit" style="max-width:110px;">Edit Job</md-button>
        &nbsp;&nbsp;&nbsp;
        <md-button v-if="select && !paid" class="btn-next md-danger button" @click="cancelJob" style="max-width:110px;">Cancel Job</md-button>
      </div>
      <p v-if="!verified" class="centre bold">Jobox takes up to 24 hours to validate a job and prepare the candidate vetting process. Please note that you may recieve a call from the Jobox team.</p>
      <p v-if="job.total > 0 && !paid" class="centre">Your outstanding balance is R{{job.total}}</p>
      
      <Select v-if="select" />
      <Active v-if="active" />
      <Complete v-if="complete" />
      <Incomplete v-if="incomplete" />
      <Dissatisfied v-if="dissatisfied" />
      <Rate v-if="rate" />
      <Summary v-if="summary" />
    </md-card>
    <!-- Modal: Error handling -->
    <modal v-if="modal" @close="modalHide">
      <template slot="header">
        <h4 v-if="!invoice" class="modal-title black">Make Payment</h4>
        <h4 v-if="invoice" class="modal-title black">Invoice</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <notifications></notifications>
        <p v-if="!invoice" class="black">Your payment is outstanding</p>
        <p v-if="!invoice" class="black">Your payment could take up to 5 minutes to reflect depending on your internet speed</p>
        <iframe v-if="invoice" id="invoice"></iframe>
      </template>

      <template slot="footer">
        <div v-if="!invoice" class="centre">
          <md-button class="md-button md-success" @click="makePayment">Pay Now</md-button>
        </div>
        <div v-if="invoice" class="centre">
          <md-button class="md-button md-success" @click="sendEmail">Send</md-button>
          &nbsp;&nbsp;
          <md-button class="md-button md-info" @click="downloadFile">Download</md-button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import db from '@/firebase/init';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import Select from './flow/select/Select.vue';
import Active from './flow/active/Active.vue';
import Complete from './flow/complete/Complete.vue';
import Incomplete from './flow/incomplete/Incomplete.vue';
import Dissatisfied from './flow/dissatisfied/Dissatisfied.vue';
import Rate from './flow/rate/Rate.vue';
import Summary from './flow/summary/Summary.vue';
import { Modal } from "@/components";
import moment from "moment";
export default {
  components: {
    Select,
    Active,
    Complete,
    Incomplete,
    Dissatisfied,
    Rate,
    Summary,
    Modal
  },
  data() {
    return {
      job: {},
      paid: true,
      select: false,
      active: false,
      complete: false,
      incomplete: false,
      dissatisfied: false,
      rate: false,
      summary: false,
      verified: false,
      modal: false,
      loading: false,
      invoice: false,
      enableInvoice: false
    };
  },
  methods: {
    edit() {
      this.$router.push({ name: 'edit-micro-job', params: {id: this.$route.params.id} });
    },
    modalHide() {
      this.invoice = false;
      this.modal = false;
    },
    payment() {
      this.modal = true;
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
      
      if(this.job.status == "incomplete")
        this.incomplete = true;
      else
        this.incomplete = false;
      
      if(this.job.status == "dissatisfied")
        this.dissatisfied = true;
      else
        this.dissatisfied = false;

      if(this.job.status == "rate")
        this.rate = true;
      else
        this.rate = false;
      if(this.job.status == "summary")
        this.summary = true;
      else
        this.summary = false;
    },
    makePayment: function() {
      this.loading = true;
      this.$store.dispatch('makePayment', this.job);
    },
    cancelJob() {
      this.loading = true;
      db.collection('micros').doc(this.$route.params.id).update({
        status: "removed",
        studentId: null,
        lastModified: moment(Date.now()).format('L')
      })
      .then(() => {
          this.$router.push({ name: "post-a-job" });
      });
    },
    async viewInvoice() {
      this.invoice = true;
      let doc = await db.collection('invoices').doc(this.job.id).get();
      let invoice = doc.data();

      const storage = firebase.app().storage(invoice.bucket);
      const storageRef = storage.ref(invoice.filePath);

      storageRef.getDownloadURL()
        .then(fileUrl => {
          var pdf = document.getElementById('invoice');
          pdf.setAttribute('src', fileUrl);
        })
        .catch(err => {
          this.$notify(
            {
              message: 'File failed to load',
              icon: 'add_alert',
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'danger'
            });
        });
      this.modal = true;
    },
    sendEmail() {
      this.$store.dispatch('sendPdf', this.job);
      this.$notify(
        {
          message: 'Invoice sent',
          icon: 'add_alert',
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: 'success'
        });
    },
    async downloadFile() {
      this.$notify(
        {
          message: 'Download started...',
          icon: 'add_alert',
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: 'success'
        });

      await this.$store.dispatch('downloadPdf', this.job);
    }
  },
  async created() {
    this.loading = true;
    let task_project = db.collection('micros');
    task_project.where('jobId', '==', this.$route.params.id).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.job = doc.data();
        this.job.id = doc.id;
        
        db.collection('users').where('userId', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if(this.job.clientAlias !== doc.data().alias) {
              // To do: create a 404 page or component
              this.$router.go(-1); 
            }
            else {
              this.loading = false;
            }
          });
        });
        this.status();
      });
    });

    task_project.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.job = change.doc.data();
          this.status();
        }
      });
    });

    let job = db.collection('jobs');
    job.where('jobId', '==', this.$route.params.id).get()
    .then(snapshot => { 
      snapshot.forEach(doc => {
        this.verified = doc.data().verified;
      });
    });

    job.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.verified = change.doc.data().verified;
        }
      });
    });

    let payment = db.collection('payments');
    payment.where('jobId', '==', this.$route.params.id).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.paid = doc.data().inboundPayment;
      });
    });

    payment.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.paid = change.doc.data().inboundPayment;
        }
      });
    });

    this.enableInvoice = await db.collection('invoices').doc(this.$route.params.id).get()
                           .then(doc => {
                              if (doc.exists)
                                return doc.data().generated;
                              else 
                                return false;
                           });
    
    let docExists = setInterval(async () => {
      this.enableInvoice = await db.collection('invoices').doc(this.$route.params.id).get()
                           .then(doc => {
                             if (doc.exists)
                                return doc.data().generated;
                              else 
                                return false;
                           });

      if (this.enableInvoice) clearInterval(docExists);
    }, 5000);

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
.bold {
  font-weight: bold;
}
.button {
  max-width: 88px;
}
.margin {
  margin: auto;
}
</style>
