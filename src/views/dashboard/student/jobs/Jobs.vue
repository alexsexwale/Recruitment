<template>
  <div class="md-layout" v-if="postedJobs">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
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
          <md-tooltip md-direction="bottom" @click="deleteJob(job.id)">Remove</md-tooltip>
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
            <br><br>
            <router-link :to="{name: 'micro-application', params: {id: job.id}}"> 
              <md-button class="md-success">Apply</md-button>
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
  <div v-else>
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <h1 class="black centre">There are currently no jobs posted.</h1>
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
      postedJobs: false,
      loading: true
    };
  },
  created() {
    // to do: do not display the job if the student has already applied to the job
    db.collection('micros').where('status', '==', 'select').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let job = doc.data();
        job.id = doc.id;
        db.collection('jobs').doc(doc.id).get().then(doc => {
          if(doc.data().verified === true) {
            db.collection('skills').doc(doc.id).get().then(doc => {
            job.category = doc.data().category;
              this.jobs.push(job);
              this.postedJobs = true;
            });
          }
        });
      });
      this.loading = false;
    });
  }
};
</script>
