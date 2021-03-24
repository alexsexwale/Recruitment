<template>
  <div>
    <h5 class="info-text">Have one last final look at the job you are about to post</h5>
    <div class="md-layout">
      <md-card>
        <md-card-content>
          <collapse :collapse="['Job Description', 'Job Requirements', 'Job Information', 'Cost Breakdown']" icon="keyboard_arrow_down" color-collapse="success">
            <template slot="md-collapse-pane-1">
              <md-card class="bg-success">
                <md-card-content>
                  <h3 class="card-category card-category-social" style="text-align:center;">
                    <i class="fas fa-list-ul"></i> Job Description
                  </h3>
                  <h4 class="card-title">Job Name</h4>
                  <p class="card-description">{{ name }}</p>

                  <h4 class="card-title">Job Description</h4>
                  <p class="card-description">{{ description }}</p>

                  <h4 class="card-title">Job Title</h4>
                    <p class="card-description">{{ jobCategory }}</p>

                  <h4 class="card-title">Skills Required</h4>
                  <ul v-if="skills">
                    <li v-for="skill in skills" :key="skill" class="card-description">{{ skill }}</li>
                  </ul>
                </md-card-content>
              </md-card>
            </template>
            <template slot="md-collapse-pane-2">
              <md-card class="bg-success">
                <md-card-content>
                  <h3 class="card-category card-category-social" style="text-align:center;">
                    <i class="fas fa-dungeon"></i> Job Requirements
                  </h3>
                  <h4 class="card-title">Minimum Level of Education</h4>
                  <p class="card-description">{{ education }}</p>

                  <h4 class="card-title">Minimum Work Experience</h4>
                  <p class="card-description">{{ experience }}</p>
                </md-card-content>
              </md-card>
            </template>
            <template slot="md-collapse-pane-3">
              <md-card class="bg-success">
                <md-card-content>
                  <h3 class="card-category card-category-social" style="text-align:center;">
                    <i class="fas fa-clipboard-list"></i> Job Information
                  </h3>
                  <h4 class="card-title">Location</h4>
                  <p class="card-description">{{ location }}</p>

                  <h4 class="card-title">Start Date</h4>
                  <p class="card-description">{{ date }}</p>

                  <h4 v-if="jobType === 'Project/Task'" class="card-title">Estimated Duration</h4>
                  <p v-if="jobType === 'Project/Task'" class="card-description">{{ deadline }}</p>
                  
                  <h4 v-if="jobType !== 'Project/Task'" class="card-title">Working Days</h4>
                  <ul v-if="jobType !== 'Project/Task'">
                    <li v-for="days in daysOfTheWeek" :key="days" class="card-description">{{ days }}</li>
                  </ul>

                  <h4 v-if="jobType === 'Internship' || jobType === 'Part-time'" class="card-title">Working Hours Per Week</h4>
                  <p v-if="jobType === 'Internship' || jobType === 'Part-time'" class="card-description">{{ hours }}</p>
                </md-card-content>
              </md-card>
            </template>
            <template slot="md-collapse-pane-4">
              <md-card class="bg-success">
                <md-card-content>
                  <h3 class="card-category card-category-social" style="text-align:center;">
                  <i class="fas fa-wallet"></i> Breakdown
                  </h3>
                  <h4 class="card-title">Total Cost</h4>
                  <p class="card-description"><b>R{{ total() }}</b> = <b>R{{ rate() }}</b> + <b>R{{ fee() }}</b> + <b>R{{ price.facilitationFee }}.00</b></p>
                  <hr/>
                  <h4 class="card-title">Cost Breakdown</h4>
                  <p class="card-description" v-if="jobType === 'Project/Task'">Fixed-Term Rate:  <b>R{{ rate() }}</b></p>
                  <p class="card-description" v-if="jobType !== 'Project/Task'">Salary:  <b>R{{ rate() }}</b></p>  
                  <p class="card-description">Jobox Service Fee ({{ percentage() }}%): <b>R{{ fee() }}</b></p> 
                  <p class="card-description">Jobox Facilitation Cost: <b>R{{ price.facilitationFee }}.00</b></p>
                </md-card-content>
              </md-card>
            </template>
          </collapse>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
import { IconCheckbox, Collapse } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
import moment from "moment";
import firebase from "firebase/app";
import db from '@/firebase/init';
import 'firebase/auth';
import 'firebase/firestore';

export default {
  components: {
    IconCheckbox,
    Collapse,
    SlideYDownTransition
  },
  props: {
    name: {},
    description: {},
    jobType: {},
    education: {},
    experience: {},
    industryCategory: {},
    jobCategory: {},
    skills: {},
    location: {},
    deadline: {},
    daysOfTheWeek: {},
    hours: {},
    budget: {},
    payment: {},
    startDate: {}
  },
  data() {
    return {
      deadlineReview: null,
      price: {}
    };
  },
  methods: {
    total() {
      let total = ((this.budget * (1 + this.price.serviceFee)) + this.price.facilitationFee).toFixed(2);
      return total;
    },
    rate() {
      let rate = (this.budget * 1).toFixed(2);
      return rate;
    },
    fee() {
      let fee = ((this.budget * this.price.serviceFee)).toFixed(2);
      return fee;
    },
    percentage() {
      return this.price.serviceFee * 100;
    }
  },
  computed: {
    date() {
      return moment(this.startDate).format('LL')
    }
  },
  mounted() {
    let businessModel = db.collection('Settings').doc('Business Model');
    businessModel.get().then(doc => {
      this.price = doc.data();
    }); 

    this.user = firebase.auth().currentUser;
    let ref = db.collection('jobs');
    ref.where('clientId', '==', this.user.uid).get()
    .then(snapshot => {
        snapshot.forEach(doc => {
        if(doc.exists) { 
          this.microsDoc = db.collection('micros').doc(this.$route.params.id);
          this.skillsDoc = db.collection('skills').doc(this.$route.params.id);
          this.jobsDoc = db.collection('jobs').doc(this.$route.params.id);
          this.microsDoc.get().then(doc => {
            if(doc.exists) { 
              this.name = doc.data().name;
              this.description = doc.data().description;
              this.location = doc.data().location;
              this.deadline = doc.data().duration;
              this.daysOfTheWeek = doc.data().daysOfTheWeek;
              this.hours = doc.data().workingHours;
              this.budget = doc.data().budget;
              let payment = db.collection('payments').doc(this.$route.params.id);
              payment.get().then(doc => {
                this.paid = doc.data().inboundPayment;
              });
              this.skillsDoc.get()
              .then(doc => {
                if(doc.exists) { 
                  this.skills = doc.data().skills; // skills
                  this.industryCategory = doc.data().industry; // skills
                  this.jobCategory = doc.data().category; // skills
                  this.jobsDoc.get()
                  .then(doc => {
                    if(doc.exists) { 
                      this.jobType = doc.data().jobType; // jobs
                      this.education = doc.data().education; // jobs
                      this.experience = doc.data().experience; //jobs
                      this.startDate = new Date(doc.data().startDate); 
                    }
                  });
                }
              });
            }   
          });
        }
      });
    });
    this.name.reload();
    this.description.reload();
    this.location.reload();
    this.deadline.reload();
    this.daysOfTheWeek.reload();
    this.hours.reload();
    this.budget.reload();
    this.paid.reload();
    this.skills.reload();
    this.industryCategory.reload();
    this.jobCategory.reload();
    this.skills.id.reload();
    this.jobType.reload();
    this.education.reload();
    this.experience.reload();
    this.startDate.reload(); 
  }
};
</script>
<style></style>
