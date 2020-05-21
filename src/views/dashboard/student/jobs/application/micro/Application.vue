<template>
  <div style="padding:40px; padding-top: 0px;">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <md-card class="padding">
      <h1 class="info-text centre">{{ job.name }}</h1>
      <div class="md-layout">
        <md-button class="md-success" @click="apply">Apply for job</md-button>
        <md-card>
          <md-card-content>
            <collapse :collapse="['Description', 'Details', 'Payment']" icon="keyboard_arrow_down" color-collapse="success">
              <template slot="md-collapse-pane-1">
                <md-card class="bg-success">
                  <md-card-content>
                    <h3 class="card-category card-category-social" style="text-align:center;">
                      <i class="far fa-newspaper" /> Description
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
              </template>
              <template slot="md-collapse-pane-2">
                <md-card class="bg-success">
                  <md-card-content>
                    <h3 class="card-category card-category-social centre">
                      <i class="far fa-newspaper" /> Details
                    </h3>
                    <h4 class="card-title">Location</h4>
                    <p class="card-description">{{ job.location }}</p>

                    <h4 class="card-title">Anticipated Duration</h4>
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
                  <h4 class="card-title">Budget</h4>
                  <p class="card-description">R{{ job.budget }}</p>
                </md-card-content>
              </md-card>
              </template>
            </collapse>
          </md-card-content>
        </md-card>
        <md-button class="md-success btn-previous" @click="back">
          Back
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
import { Modal, Collapse } from "@/components";
import moment from "moment";
import slugify from "slugify";

export default {
  components: {
    Modal,
    Collapse
  },
  data() {
    return {
      job: {},
      skills: {},
      student: {},
      feedback: null,
      user: null,
      auth: null,
      slug: null,
      modal: false,
      loading: true
    };
  },
  methods: {
    modalHide() {
      this.modal = false;
    },
    apply() {
      this.loading = true;
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
              degree: this.student.degree,
              bio: this.student.bio, 
              alias: this.user.alias,
              email: this.user.email,
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
        this.loading = false;
      }
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.auth = firebase.auth().currentUser;
    let job = db.collection('micros').doc(this.$route.params.id);
    let skills = db.collection('skills').doc(this.$route.params.id);
    job.get().then(doc => {
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
          skills.get().then(doc => {
            this.skills = doc.data();
            this.skills.id = doc.id;
            let application = db.collection('applications').doc(this.slug);
            application.get().then(doc => {
              if(doc.exists && doc.data().jobId == this.$route.params.id) {
                this.$router.push({ name: 'student-micro-status', params: {id: this.$route.params.id} });
              }
            });
          });
          let students = db.collection('students').doc(this.user.alias);
          students.get().then(doc => {
            this.student = doc.data();
          });
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
