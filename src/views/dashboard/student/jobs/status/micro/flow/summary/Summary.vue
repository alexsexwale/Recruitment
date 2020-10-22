<template>
  <div style="padding:40px; padding-top: 0px;">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <md-card class="padding">
      <h2 class="centre">Successful Job Review</h2>
      <p class="centre">The job has been successfully completed, please click on the dropdowns below to see more details</p>
        <md-card>
          <md-card-content>
            <collapse :collapse="['Job Description', 'Job Information', 'Payment', 'Ratings & Reviews']" icon="keyboard_arrow_down" color-collapse="success">
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
                    <i class="far fa-newspaper" /> Budget
                  </h3>
                  <h4 class="card-title">Budget</h4>
                  <p class="card-description">R{{ job.budget }}</p>
                </md-card-content>
              </md-card>
              </template>
              <template slot="md-collapse-pane-4">
              <md-card class="bg-success">
                <md-card-content>
                  <h3 class="card-category card-category-social centre">
                    <i class="far fa-newspaper" /> Ratings and Review
                  </h3>
                  <h4 class="card-title">Your ratings</h4>

                  <h4 class="card-title"><b>Communication</b></h4>
                  <!-- Listening -->
                  <h5>Listening</h5>
                  <p>A student who demonstrates good listening skills is one that follows instructions, asking clarifying questions, can rephrase what a person says to ensure understanding and they are able to listen to feedback and action on the feedback given.</p>
                  <star-rating :read-only="true" :show-rating="true" :glow="10" :round-start-rating="false" v-model="listening"></star-rating>
                  <!-- Verbal and written communication -->
                  <h5>Verbal and written communication</h5>
                  <p>A student who demonstrates good verbal and written communication has clear enunciation, responds to messages on time, speaks with a good tone, knows when to speak and they are able to clearly state needs and wants.</p>
                  <star-rating :read-only="true" :show-rating="true" :glow="10" :round-start-rating="false" v-model="communication"></star-rating>
                  
                  <h4 class="card-title"><b>Problem Solving</b></h4>
                  <!-- Critical Thinking -->
                  <h5>Critical Thinking</h5>
                  <p>A student who demonstrates good critical thinking acumen displays the ability to think clearly, rationally and they show an understanding of the logical connection between ideas and concepts.</p>
                  <star-rating :read-only="true" :show-rating="true" :glow="10" :round-start-rating="false" v-model="criticalThinking"></star-rating>
                  <!-- Creative Problem Solving -->
                  <h5>Creative Problem Solving</h5>
                  <p>A student who demonstrates good creative problem-solving abilities is one that can identify problems, redefine problems and create opportunities out of the problems by developing new and innovative solutions to problems.</p>
                  <star-rating :read-only="true" :show-rating="true" :glow="10" :round-start-rating="false" v-model="creative"></star-rating>

                  <h4 class="card-title"><b>Leadership</b></h4>
                  <p>The visionary perspective that enables one to know what will work and what will not work and the passionate persistence to stimulate people to strive towards peak performance that will enhance both the organisational and their individual well-being.</p>
                  <!-- Leadership -->
                  <h5>Taking Initiative</h5>
                  <p>A student who is good at taking the initiative does not wait for all of the tasks to be assigned to them, they ask for more work to do and also volunteer for additional responsibilities outside the scope of their role.</p>
                  <star-rating :read-only="true" :show-rating="true" :glow="10" :round-start-rating="false" v-model="initiative"></star-rating>
                  <!-- Accountability -->
                  <h5>Accountability</h5>
                  <p>A student who demonstrates good accountability is one that takes responsibilities for the outcome of their actions and decisions. They successfully transform their effort and they reliably deliver on their commitments and they can be trusted to do what they say they'll do.</p>
                  <star-rating :read-only="true" :show-rating="true" :glow="10" :round-start-rating="false" v-model="accountability"></star-rating>

                  <h4 class="card-title"><b>Organisation</b></h4>
                  <p>The ability to function effectively in the workplace. Things to consider are preparedness, attention to detail, the ability to handle a large workload or implement a complex project within an established time frame.</p>
                  <!-- Planning -->
                  <h5>Planning</h5>
                  <p>A student who demonstrates good planning is one who completes tasks on time and manages expectations by informing you on whether they will not be able to accomplish a task in the time frame.</p>
                  <star-rating :read-only="true" :show-rating="true" :glow="10" :round-start-rating="false" v-model="planning"></star-rating>
                  <!-- Keep track of work -->
                  <h5>Keep track of work</h5>
                  <p>A student who is able to keep track of their work is one who takes notes and makes an effort to ensure that their work is well managed.</p>
                  <star-rating :read-only="true" :show-rating="true" :glow="10" :round-start-rating="false" v-model="tracking"></star-rating>
                  
                  <h4 class="card-title">Review</h4>
                  <p class="card-description">{{ review }}</p>
                </md-card-content>
              </md-card>
              <p style="text-align: center;">Call us at: <b>087 149 4394</b></p>
              <p style="text-align: center;">Email us at: <b><a style="color:blue" href="mailto:contact@jobox.co.za">contact@jobox.co.za</a></b></p>
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
import moment from "moment";
import StarRating from 'vue-star-rating';
import { Collapse } from "@/components";

export default {
  components: {
    StarRating,
    Collapse
  },
  data() {
    return {
      job: {},
      skills: {},
      hardSkill: null,
      communication: null,
      listening: null,
      criticalThinking: null,
      creative: null,
      initiative: null,
      accountability: null,
      planning: null,
      tracking: null,
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
    db.collection('clientRatings').where('jobId', '==', this.$route.params.id).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.hardSkill = doc.data().hardSkill;
        this.review = doc.data().review;
        db.collection('communication').doc(doc.data().communicationId).get().then(doc => {
          this.communication = doc.data().communication;
          this.listening = doc.data().listening;
        });
        db.collection('problemSolving').doc(doc.data().problemSolvingId).get().then(doc => {
          this.criticalThinking = doc.data().criticalThinking;
          this.creative = doc.data().creative;
        });
        db.collection('leadership').doc(doc.data().leadershipId).get().then(doc => {
          this.initiative = doc.data().initiative;
          this.accountability = doc.data().accountability;
        });
        db.collection('organisation').doc(doc.data().organisationId).get().then(doc => {
          this.planning = doc.data().planning;
          this.tracking = doc.data().tracking;
        });
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
