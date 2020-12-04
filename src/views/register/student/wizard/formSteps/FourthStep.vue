<template>
  <div>
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"><div class="loading"></div></div></div>
    <h5 class="info-text">
      Social Media Accounts and Additional Documents
    </h5>
    <p class="info-text">Please do not include inappropriate handles 🤪</p>
      <div class="md-layout">
      <notifications></notifications>
      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('linkedIn') && touched.linkedIn },
            { 'md-form-group': true },
            { 'md-error': errors.has('linkedIn') }
          ]">
          <md-icon><i class="fab fa-linkedin"></i></md-icon>
          <label>LinkedIn</label>
          <md-input @change="addLinkedIn" v-model="linkedIn" data-vv-name="linkedIn" type="text" name="linkedIn" required v-validate="modelValidations.linkedIn"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('linkedIn')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('linkedIn') && touched.linkedIn">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('facebook') && touched.facebook },
            { 'md-form-group': true },
            { 'md-error': errors.has('facebook') }
          ]">
          <md-icon><i class="fab fa-facebook"></i></md-icon>
          <label>Facebook</label>
          <md-input @change="addFacebook" v-model="facebook" data-vv-name="facebook" type="text" name="facebook" v-validate="modelValidations.facebook"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('facebook')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('facebook') && touched.facebook">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('twitter') && touched.twitter },
            { 'md-form-group': true },
            { 'md-error': errors.has('twitter') }
          ]">
          <md-icon><i class="fab fa-twitter"></i></md-icon>
          <label>Twitter</label>
          <md-input @change="addTwitter" v-model="twitter" data-vv-name="twitter" type="text" name="twitter" v-validate="modelValidations.twitter"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('twitter')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('twitter') && touched.twitter">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('instagram') && touched.instagram },
            { 'md-form-group': true },
            { 'md-error': errors.has('instagram') }
          ]">
          <md-icon><i class="fab fa-instagram"></i></md-icon>
          <label>Instagram</label>
          <md-input @change="addInstagram" v-model="instagram" data-vv-name="instagram" type="text" name="instagram" v-validate="modelValidations.instagram"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('instagram')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('instagram') && touched.instagram">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('github') && touched.github },
            { 'md-form-group': true },
            { 'md-error': errors.has('github') }
          ]">
          <md-icon><i class="fab fa-github"></i></md-icon>
          <label>Github</label>
          <md-input @change="addGithub" v-model="github" data-vv-name="github" type="text" name="github" v-validate="modelValidations.github"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('github')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('github') && touched.github">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('personalWebsite') && touched.personalWebsite },
            { 'md-form-group': true },
            { 'md-error': errors.has('personalWebsite') }
          ]">
          <md-icon><i class="fas fa-globe"></i></md-icon>
          <label>Personal Website</label>
          <md-input @change="addPersonalWebsite" v-model="personalWebsite" data-vv-name="personalWebsite" type="text" name="personalWebsite" v-validate="modelValidations.personalWebsite"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('personalWebsite')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('personalWebsite') && touched.personalWebsite">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('id') && touched.id },
            { 'md-form-group': true },
            { 'md-error': errors.has('id') }
          ]">
          <label>ID/Passport</label>
          <md-file @change="previewID" v-model="id" data-vv-name="id" name="id" v-validate="modelValidations.id" />
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('id')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('id') && touched.id">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
      
      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('cv') && touched.cv },
            { 'md-form-group': true },
            { 'md-error': errors.has('cv') }
          ]">
          <label>CV</label>
          <md-file @change="previewCV" v-model="cv" data-vv-name="cv" name="cv" v-validate="modelValidations.cv" />
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('cv')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('cv') && touched.cv">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('portfolio') && touched.portfolio },
            { 'md-form-group': true },
            { 'md-error': errors.has('portfolio') }
          ]">
          <label>Portfolio</label>
          <md-file @change="previewPortfolio" v-model="portfolio" data-vv-name="portfolio" name="portfolio" v-validate="modelValidations.portfolio" />
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('portfolio')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('portfolio') && touched.portfolio">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('certificate1') && touched.certificate1 },
            { 'md-form-group': true },
            { 'md-error': errors.has('certificate1') }
          ]">
          <label>Certificate #1</label>
          <md-file @change="previewCertificate1" v-model="certificate1" data-vv-name="certificate1" name="certificate1" v-validate="modelValidations.certificate1" />
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('certificate1')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('certificate1') && touched.certificate1">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div v-if="certificate1" class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('certificate2') && touched.certificate2 },
            { 'md-form-group': true },
            { 'md-error': errors.has('certificate2') }
          ]">
          <label>Certificate #2</label>
          <md-file @change="previewCertificate2" v-model="certificate2" data-vv-name="certificate2" name="certificate2" v-validate="modelValidations.certificate2" />
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('certificate2')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('certificate2') && touched.certificate2">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div v-if="certificate2" class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('certificate3') && touched.certificate3 },
            { 'md-form-group': true },
            { 'md-error': errors.has('certificate3') }
          ]">
          <label>Certificate #3</label>
          <md-file @change="previewCertificate3" v-model="certificate3" data-vv-name="certificate3" name="certificate3" v-validate="modelValidations.certificate3" />
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('certificate3')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('certificate3') && touched.certificate3">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
    </div>
    <modal v-if="modal" @close="modalHide">
      <template slot="header">
        <h4 class="modal-title black">Whoa there! ✋</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <p class="black">You cannot exceed the file limit of 2MB</p>
      </template>
      <template slot="footer">
        <div class="centre">
          <!-- Modal: Verify Email and continue creating account -->
          <md-button class="md-button md-success" @click="modalHide">Got it</md-button>
        </div>
      </template>
    </modal> 
  </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import { Modal } from "@/components";
