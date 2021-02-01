<template>
  <div style="padding:40px; padding-top: 0px;">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <md-card class="padding">
      <h2 class="centre">Successful Job Review</h2>
      <p class="centre">The job has been successfully completed, please click on the dropdowns below to see more details</p>
        <md-card>
          <md-card-content>
            <collapse :collapse="['Description', 'Details', 'Payment', 'Ratings & Reviews']" icon="keyboard_arrow_down" color-collapse="success">
              <template slot="md-collapse-pane-1">
                <md-card class="bg-success">
                  <md-card-content>
                    <h3 class="card-category card-category-social" style="text-align:center;">
                      <i class="far fa-newspaper" /> Job Description
                    </h3>
                    <h4 class="card-title">Job Name</h4>
                    <p class="card-description">{{ job.name }}</p>

                    <h4 class="card-title">Company Name</h4>
                    <p class="card-description">{{ job.companyName }}</p>

                    <h4 class="card-title">Client Name</h4>
                    <p class="card-description">{{ job.clientName }}</p>

                    <h4 class="card-title">Description</h4>
                    <p class="card-description">{{ job.description }}</p>

                    <h4 class="card-title">Job Category</h4>
                    <p class="card-description">{{ skills.category }}</p>

                    <h4 class="card-title">Skills Required</h4>
                    <ul>
                      <li v-for="(skill, index) in skills.skills" :key="index" class="card-description">{{ skills.skills[index] }}</li>
                    </ul>
                  </md-card-content>
                </md-card>
              </template>
              <template slot="md-collapse-pane-2">
                <md-card class="bg-success">
                  <md-card-content>
                    <h3 class="card-category card-category-social centre">
                      <i class="far fa-newspaper" /> Job Information
                    </h3>
                    <h4 class="card-title">Location</h4>
                    <p class="card-description">{{ job.location }}</p>

                    <h4 class="card-title">Estimated Duration</h4>
                    <p class="card-description">{{ job.duration }}</p>
                  </md-card-content>
                </md-card>
              </template>
              <template slot="md-collapse-pane-3">
                <md-card class="bg-success">
                  <md-card-content>
                    <h3 class="card-category card-category-social centre">
                      <i class="far fa-newspaper" /> Payment
                    </h3>
                    <h4 class="card-title">Total Budget</h4>
                    <p class="card-description">R{{ job.total }}</p>
                    <hr/>
                    <b>Cost Breakdown</b>
                    <p class="card-description">Student Rate</p> &nbsp;&nbsp; R{{ job.budget }}
                    <p class="card-description">Jobox Service Fee (10%)</p> &nbsp;&nbsp; R{{ job.commission }}
                  </md-card-content>
                </md-card>
              </template>
              <template slot="md-collapse-pane-4">
                <md-card class="bg-success">
                  <md-card-content>
                    <h3 class="card-category card-category-social centre">
                      <i class="far fa-newspaper" /> Ratings and Review
                    </h3>
                    <h4 class="card-title">Your rating</h4>
                    <star-rating :read-only="true" :show-rating="true" :glow="10" :round-start-rating="false" v-model="rating"></star-rating>
                    <h4 v-if="review" class="card-title">Your review</h4>
                    <p v-if="review" class="card-description">{{ review }}</p>
                  </md-card-content>
                </md-card>
              </template>
            </collapse>
          </md-card-content>
        </md-card>
    </md-card>
  </div>
</template>
<script>
import firebase from "firebase/app";
import db from '@/firebase/init';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { Collapse } from "@/components";
import StarRating from 'vue-star-rating';

export default {
  components: {
    Collapse,
    StarRating
  },
  data() {
    return {
      job: {},
      skills: {},
      rating: null,
      review: null,
      loading: true
    };
  },
  created() {
    let job = db.collection('micros').doc(this.$route.params.id);
    let skills = db.collection('skills').doc(this.$route.params.id);
    job.get().then(doc => {
      this.job = doc.data();
      this.job.id = doc.id;
      skills.get().then(doc => {
        this.skills = doc.data();
        this.skills.id = doc.id;
      });
    });
    db.collection('studentRatings').where('jobId', '==', this.$route.params.id).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.rating = doc.data().rate;
        this.review = doc.data().review;
      });
    });
    this.loading = false;
  }
};
</script>
<style scoped>
  .padding {
    padding: 20px;
  }
  .centre {
      text-align: center;
  }
</style>
