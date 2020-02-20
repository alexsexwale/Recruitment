<template>
  <div class="md-layout">
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
          {{ job.description }}
        </div>
        <template slot="footer">
          <div class="price">
            <i class="fas fa-money-bill-wave"></i> budget
            <h4 style="text-align:center;">{{ job.budget }}</h4>
          </div>
          <div class="price">
            <br><br>
            <!-- <i class="fas fa-calendar-week"></i> Deadline
            <h4 style="text-align:center;">{{ job.deadline }}</h4> -->
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
</template>

<script>
import { ProductCard } from "@/components";
import db from '@/firebase/init'

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      product1: "/img/dashboard/client/card-1.jpg",
      jobs:[]
    };
  },
  created() {
    // display available micro jobs
    db.collection('micro').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
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
