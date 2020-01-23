<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" v-for="job in jobs" :key="job.id">
      <product-card header-animation="true">
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
            <i class="fas fa-calendar-week"></i> Deadline
            <h4 style="text-align:center;">{{ job.deadline }}</h4>
            <md-button class="md-success">View</md-button>
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
      seq2: 0,
      jobs:[]
    };
  },
  methods: {
    deleteJob(id) {
      db.collection('jobs').doc(id).delete()
      .then(() => {
        this.jobs = this.jobs.filter(job => {
          return job.id != id;
        })
      })
    },
    editJob(id) {
      
    }
  },
  created() {
    db.collection('jobs').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let job = doc.data();
        job.id = doc.id;
        this.jobs.push(job);
      })
    })
  }
};
</script>
