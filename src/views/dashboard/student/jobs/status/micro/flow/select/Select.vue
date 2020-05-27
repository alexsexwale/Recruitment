<template>
  <div class="content" v-if="!approved">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <hr><h2 class="centre">Apply for Job</h2><hr>
    <p class="centre">Your application has been sent!</p>
    <p class="centre">We will let you know when the client has made their decision.</p>
    <hr>
    <h6 class="centre">Client Information</h6>
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <img class="img" :src="cardUserImage" />
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
        Cancel
      </md-button>
    </div>
    <!-- Modal: Cancel -->
    <modal v-if="cancelModal" @close="cancelModalHide">
      <template slot="header">
        <h4 class="modal-title black">Cancel Job</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="cancelModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">Canceling the job would mean big big problems. I have not thought of the logic yet</p>
      </template>

      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-danger" @click="cancelModalHide">Cancel</md-button>
            &nbsp;&nbsp;&nbsp;
          <md-button class="md-button md-success" @click="cancel()">Yes</md-button>
        </div>
      </template>
    </modal>
  </div>
  <div v-else class="content">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <hr>
      <h2 class="centre">Apply for Job</h2>
    <hr>
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <img class="img" :src="cardUserImage" />
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
      <md-button @click="declineModal = true;" class="md-danger" >
        Decline
      </md-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <md-button @click="accept" class="md-success">
        Accept
      </md-button>
    </div>

    <!-- Modal: Decline -->
    <modal v-if="declineModal" @close="declineModalHide">
      <template slot="header">
        <h4 class="modal-title black">Decline job</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="declineModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">Are you you sure you want to decline the job?</p>
      </template>

      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-danger" @click="declineModalHide">Cancel</md-button>
            &nbsp;&nbsp;&nbsp;
          <md-button class="md-button md-success" @click="decline">Yes</md-button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import firebase from 'firebase/app';
import db from '@/firebase/init';
import moment from "moment";
import { Modal } from "@/components";
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
      loading: true
    };
  },
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  methods: {
    cancelModalHide() {
      this.cancelModal = false;  
    },
    declineModalHide() {
      this.declineModal = false;
    },
    accept() {
      this.loading = true;
      let activeJob = db.collection('micros').doc(this.client.id);
      activeJob.update({
        status: "active",
        studentId: firebase.auth().currentUser.uid,
        lastModified: moment(Date.now()).format('L')
      });
      this.loading = false;
    }
  },
  created() {
    let job = db.collection('micros').doc(this.$route.params.id);
    job.get().then(doc => {
      this.client = doc.data();
      this.client.id = doc.id;
    });  
    let user = firebase.auth().currentUser;
    let applicants = db.collection('applications');
    applicants.where('jobId', '==', this.$route.params.id).where('studentId', '==', user.uid).where('approved', '==', true).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.approved = true;
      });
    }); 
    applicants.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.approved = change.doc.data().approved;
        }
      });
    }); 
    this.loading = false;
  }
};
</script>
