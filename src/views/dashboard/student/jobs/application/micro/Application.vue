<template>
  <div style="padding:40px; padding-top: 0px;">
    <md-card class="padding">
      <h1 class="info-text centre">{{ job.name }}</h1>
      <div class="md-layout">
        <md-button class="md-success" @click="apply">Apply for job</md-button>
        <md-card class="bg-success">
          <md-card-content>
            <h3 class="card-category card-category-social" style="text-align:center;">
              <i class="far fa-newspaper" /> Job description
            </h3>
            <h4 class="card-title">Name</h4>
            <p class="card-description">{{ job.name }}</p>

            <h4 class="card-title">Description</h4>
            <p class="card-description">{{ job.description }}</p>

            <h4 class="card-title">Skills Required</h4>
            <ul>
              <li v-for="(skill, index) in skills.skills" :key="index" class="card-description">{{ skills.skills[index] }}</li>
            </ul>
          </md-card-content>
        </md-card>
        <md-card class="bg-success">
          <md-card-content>
            <h3 class="card-category card-category-social centre">
              <i class="far fa-newspaper" /> Job Details
            </h3>
            <h4 class="card-title">Location</h4>
            <p class="card-description">{{ job.location }}</p>

            <h4 class="card-title">Anticipated Duration</h4>
            <p class="card-description">{{ job.deadline }}</p>
          </md-card-content>
        </md-card>
        <md-card class="bg-success">
            <md-card-content>
              <h3 class="card-category card-category-social centre">
                <i class="far fa-newspaper" /> Job Payment
              </h3>
              <h4 class="card-title">Budget</h4>
              <p class="card-description">R{{ job.budget }}</p>
            </md-card-content>
          </md-card>
          <md-button class="md-success btn-previous" @click="back">
            Back
          </md-button>
          <md-button class="md-success btn-next" @click="apply">
            Apply for job
          </md-button>
      </div>
    </md-card>
    <!-- Modal: Error handling -->
    <modal v-if="modal" @close="modalHide">
      <template slot="header">
        <h4 class="modal-title black">Oops!</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">This job is currently unavailable</p>
      </template>

      <template slot="footer">
        <div class="centre">
          <md-button class="md-button md-success" @click="modalHide">Got it</md-button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import firebase from "firebase/app";
import db from '@/firebase/init';
import { Modal } from "@/components";
import moment from "moment";
import slugify from "slugify";

export default {
  components: {
    Modal
  },
  data() {
    return {
      job: {},
      skills: {},
      feedback: null,
      user: null,
      auth: null,
      slug: null,
      modal: false
    };
  },
  methods: {
    modalHide() {
      this.modal = false;
    },
    apply() {
      if(this.job) {
        let application = db.collection('applications').doc(this.slug);
        application.get().then(doc => {
          if(doc.exists && doc.data().jobId == this.$route.params.id) {
            let error = db.collection('errors');
            error.add({
              jobId: this.job.id,
              userId: this.auth.uid,
              errorDate: moment(Date.now()).format('LLL'),
              message: "A duplicate application was proccessed by the same user."
            });
            this.$router.push({ name: 'student-micro-status', params: {id: this.$route.params.id} });
          }
          else {
            application.set({
              jobId: this.job.id,
              jobType: 'micro',
              studentId: this.auth.uid,
              appliedDate: moment(Date.now()).format('L'),
              applicant: this.auth.displayName,
              applicantAlias: this.user.alias,
              approved: false,
              status: 'applied'
            });
            this.$router.push({ name: 'student-micro-status', params: {id: this.job.id} });
          }
        });
      }
      else {
        this.modal = true;
        let error = db.collection('errors');
        error.add({
          jobId: this.job.id,
          userId: this.auth.uid,
          errorDate: moment(Date.now()).format('LLL'),
          message: "Unable to apply due to job data not loading."
        });
      }
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.auth = firebase.auth().currentUser;
    let job = db.collection('micro').where('jobId', '==', this.$route.params.id);
    let skills = db.collection('skills').where('jobId', '==', this.$route.params.id);
    job.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.job = doc.data();
        this.job.id = doc.id;
        let user = db.collection('users').where('userId', '==', this.auth.uid);
        user.get().then(snapshot => {
          snapshot.forEach(doc => {
            this.user = doc.data();
            this.slug = slugify(this.user.alias + " " + this.$route.params.id, {
              replacement: '-',
              remove: /[$*_+~.()'"!\-:@]/g,
              lower: true
            });
            skills.get().then(snapshot => {
              snapshot.forEach(doc => {
                this.skills = doc.data();
                this.skills.id = doc.id;
                let application = db.collection('applications').doc(this.slug);
                application.get().then(doc => {
                  if(doc.exists && doc.data().jobId == this.$route.params.id) {
                    this.$router.push({ name: 'student-status', params: {id: this.$route.params.id} });
                  }
                });
              });
            });
          });
        });
      });
    });
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
