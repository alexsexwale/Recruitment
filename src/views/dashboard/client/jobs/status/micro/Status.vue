<template>
  <div class="content">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"><div class="loading"></div></div></div>
    <md-card class="padding">
      <div v-if="select" class="margin">
        <md-button class="btn-next md-info button" @click="payment">Payment</md-button>
        &nbsp;&nbsp;&nbsp;
        <md-button class="btn-next md-success button" @click="edit">Edit</md-button>
        &nbsp;&nbsp;&nbsp;
        <md-button class="btn-next md-danger button" @click="remove">Delete</md-button>
      </div>
      <p v-if="select && job.total > 0" class="centre">Your outstanding balance is R{{job.total}}</p>
      
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
      </template>

      <template slot="footer">
        <div class="centre">
          <md-button class="md-button md-success" @click="makePayment">Pay Now</md-button>
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
      modal: false,
      incomplete: false,
      loading: false

    };
  },
  methods: {
    edit() {
      this.$router.push({ name: 'edit-micro-job', params: {id: this.$route.params.id} });
    },
    remove() {
      
    },
    modalHide() {
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

      if(this.job.status == "rate")
        this.rate = true;
      else
        this.rate = false;
    },
    makePayment: function() {
      this.loading = true;
      this.$store.dispatch('makePayment', this.job);
      this.loading = false;
    }
  },
  created() {
    let jobs = db.collection('micros');
    jobs.where('jobId', '==', this.$route.params.id).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.job = doc.data();
        this.job.id = doc.id;
        this.status();
      });
    });
    jobs.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.job = change.doc.data();
          this.status();
        }
      });
    });
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
