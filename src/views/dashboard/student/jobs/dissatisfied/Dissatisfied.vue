<template>
<div>
  <div v-if="loading" class="background"></div>
  <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
  <div class="md-layout" v-if="dissatisfiedJobs">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" v-for="job in jobs" :key="job.id">
      <product-card header-animation="false">
        <img class="img" slot="imageHeader" :src="product1" />
        <md-icon slot="fixed-button">build</md-icon>
        <template slot="first-button">
          <md-icon>art_track</md-icon>
          <md-tooltip md-direction="bottom">View</md-tooltip>
        </template>
        <template slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Edit</md-tooltip>
        </template>
        <template slot="third-button">
          <md-icon>close</md-icon>
        </template>
        <h4 slot="title" class="title">
          {{ job.name }}
        </h4>
        <div slot="description" class="card-description">
          {{ job.category }}
        </div>
        <template slot="footer">
          <div class="price">
            <i class="fas fa-money-bill-wave"></i> budget
            <h4 style="text-align:center;">{{ job.budget }}</h4>
          </div>
          <div class="price">
            <!-- <br><br>
            <i class="fas fa-calendar-week"></i> Deadline
            <h4 style="text-align:center;">{{ job.deadline }}</h4> -->
            
            <router-link :to="{ name: 'student-micro-status', params: {id: job.id} }"> 
              <md-button class="md-success">View</md-button>
            </router-link>
          </div>
          <div class="stats">
            <div class="price">
              <md-icon>place</md-icon> Location
              <h4 v-if="job.location !== 'remote'" style="text-align:center;">on-site</h4>
              <h4 v-else style="text-align:center;">{{ job.location }}</h4>
            </div>
          </div>
        </template>
      </product-card>
    </div>
  </div>
  <div v-else-if="dissatisfiedJobs===false">
    <h1 class="black" style="text-align:center">You have no dissatisfied jobs</h1>
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
      dissatisfiedJobs: null,
      loading: true
    };
  },
  created() {
    let user = firebase.auth().currentUser;
    let micro = db.collection('micros');
    // display micro jobs
    micro.where('studentId', '==', user.uid).where('status', '==', 'dissatisfied').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
        this.dissatisfiedJobs = true;
        let job = doc.data();
        job.id = doc.id;
        db.collection('skills').doc(doc.id).get().then(doc => {
            job.category = doc.data().category;
                this.jobs.push(job);
            });
        });
    });
    if(this.dissatisfiedJobs === null) 
      this.dissatisfiedJobs = false;
    this.loading = false;
  }
};
</script>