import db from '@/firebase/init';
import firebase, { storage } from 'firebase/app';
import debounce from "debounce";
import moment from "moment";
export default {
  components: {
    SlideYDownTransition,
    Modal
  },
  data() {
    return {
      modal: null,
      alias: null,
      loading: false,
      linkedIn: null,
      facebook: null,
      twitter: null,
      instagram: null,
      github: null,
      portfolio: null,
      certificate1: null,
      certificate2: null,
      certificate3: null,
      personalWebsite: null,
      id: null,
      cv: null,
      uploadCV: 0,
      transcript: null,
      touched: {
        linkedIn: false,
        facebook: false,
        twitter: false,
        instagram: false,
        github: false,
        portfolio: false,
        cv: false,
        certificate1: false,
        certificate2: false,
        certificate3: false,
        personalWebsite: false
      },
      modelValidations: {
        linkedIn: {
          min: 6
        },
        facebook: {
          min: 6
        },
        twitter: {
          min: 6
        },
        instagram: {
          min: 6
        },
        github: {
          min: 6
        },
        personalWebsite: {
          min: 6
        },
        portfolio: {
        },
        certificate1: {
        },
        certificate2: {
        },
        certificate3: {
        },
        id: {
        },
        cv: {
          required: true
        },
        transcript: {
        }
      }
    };
  },
  methods: {
    previewID(event) {
      this.uploadValue = 0;
      var file = event.target.files[0];
      if(file.size < 2 * 1024 * 1024) {
        this.fileUpload(file, "ID");
      }
      else {
        this.modal = true;
      }
    },
    previewCV(event) {
      this.uploadValue = 0;
      var file = event.target.files[0];
      if(file.size < 2 * 1024 * 1024) {
        this.fileUpload(file, "CV");
      }
      else {
        this.modal = true;
      }
    },
    previewPortfolio(event) {
      this.uploadValue = 0;
      var file = event.target.files[0];
      if(file.size < 2 * 1024 * 1024) {
        this.fileUpload(file, "Portfolio");
      }
      else {
        this.modal = true;
      }
    },
    previewCertificate1(event) {
      this.uploadValue = 0;
      var file = event.target.files[0];
      if(file.size < 2 * 1024 * 1024) {
        this.fileUpload(file, "certificate-1");
      }
      else {
        this.modal = true;
      }
    },
    previewCertificate2(event) {
      this.uploadValue = 0;
      var file = event.target.files[0];
      if(file.size < 2 * 1024 * 1024) {
        this.fileUpload(file, "certificate-2");
      }
      else {
        this.modal = true;
      }
    },
    previewCertificate3(event) {
      this.uploadValue = 0;
      var file = event.target.files[0];
      if(file.size < 2 * 1024 * 1024) {
        this.fileUpload(file, "certificate-3");
      }
      else {
        this.modal = true;
      }
    },
    fileUpload(data, location) {
      this.loading = true;
      const storageRef = firebase.storage().ref().child('users/students/' + this.alias + '/' + location + '/' + data.name).put(data);
      storageRef.on(`state_changed`, snapshot => {
        this.uploadCV = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error => {
        console.log(error.message);
      }, () => {
        this.uploadCV = 100;
        storageRef.snapshot.ref.getDownloadURL().then(url => {
          if(location === "ID") {
            this.id = url;
            this.student.update({
              id: this.id,
              lastModified: moment(Date.now()).format('L')
            });
            this.loading = false;
          }
          if(location === "CV") {
            this.cv = url;
            this.student.update({
              cv: this.cv,
              lastModified: moment(Date.now()).format('L')
            });
            this.loading = false;
          }
          if(location === "Portfolio") {
            this.portfolio = url;
            this.student.update({
              portfolio: this.portfolio,
              lastModified: moment(Date.now()).format('L')
            });
            this.loading = false;
          }
          if(location === "certificate-1") {
            this.certificate1 = url;
            this.student.update({
              certificate1: this.certificate1,
              lastModified: moment(Date.now()).format('L')
            });
            this.loading = false;
          }
          if(location === "certificate-2") {
            this.certificate2 = url;
            this.student.update({
              certificate2: this.certificate2,
              lastModified: moment(Date.now()).format('L')
            });
            this.loading = false;
          }
          if(location === "certificate-3") {
            this.certificate3 = url;
            this.student.update({
              certificate3: this.certificate3,
              lastModified: moment(Date.now()).format('L')
            });
            this.loading = false;
          }
        });
      })
    },
    modalHide() {
      this.modal = false;
    },
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit("on-validated", res);
        return res;
      });
    },
    debouncedUpdate: debounce(function() {
      this.updateAccount();
    }, 1500),
    updateAccount() {
      this.student.get().then(doc => {
        if(doc.exists) {
          if(this.linkedIn) {
            this.student.update({
              linkedIn: this.linkedIn,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.facebook) {
            this.student.update({
              facebook: this.facebook,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.twitter) {
            this.student.update({
              twitter: this.twitter,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.instagram) {
            this.student.update({
              instagram: this.instagram,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.github) {
            this.student.update({
              github: this.github,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.personalWebsite) {
            this.student.update({
              personalWebsite: this.personalWebsite,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.id) {
            this.student.update({
              id: this.id,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.cv) {
            this.student.update({
              cv: this.cv,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.certificate1) {
            this.student.update({
              certificate1: this.certificate1,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.certificate2) {
            this.student.update({
              certificate2: this.certificate2,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.certificate3) {
            this.student.update({
              certificate3: this.certificate3,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.personalWebsite) {
            this.student.update({
              personalWebsite: this.personalWebsite,
              lastModified: moment(Date.now()).format('L')
            });
          }
        }
      });
      this.$notify(
      {
        message: 'Your data has been automatically saved!',
        icon: 'add_alert',
        horizontalAlign: 'center',
        verticalAlign: 'top',
        type: 'success'
      });
    },
    addLinkedIn: function() {
      this.$emit("linkedIn", this.linkedIn);
      this.debouncedUpdate();
    },
    addFacebook: function() {
      this.$emit("facebook", this.facebook);
      this.debouncedUpdate();
    },
    addTwitter: function() {
      this.$emit("twitter", this.twitter);
      this.debouncedUpdate();
    },
    addInstagram: function() {
      this.$emit("instagram", this.instagram);
      this.debouncedUpdate();
    },
    addGithub: function() {
      this.$emit("github", this.github);
      this.debouncedUpdate();
    },
    addCertificate1: function() {
      this.$emit("certificate1", this.certificate1);
      this.debouncedUpdate();
    },
    addCertificate2: function() {
      this.$emit("certificate2", this.certificate2);
      this.debouncedUpdate();
    },
    addCertificate3: function() {
      this.$emit("certificate3", this.certificate3);
      this.debouncedUpdate();
    },
    addPersonalWebsite: function() {
      this.$emit("personalWebsite", this.personalWebsite);
      this.debouncedUpdate();
    },
    addPortfolio: function() {
      this.$emit("portfolio", this.portfolio);
    },
    addCV: function() {
      this.$emit("cv", this.cv);
      this.debouncedUpdate();
    }
  },
  watch: {
    linkedIn() {
      this.touched.linkedIn = true;
    },
    facebook() {
      this.touched.facebook = true;
    },
    twitter() {
      this.touched.twitter = true;
    },
    instagram() {
      this.touched.instagram = true;
    },
    github() {
      this.touched.github = true;
    },
    personalWebsite() {
      this.touched.personalWebsite = true;
    },
    portfolio() {
      this.touched.portfolio = true;
    },
    certificate1() {
      this.touched.certificate1 = true;
    },
    certificate2() {
      this.touched.certificate2 = true;
    },
    certificate3() {
      this.touched.certificate3 = true;
    },
    personalWebsite() {
      this.touched.personalWebsite = true;
    },
    id() {
      this.touched.id = true;
    },
    cv() {
      this.touched.cv = true;
    }
  },
  created() {
    this.user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', this.user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.alias = doc.id;
        this.student = db.collection('students').doc(doc.id);
        this.student.get().then(doc => {
          if(doc.exists) {
            this.linkedIn = doc.data().linkedIn;
            this.facebook = doc.data().facebook;
            this.twitter = doc.data().twitter;
            this.instagram = doc.data().instagram;
            this.github = doc.data().github;
            this.personalWebsite = doc.data().personalWebsite;
            this.portfolio = doc.data().portfolio;
            this.id = doc.data().id;
            this.cv = doc.data().cv;
            this.certificate1 = doc.data().certificate1;
            this.certificate2 = doc.data().certificate2;
            this.certificate3 = doc.data().certificate3;
          }
        })
        .catch(err => {
          console.log(err.message);
        });
      });
    });
  }
};
</script>
<style scoped>
@media only screen and (max-width: 768px) {
  .md-field label {
    font-size: 11px;
  }
}
</style>
