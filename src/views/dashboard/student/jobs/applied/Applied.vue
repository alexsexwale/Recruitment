<template>
<div>
  <div v-if="loading" class="background"></div>
  <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
  <div class="md-layout" v-if="appliedJobs">
    <div class="card-layout md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" v-for="job in jobs" :key="job.id">
      <product-card header-animation="false">
        <img v-if="!job.profilePicture" class="img" slot="imageHeader" :src="product1" />
        <img v-if="job.profilePicture" class="img" slot="imageHeader" :src="job.profilePicture" />
        <md-icon slot="fixed-button">build</md-icon>
        <template slot="first-button">
          <md-icon>art_track</md-icon>
          <md-tooltip md-direction="bottom">View</md-tooltip>
        </template>
        <h4 slot="title" class="title">
          {{ job.name }}
        </h4>
        <div slot="description" class="card-description">
          {{ job.category }}
        </div>
        <template slot="footer">
          <div class="price">
            <i class="fas fa-money-bill-wave"></i> Job Type
            <h4 class="centre">{{ job.type }}</h4>
          </div>
          <div class="price">
            <router-link :to="{ name: 'student-micro-status', params: {id: job.id} }"> 
              <md-button class="md-success">View</md-button>
            </router-link>
          </div>
          <div class="stats">
            <div class="price">
              <md-icon>place</md-icon> Location
              <h4 v-if="job.location !== 'Remote'" class="centre">on-site</h4>
              <h4 v-else class="centre">{{ job.location }}</h4>
            </div>
          </div>
        </template>
      </product-card>
    </div>
  </div>
  <div v-else-if="appliedJobs === false">
    <h1 class="black centre">You have no open applications</h1>
  </div>
</div>
</template>

<script>
import { ProductCard } from "@/components";
import db from '@/firebase/init';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      product1: "/img/dashboard/client/card-1.jpg",
      jobs:[],
      appliedJobs: null,
      loading: true
    };
  },
  created() {
    let user = firebase.auth().currentUser;
    let applicants = db.collection('applications');
    let micro = db.collection('micros');
    applicants.where('studentId', '==', user.uid).where('status', '==', 'applied').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let jobId = doc.data().jobId;
        // display micro jobs
        micro.where('jobId','==', jobId).where('status', '==', 'select').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.appliedJobs = true;
            let job = doc.data();
            job.id = doc.id;
            db.collection('jobs').doc(doc.id).get().then(doc => {
              job.type = doc.data().jobType;
              db.collection('skills').doc(doc.id).get().then(doc => {
                job.category = doc.data().category;
                db.collection('clients').doc(job.clientAlias).get().then(doc => {
                  job.profilePicture = doc.data().profile; //To do: Remove undefined error
                  this.jobs.push(job);
                });
              });
            })
          });
        });
      });
    });
    if(this.appliedJobs === null) 
      this.appliedJobs = false;
    this.loading = false;
  }
};
</script>
