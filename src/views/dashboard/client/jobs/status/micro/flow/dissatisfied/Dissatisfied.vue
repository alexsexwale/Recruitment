<template>
  <div class="md-layout">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <div class="md-layout-item md-small-size-100">
      <hr><h2 class="centre">Currently Investigating</h2><hr>
      <p class="centre">You have expressed that you are dissatisfied with the job. We will contact you shortly.</p>
      <hr>
      <h6 class="centre">Student Information</h6>
      <div class="md-layout">
        <div class="md-layout-item md-small-size-100">
          <md-card class="md-card-profile">
            <div class="md-card-avatar">
              <img class="img" :src="cardUserImage" />
            </div>
            <md-card-content>
              <h6 class="category text-gray">{{ applicant.degree }}</h6>
              <router-link class="card-title" :to="{ name: 'view-student-profile', params: {id: applicant.alias}}"><a>{{ applicant.applicant }}</a></router-link>
              <p class="card-description">{{ applicant.bio }}</p>
            </md-card-content>
          </md-card>
          <p style="text-align: center;">Call us at: <b>087 149 4394</b></p>
          <p style="text-align: center;">Email us at: <b><a style="color:blue" href="mailto:contact@jobox.co.za">contact@jobox.co.za</a></b></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase/app";
import moment from "moment";
import { Modal } from "@/components";
export default {
  components: { Modal },
  data() {
    return {
      product1: "/img/dashboard/client/card-1.jpg",
      jobs:[],
      applicant: {},
      modal: false,
      loading: false,
      error: null
    };
  },
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  methods: {
    modalHide() {
      this.modal = false;
    },
    dissatified() {
      if(this.reason && this.description) {
        let user = firebase.auth().currentUser;
        let dissatified = db.collection('dissatified');
        dissatified.add({
          userId: user.uid,
          jobId: this.$route.params.id,
          created: moment(Date.now()).format('L'),
          reason: this.reason,
          description: this.description
        })
        this.reason = null;
        this.description = null;
        this.successModal = true;
      }
      else {
        this.modal = true;
      }
    },
    created() {
      db.collection('applications').where('jobId', '==', this.$route.params.id).where('approved', '==', true).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.applicant = doc.data();
          this.applicant.id = doc.id;
          console.log(this.applicant)
        });
      });  
   }
  }
}
</script>
<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}
.centre {
  text-align: center;  
}
</style>
