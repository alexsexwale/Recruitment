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
            <collapse :collapse="['Job Description', 'Job Information', 'Budget']" icon="keyboard_arrow_down" color-collapse="success">
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
                    <h4 class="card-title">Job Location</h4>
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
        <h4 class="modal-title black">{{ header }}</h4>
      </template>

      <template slot="body">
        <p class="black">{{ feedback }}</p>
      </template>

      <template slot="footer">
        <div class="centre">
          <!-- Sent Test -->
          <router-link :to="{ name: 'apply' }"> 
              <md-button v-if="sentTest" class="md-button md-success">Got it</md-button>
          </router-link>
          <!-- Send Test -->
          <md-button v-if="!sentTest" class="md-button md-danger" @click="modalHide">No</md-button>
          &nbsp;&nbsp;
          <md-button v-if="!sentTest" class="md-button md-success" @click="test">Yes</md-button>
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
      url: {},
      job: {},
      skills: {},
      student: {},
      vetted: {},
      sentTest: false,
      feedback: null,
      header: null,
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
            if(
              // Vetted as a salesperson
              this.vetted.sales && this.skills.category === "Salesperson" ||
              // Vetted as a Social Media Manager
              this.vetted.socialMediaManager && this.skills.category === "Social Media Manager" ||
              // Vetted as a Blog Writer
              this.vetted.blogWriter && this.skills.category === "Blog Writer" ||
              // Vetted as a Graphic Designer
              this.vetted.graphicDesigner && this.skills.category === "Graphic Designer" ||
              // Vetted as a Software Developer
              this.vetted.softwareDeveloper && this.skills.category === "Software Developer" ||
              // Vetted as a Database Administrator
              this.vetted.databaseAdministrator && this.skills.category === "Database Administrator" ||
              // Vetted as a IT Technician
              this.vetted.itTechnician && this.skills.category === "IT Technician" ||
              // Vetted as a Video Editor 
              this.vetted.videoEditor && this.skills.category === "Video Editor"
              ) 
              {
              application.set({
                jobId: this.job.id,
                jobType: 'micro',
                studentId: this.auth.uid,
                created: moment(Date.now()).format('L'),
                lastModified: moment(Date.now()).format('L'), 
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
            else {
              this.modal = true;
              this.loading = false;
              this.modal = true;
              this.header = "Whoa there! ⛔️";
              this.feedback = "You are not vetted to work as a " + this.skills.category + ". \n\nWould you like to take the test so that you can be a vetted " + this.skills.category + "?";
            }
          }
        });
      }
      else {
        this.modal = true;
        this.feedback = "This job is currently unavailable";
        this.header = "Oops!";
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
    },
    test() {
      this.header = this.skills.category + " test sent!";
      this.feedback = "The " + this.skills.category +  " test is open on a new tab. Once you have completed the test, Jobox will get in touch with you.";
      this.sentTest = true;
      if(this.skills.category === "Salesperson")
        window.open(this.url.sales_person, '_blank');
      else if(this.skills.category === "Social Media Manager")
        window.open(this.url.social_media_manager, '_blank');
      else if(this.skills.category === "Blog Writer")
        window.open(this.url.blog_writer, '_blank');
      else if(this.skills.category === "Graphic Designer")
        window.open(this.url.graphic_designer, '_blank');
      else if(this.skills.category === "Software Developer")
        window.open(this.url.it_technician, '_blank');
      else if(this.skills.category === "Database Administrator")
        window.open(this.url.database_admistrator, '_blank');
      else if(this.skills.category === "IT Technician")
        window.open(this.url.it_technician, '_blank');
      else if(this.skills.category === "Video Editor")
        window.open(this.url.video_editor, '_blank');
    }
  },
  created() {
    this.auth = firebase.auth().currentUser;
    let job = db.collection('micros').doc(this.$route.params.id);
    let skills = db.collection('skills').doc(this.$route.params.id);
    let settings = db.collection('Settings').doc("Vetting Process URL");
    settings.get().then().then(doc => {
      this.url = doc.data();
    });
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
              else {
                this.loading = false;
              }
            });
          });
          db.collection('students').doc(this.user.alias).get().then(doc => {
            this.student = doc.data();
            db.collection('vetted').doc(this.user.alias).get().then(doc => {
              this.vetted = doc.data();
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
