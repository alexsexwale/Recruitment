<template>
  <div class="md-layout" v-if="postedJobs">
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
          <router-link class="card-title" :to="{ name: 'view-client-profile', params: {id: job.clientAlias}}"><a>{{ job.clientName }}</a></router-link>
        </h4>
        <div slot="description" class="card-description">
          {{ job.name }}
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
              <h4 style="text-align:center;">{{ job.location }}</h4>
            </div>
          </div>
        </template>
      </product-card>
    </div>
  </div>
  <div v-else>
    <h1 class="black" style="text-align:center">There are currently no jobs posted.</h1>
  </div>
</template>

<script>
import { ProductCard } from "@/components";
import db from '@/firebase/init';

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      product1: "/img/dashboard/client/card-1.jpg",
      jobs:[],
      postedJobs: false
    };
  },
  created() {
    // display available micro jobs
    db.collection('micros').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.postedJobs = true;
        let job = doc.data();
        job.id = doc.id;
        this.jobs.push(job); // can push other job types to the same array or seperate the jobs
      });
    });
    // display available reccuring jobs
    // display available internship jobs
    // display available part-time jobs
    // display available full-time jobs
  }
};
</script>
