<template>
  <div class="content" v-if="!approved">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <hr><h2 class="centre">Application Sent!</h2><hr>
    <p class="centre">We will let you know on the outcome of your application</p>
    <hr>
    <h6 class="centre">Client Information</h6>
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <img v-if="picture" class="img" :src="picture" />
            <img v-else class="img" :src="cardUserImage" />
          </div>
          <md-card-content>
            <h6 v-if="client.companyName" class="category text-gray">{{ client.companyName }}</h6>
            <h4><router-link class="card-title" :to="{ name: 'view-client-profile', params: {id: client.clientAlias}}"><a>{{ client.clientName }}</a></router-link></h4>
            <p class="card-description">
              {{ client.description }}
            </p>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div class="centre">
      <md-button @click="cancelModal=true;" class="md-danger">
        Withdraw Application
      </md-button>
    </div>
    <!-- Modal: Cancel -->
    <modal v-if="cancelModal" @close="cancelModalHide">
      <template slot="header">
        <h4 class="modal-title black">Withdraw Application</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="cancelModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">You are now choosing to withdraw your application for this job. Would you like to proceed?</p>
      </template>

      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-danger" @click="cancelModalHide">No</md-button>
            &nbsp;&nbsp;&nbsp;
          <md-button class="md-button md-success" @click="studentCancelSelect(applicant)">Yes</md-button>
        </div>
      </template>
    </modal>
  </div>
  <div v-else class="content">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <hr><h2 class="centre">Application Successful!</h2><hr>
    <p class="centre">Congratulations you have been selected for the job</p>
    <hr>
    <h6 class="centre">Client Information</h6>
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <img v-if="picture" class="img" :src="picture" />
            <img v-else class="img" :src="cardUserImage" />
          </div>
          <md-card-content>
            <h6 v-if="client.companyName" class="category text-gray">{{ client.companyName }}</h6>
            <h4><router-link class="card-title" :to="{ name: 'view-client-profile', params: {id: client.clientAlias}}"><a>{{ client.clientName }}</a></router-link></h4>
            <p class="card-description">
              {{ client.description }}
            </p>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div class="centre">
      <p><b>I would like to:</b></p>
      <md-button @click="declineModal = true;" class="md-danger" >
        Decline Job
      </md-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <md-button @click="acceptJob(applicant)" class="md-success">
        Accept Job
      </md-button>
    </div>

    <!-- Modal: Decline -->
    <modal v-if="declineModal" @close="declineModalHide">
      <template slot="header">
        <h4 class="modal-title black">Whoa there! ✋</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="declineModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">Are you sure you want to turn down the job offer?</p>
      </template>

      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-danger" @click="declineModalHide">No</md-button>
            &nbsp;&nbsp;&nbsp;
          <md-button class="md-button md-success" @click="studentDeclineSelect(applicant)">Yes</md-button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import firebase from 'firebase/app';
import db from '@/firebase/init';
import 'firebase/auth';
import 'firebase/firestore';
import { Modal } from "@/components";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Modal
  },
  data() {
    return {
      client: {},
      approved: false,
      cancelModal: false,
      declineModal: false,
      loading: true,
      applicant: {},
      picture: null
    };
  },
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  methods: {
    ...mapActions(["studentDeclineSelect", "studentCancelSelect", "acceptJob"]),
    cancelModalHide() {
      this.cancelModal = false;  
    },
    declineModalHide() {
      this.declineModal = false;
    }
  },
  created() {
    let job = db.collection('micros').doc(this.$route.params.id);
    job.get().then(doc => {
      this.client = doc.data();
      this.client.id = doc.id;
      db.collection('clients').doc(this.client.clientAlias).get().then(doc => {
        this.picture = doc.data().profile;
      });
    });  
    this.user = firebase.auth().currentUser;
    let applicants = db.collection('applications');
    applicants.where('jobId', '==', this.$route.params.id).where('studentId', '==', this.user.uid).where('approved', '==', true).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.applicant = doc.data();
        this.applicant.id = doc.id;
        this.approved = true;
      });
    });

    if(!this.approved) {
      applicants.where('jobId', '==', this.$route.params.id).where('studentId', '==', this.user.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.applicant = doc.data();
          this.applicant.id = doc.id;
        });
      });
    }
    applicants.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.applicant = change.doc.data();
          this.applicant.id = change.doc.id;
          this.approved = this.applicant.approved;
        }
      });
    }); 
    this.loading = false;
  }
};
</script>
