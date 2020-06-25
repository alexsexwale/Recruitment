<template>
  <div class="content">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <hr><h2 class="centre">Incomplete Job</h2>
    <hr><p class="centre">Jobox is undergoing investigation as to why the job is incomplete.</p>
    <p class="centre">Please note that you will be contacted by the Jobox team.</p><hr>
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
      </div>
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
      applicant: {},
      completeJobs: false,
      loading: true
    };
  },
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  created() {
    db.collection('applications').where('jobId', '==', this.$route.params.id).where('approved', '==', true).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.applicant = doc.data();
        this.applicant.id = doc.id;
      });
    });  
    this.loading = false;
  }
};
</script>