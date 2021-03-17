<template>
  <form v-if="!job.clientRatingComplete" @submit.prevent="submit">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <hr><h2 class="centre">Please Rate & Review the Student</h2><hr>
    <p>Thank you so much for using Jobox as your service provider.</p>
    <p>In order to ensure that we keep on providing you with high-quality students, we ask that you please rate and review the students that you worked with.</p>
    <p>This not only helps the students improve but also assists us in knowing where students need support</p>
    <p>Your continuous support and collaboration is highly appreciated!</p>
    <md-card>
      <md-card-content>
        <p>Collapse the headings below to start rating the student</p>
        <collapse :collapse="['1. Quality of Skills', '2. Soft Skills - Communication', '3. Soft Skills - Problem Solving', '4. Soft Skills - Leadership', '5. Soft Skills - Organisation']" icon="keyboard_arrow_down" color-collapse="success">
          <template slot="md-collapse-pane-1">
            <md-card class="bg-success">
              <md-card-content>
                <h3 class="card-category card-category-social centre">
                  <i class="far fa-newspaper" /> Quality of Skills
                </h3>
                Could you please rate the students based on the work they gave you <i class="fas fa-question-circle"><md-tooltip md-direction="right">This is similar to an Uber rating where you rate the quality of the work they did.</md-tooltip></i>
                <star-rating :show-rating="true" :glow="10" :round-start-rating="false" v-model="hard"></star-rating>
              </md-card-content>
            </md-card>
          </template>
          <template slot="md-collapse-pane-2">
            <!-- Communication -->
            <md-card class="bg-success">
              <md-card-content>
                <h3 class="card-category card-category-social centre">
                  <i class="far fa-newspaper" /> Communication
                </h3>
                <p>Communication soft skills are the tools that are used to clearly and effectively converse with others, set expectations, and work with others on projects.</p>
                <!-- Listening -->
                <h5>Listening</h5>
                <p>A student who demonstrates good listening skills is one that follows instructions, asking clarifying questions, can rephrase what a person says to ensure understanding and they are able to listen to feedback and action on the feedback given.</p>
                <star-rating :show-rating="true" :glow="10" :round-start-rating="false" v-model="listening"></star-rating>
                <!-- Verbal and written communication -->
                <h5>Verbal and written communication</h5>
                <p>A student who demonstrates good verbal and written communication has clear enunciation, responds to messages on time, speaks with a good tone, knows when to speak and they are able to clearly state needs and wants.</p>
                <star-rating :show-rating="true" :glow="10" :round-start-rating="false" v-model="communication"></star-rating>
              </md-card-content>
            </md-card>
          </template>
          <template slot="md-collapse-pane-3">
            <!-- Problem Solving -->
            <md-card class="bg-success">
              <md-card-content>
                <h3 class="card-category card-category-social centre">
                  <i class="far fa-newspaper" /> Problem Solving
                </h3>
                <p>It is the ability to recognize difficulties or complications, identify possible solutions, implement them, and finally follow up to make sure they were successful.</p>
                <!-- Critical Thinking -->
                <h5>Critical Thinking</h5>
                <p>A student who demonstrates good critical thinking acumen displays the ability to think clearly, rationally and they show an understanding of the logical connection between ideas and concepts.</p>
                <star-rating :show-rating="true" :glow="10" :round-start-rating="false" v-model="criticalThinking"></star-rating>
                <!-- Creative Problem Solving -->
                <h5>Creative Problem Solving</h5>
                <p>A student who demonstrates good creative problem-solving abilities is one that can identify problems, redefine problems and create opportunities out of the problems by developing new and innovative solutions to problems.</p>
                <star-rating :show-rating="true" :glow="10" :round-start-rating="false" v-model="creative"></star-rating>
              </md-card-content>
            </md-card>
          </template>
          <template slot="md-collapse-pane-4">
          <!-- Leadership -->
          <md-card class="bg-success">
            <md-card-content>
              <h3 class="card-category card-category-social centre">
                <i class="far fa-newspaper" /> Leadership
              </h3>
              <p>The visionary perspective that enables one to know what will work and what will not work and the passionate persistence to stimulate people to strive towards peak performance that will enhance both the organisational and their individual well-being.</p>
              <!-- Leadership -->
              <h5>Taking Initiative</h5>
              <p>A student who is good at taking the initiative does not wait for all of the tasks to be assigned to them, they ask for more work to do and also volunteer for additional responsibilities outside the scope of their role.</p>
              <star-rating :show-rating="true" :glow="10" :round-start-rating="false" v-model="initiative"></star-rating>
              <!-- Accountability -->
              <h5>Accountability</h5>
              <p>A student who demonstrates good accountability is one that takes responsibilities for the outcome of their actions and decisions. They successfully transform their effort and they reliably deliver on their commitments and they can be trusted to do what they say they'll do.</p>
              <star-rating :show-rating="true" :glow="10" :round-start-rating="false" v-model="accountability"></star-rating>
            </md-card-content>
          </md-card>
          </template>
          <template slot="md-collapse-pane-5">
          <md-card class="bg-success">
            <md-card-content>
              <h3 class="card-category card-category-social centre">
                <i class="far fa-newspaper" /> Organisation
              </h3>
              <p>The ability to function effectively in the workplace. Things to consider are preparedness, attention to detail, the ability to handle a large workload or implement a complex project within an established time frame.</p>
              <!-- Planning -->
              <h5>Planning</h5>
              <p>A student who demonstrates good planning is one who completes tasks on time and manages expectations by informing you on whether they will not be able to accomplish a task in the time frame.</p>
              <star-rating :show-rating="true" :glow="10" :round-start-rating="false" v-model="planning"></star-rating>
              <!-- Keep track of work -->
              <h5>Keep track of work</h5>
              <p>A student who is able to keep track of their work is one who takes notes and makes an effort to ensure that their work is well managed.</p>
              <star-rating :show-rating="true" :glow="10" :round-start-rating="false" v-model="tracking"></star-rating>
            </md-card-content>
          </md-card>
          </template>
        </collapse>
      </md-card-content>
    </md-card>
    <!-- Review -->
    <md-field :class="[
        { 'md-valid': !errors.has('review') && touched.review },
        { 'md-error': errors.has('review') }
      ]">
      <label>Tell us about your experience working with the student</label>
      <md-textarea v-model="review" data-vv-name="review" type="text" name="review" v-validate="modelValidations.review"></md-textarea>
      <slide-y-down-transition>
        <md-icon class="error" v-show="errors.has('review')">close</md-icon>
      </slide-y-down-transition>
      <slide-y-down-transition>
        <md-icon class="success" v-show="!errors.has('review') && touched.review">done</md-icon>
      </slide-y-down-transition>
    </md-field>
    <br/>
    <!-- Submit -->
    <div style="text-align:center">
      <button class="md-button md-success md-theme-default" slot="footer">
        <div class="md-ripple">
          <div class="md-button-content">
            Submit
          </div>
        </div>
      </button>
    </div>
    
    <!-- Modal: Incomplete -->
    <modal v-if="modal" @close="modalHide">
      <template slot="header">
        <h4 class="modal-title black">Whoa there! ✋</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <p class="black">{{ feedback }}</p>
      </template>
      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-success" @click="modalHide">Got it</md-button>
        </div>
      </template>
    </modal>
  </form>
  <div v-else>
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <hr><h2 class="centre">Waiting for the Student to Give You a Rating</h2><hr>
    <h6 class="centre">Student Information</h6>
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <br>  
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <img class="img" :src="cardUserImage" />
          </div>
          <br>
          <md-card-content>
            <h6 class="category text-gray">{{ applicant.degree }}</h6>
            <router-link class="card-title" :to="{ name: 'view-student-profile', params: {id: applicant.alias}}"><a>{{ applicant.applicant }}</a></router-link>
            <p class="card-description">
              {{ applicant.bio }}
            </p>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "@/components";
