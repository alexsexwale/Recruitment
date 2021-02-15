<template>
  <div class="content">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <hr><h2 class="centre">Please Confirm That the Job Was Completed To Your Satisfaction</h2><hr>
    <h6 class="centre">Student Information</h6>
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <img v-if="profile" class="img" :src="profile" />
            <img v-else class="img" :src="cardUserImage" />
          </div>
          <md-card-content>
            <h6 class="category text-gray">{{ applicant.degree }}</h6>
            <router-link class="card-title" :to="{ name: 'view-student-profile', params: {id: applicant.alias}}"><a>{{ applicant.applicant }}</a></router-link>
            <p class="card-description">{{ applicant.bio }}</p>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div class="centre">
      <p>Are you satisfied with the student's completion of the job?</p>
      <md-button @click="dissatisfied(client)" class="md-danger">
        I am not satisfied
      </md-button>
        &nbsp;&nbsp;&nbsp;
      <md-button @click="complete({id: client.id, paid: paid})" class="md-success">
        I am satisfied
      </md-button>
    </div>
    <!-- Modal: Cancel -->
    <modal v-if="cancelModal" @close="cancelModalHide">
      <template slot="header">
        <h4 class="modal-title black">Whoa there! ✋</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="cancelModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">Are you sure that you want to report that you are dissatisfied with the student’s completion of the job?</p>
      </template>

      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-danger" @click="cancelModalHide">No</md-button>
            &nbsp;&nbsp;&nbsp;
          <md-button class="md-button md-success" @click="dissatisfied(client)">Yes</md-button>
        </div>
      </template>
    </modal>
    <!-- Modal: No Payment  -->
    <modal v-if="modal" @close="noPaymentModalHide">
      <template slot="header">
        <h4 class="modal-title black">Whoa there! ✋</h4>
      </template>

      <template slot="body">
        <p class="black">Please make sure that the payment has been made before you confirm the completion of the job</p>
      </template>

      <template slot="footer">
        <div class="centre">
          <md-button class="md-button md-success" @click="noPaymentModalHide">Got it</md-button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import db from '@/firebase/init';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import moment from "moment";
import { Modal } from "@/components";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Modal
  },
  data() {
    return {
      cancelModal: false,
      client: {},
      applicant: {},
      paid: false,
      profile: null
    }
  },
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  computed: {
    ...mapGetters({
      loading: "loadingCC",
      modal: "modalP"
    })
  },
  methods: {
    ...mapActions(["complete", "dissatisfied", "noPaymentModalHide"]),
    cancelModalHide() {
      this.cancelModal = false;  
    },
    cancel() {
      let job = db.collection('micros').doc(this.client.id);
      job.update({
        complete: false,
        lastModified: moment(Date.now()).format('L')  
      });
      this.$router.push({ name: 'client-cancel', params: {id: job.id} });
    }
  },
  created() {
    db.collection('micros').doc(this.$route.params.id).get().then(doc => {
      this.client = doc.data();
      this.client.id = doc.id;
    });
    
    db.collection('applications').where('jobId', '==', this.$route.params.id).where('status', '==', 'applied').where('approved', '==', true).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.available = true;
        this.applicant = doc.data();
        this.applicant.id = doc.id;
        db.collection('students').doc(this.applicant.alias).get().then(doc => {
          this.profile = doc.data().profile;
        });
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
  }
}
</script>
<style scoped>
.centre {
  text-align: center;
  font-weight: bold;
}
.md-layout, .md-layout-item {
    width: 40%;
    margin: auto;
}
/* Mobile View */
@media only screen and (max-width: 768px) {
  .md-layout, .md-layout-item {
    width: 100%;
    margin: auto;
  }
}
</style>