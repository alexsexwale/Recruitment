<template>
<div>
  <div v-if="loading" class="background"></div>
  <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
  <div class="md-layout" v-if="activeJobs">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" v-for="job in jobs" :key="job.id">
      <product-card header-animation="false">
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
            <h4 class="centre">{{ job.budget }}</h4>
          </div>
          <div class="price">
            <router-link v-if="job.type == 'micro'" :to="{ name: 'client-micro-status', params: {id: job.id} }"> 
              <md-button class="md-success">View</md-button>
            </router-link>
          </div>
          <div class="stats">
            <div class="price">
              <md-icon>place</md-icon> Location
              <h4 v-if="job.location !== 'remote'" class="centre">on-site</h4>
              <h4 v-else class="centre">{{ job.location }}</h4>
            </div>
          </div>
        </template>
      </product-card>
    </div>
  </div>
  <div v-else-if="activeJobs === false">
    <h1 class="black centre">You currently have no active jobs</h1>
  </div>
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
      activeJobs: null,
      loading: true
    };
  },
  created() {
    let user = firebase.auth().currentUser;
    let jobs = db.collection('jobs');
    let micro = db.collection('micros');
    jobs.where('clientId', '==', user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let jobId = doc.data().jobId;
        let jobType = doc.data().jobType;
        // display micro jobs
        micro.where('jobId', '==', jobId).where('status', '==', 'active').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.activeJobs = true;
            let job = doc.data();
            job.id = doc.id;
            job.type = jobType;
            this.jobs.push(job);
          });
        });
        if(this.activeJobs === null) 
         this.activeJobs = false;
        
        this.loading = false;
      });
    });
  }
};
</script>