import db from '@/firebase/init';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import moment from "moment";
import StarRating from 'vue-star-rating';
import { Collapse } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
export default {
  components: {
    Modal,
    StarRating,
    Collapse,
    SlideYDownTransition
  },
  data() {
    return {
      hard: null,
      listening: null,
      communication: null,
      criticalThinking: null,
      creative: null,
      initiative: null,
      accountability: null,
      planning: null,
      tracking: null,
      communicationId: null,
      problemSolvingId: null,
      leadershipId: null,
      organisationId: null,
      review: null,
      feedback: null,
      loading: true,
      modal: false,
      job: {},
      applicant: {},
      touched: {
        review: false
      },
      modelValidations: {
        review: {
          required: true  
        }  
      }
    };
  },
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  methods: {
    modalHide() {
      this.modal = false;
    },
    getApplicant() {
      db.collection('applications').where('jobId', '==', this.$route.params.id).where('status', '==', 'applied').where('approved', '==', true).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.applicant = doc.data();
        });
      });
    },
    submit() {
      this.loading = true;
      let user = firebase.auth().currentUser;
      if(this.hard && this.listening && this.communication && this.criticalThinking && this.creative && this.initiative && this.accountability && this.planning && this.tracking) {
        let rateJob = db.collection('micros').doc(this.$route.params.id);
        rateJob.get().then(doc => {
          var job = doc.data();
          var communication = db.collection("communication");
          var problemSolving = db.collection("problemSolving");
          var leadership = db.collection("leadership");
          var organisation = db.collection("organisation");
          var clientRating = db.collection("clientRatings");
          var ratings = db.collection("ratings");
          ratings.add({
            created: moment(Date.now()).format('L'),
            lastModified: moment(Date.now()).format('L'),
            listening: this.listening,
            communication: this.communication,
            criticalThinking: this.criticalThinking,
            creative: this.creative,
            initiative: this.initiative,
            accountability: this.accountability,
            planning: this.planning,
            tracking: this.tracking,
            hardSkill: this.hard,
            review: this.review,
            studentId: job.studentId,
            clientId : user.uid,
            jobId: this.$route.params.id
          })
          // Create communication document
          communication.add({
            created: moment(Date.now()).format('L'),
            listening: this.listening,
            communication: this.communication
          }).then(doc => { 
            this.communicationId = doc.id; 
            // Update communication id
            communication.doc(this.communicationId).update({
              communicationId: this.communicationId
            });
            // Create problem solving document
            problemSolving.add({
              created: moment(Date.now()).format('L'),
              criticalThinking: this.criticalThinking,
              creative: this.creative
            }).then(doc => { 
              this.problemSolvingId = doc.id;
              // Update problem solving id
              problemSolving.doc(this.problemSolvingId).update({
                problemSolvingId: this.problemSolvingId
              });
              // Create leadership document
              leadership.add({
                created: moment(Date.now()).format('L'),
                initiative: this.initiative,
                accountability: this.accountability
              }).then(doc => { 
                this.leadershipId = doc.id;
                // Update leadership id
                leadership.doc(this.leadershipId).update({
                  leadershipId: this.leadershipId
                });
                // Create organisation document
                organisation.add({
                  created: moment(Date.now()).format('L'),
                  planning: this.planning,
                  tracking: this.tracking
                }).then(doc => { 
                  this.organisationId = doc.id;
                  // Update organisation id
                  organisation.doc(this.organisationId).update({
                    organisationId: this.organisationId
                  });
                  // Create main rating document
                  clientRating.add({
                    jobId: this.$route.params.id,
                    created: moment(Date.now()).format('L'),
                    hardSkill: this.hard,
                    review: this.review,
                    studentId: job.studentId,
                    clientId : user.uid
                  }).then(ref => {
                    // Update communication, problem solving, leadership and organisation id
                    clientRating.doc(ref.id).update({
                      communicationId: this.communicationId,
                      problemSolvingId: this.problemSolvingId,
                      leadershipId: this.leadershipId,
                      organisationId: this.organisationId
                    });
                  }); 
                }); 
              }); 
            });
          });

          rateJob.update({
            clientRatingComplete: true,
          });
          
          if(doc.data().studentRatingComplete) {
            rateJob.update({
              complete: true,
              status: "summary",
              lastModified: moment(Date.now()).format('L')
            });
          }
        });
        this.loading = false;
      }
      else {
        this.feedback = "Please rate the student before clicking on the submit button";
        this.modal = true;
        this.loading = false;
      }
    }
  },
  watch: {
    review() {
      this.touched.review = true;  
    }  
  },
  created() {
    let jobs = db.collection('micros');
    jobs.doc(this.$route.params.id).get().then(doc => {
      this.job = doc.data();
      if(this.job.clientRatingComplete) {
        this.getApplicant();
      }
    });
    jobs.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.job = change.doc.data();
          this.getApplicant();
        }
      });
    });
    this.loading = false;
  }
};
</script>
<style scoped>
.centre {
  text-align: center;
  font-weight: bold;
}
</style>