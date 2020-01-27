<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">{{ job.companyName }}</h6>
      <h4 class="card-title">{{ job.clientName}}</h4>
      <p class="card-description">
        Don't be scared of the truth because we need to restart the human
        foundation in truth
      </p>
      <md-button @click="select" class="md-round" :class="getColorButton(buttonColor)">View Profile</md-button>
    </md-card-content>
  </md-card>
</template>
<script>
import db from '@/firebase/init';
import firebase from "firebase/app";
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    },
    buttonColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      job: {}
    };
  },
  methods: {
    getColorButton: function(buttonColor) {
      return "md-" + buttonColor + "";
    },
    select() {
      
    }
  },
  created() {
    let auth = firebase.auth().currentUser;
    let job = db.collection('jobs').where('jobId', '==', this.$route.params.id);
    job.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.job = doc.data();
      })
    })
  }
};
</script>
<style></style>
