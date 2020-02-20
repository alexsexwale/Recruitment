<template>
  <div class="md-layout" v-if="appliedJobs">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" v-for="job in jobs" :key="job.id">
      <product-card header-animation="true">
        <img class="img" slot="imageHeader" :src="product1" />
        <md-icon slot="fixed-button">build</md-icon>
        <template slot="first-button">
          <md-icon>art_track</md-icon>
          <md-tooltip md-direction="bottom">View</md-tooltip>
        </template>
        <h4 slot="title" class="title">
          {{ job.name }}
        </h4>
        <div slot="description" class="card-description">
          {{ job.description }}
        </div>
        <template slot="footer">
          <div class="price">
            <i class="fas fa-money-bill-wave"></i> budget
            <h4 style="text-align:center;">{{ job.budget }}</h4>
          </div>
          <div class="price">
            <router-link v-if="job.type == 'micro'" :to="{ name: 'student-micro-status', params: {id: job.id} }"> 
              <md-button class="md-success">View</md-button>
            </router-link>
          </div>
          <div class="stats">
            <div class="price">
              <md-icon>place</md-icon> Location
              <h4 style="text-align:center;">{{ job.location }}</h4>
            </div>
          </div>
        </template>
      </product-card>
    </div>
  </div>
  <div v-else>
    <h1 class="black" style="text-align:center">You have not applied to any jobs</h1>
  </div>
</template>

<script>
import { ProductCard } from "@/components";
import db from '@/firebase/init';
import firebase from 'firebase/app';

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      product1: "/img/dashboard/client/card-1.jpg",
      jobs:[],
      appliedJobs: false
    };
  },
  created() {
    let user = firebase.auth().currentUser;
    let applicants = db.collection('applications');
    let micro = db.collection('micro');
    applicants.where('userId', '==', user.uid).where('status', '==', 'applied').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let jobId = doc.data().jobId;
        let jobType = doc.data().jobType;
        
        // display micro jobs
        micro.where('jobId','==', jobId).where('status', '==', 'select').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.appliedJobs = true;
            let job = doc.data();
            job.id = doc.id;
            job.type = jobType;
            this.jobs.push(job);
          });
        });
      });
      // display reccuring jobs
      // display internship jobs
      // display part-time jobs
      // display full-time jobs
    });
  }
};
</script>
<style scoped>
.centre {
  text-align: center;
}
</style>
