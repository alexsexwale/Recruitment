<template>
  <div>
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
            <md-icon class="error" v-show="errors.has('email')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('email') && touched.email">done</md-icon>
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
            { 'md-valid': !errors.has('personalWebsite') && touched.personalWebsite },
            { 'md-form-group': true },
            { 'md-error': errors.has('personalWebsite') }
          ]">
          <md-icon><i class="fas fa-wifi"></i></md-icon>
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
            { 'md-valid': !errors.has('cv') && touched.cv },
            { 'md-form-group': true },
            { 'md-error': errors.has('cv') }
          ]">
          <label>CV</label>
          <md-file @change="previewCV" v-model="cvData.name" data-vv-name="cv" name="cv" required v-validate="modelValidations.cv" />
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
          <md-file @change="addPortfolio" v-model="portfolio" data-vv-name="portfolio" name="portfolio" v-validate="modelValidations.portfolio" />
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
          <md-file @change="addCertificate1" v-model="certificate1" data-vv-name="certificate1" name="certificate1" v-validate="modelValidations.certificate1" />
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
          <md-file @change="addCertificate2" v-model="certificate2" data-vv-name="certificate2" name="certificate2" v-validate="modelValidations.certificate2" />
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
          <md-file @change="addCertificate3" v-model="certificate3" data-vv-name="certificate3" name="certificate3" v-validate="modelValidations.certificate3" />
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('certificate3')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('certificate3') && touched.certificate3">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

    </div>
  </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import db from '@/firebase/init';
import firebase, { storage } from 'firebase/app';
import debounce from "debounce";
import moment from "moment";
export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
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
      cvData: null,
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
          required: true,
          min: 6
        },
        facebook: {
          required: true,
          min: 6
        },
        twitter: {
          required: true,
          min: 6
        },
        instagram: {
          required: true,
          min: 6
        },
        github: {
          required: true,
          min: 6
        },
        personalWebsite: {
          required: true,
          min: 6
        },
        certificate1: {
          required: true
        },
        certificate2: {
          required: true
        },
        certificate3: {
          required: true
        },
        id: {
          required: true
        },
        cv: {
          required: true
        },
        transcript: {
          required: true
        }
      }
    };
  },
  methods: {
    previewCV(event) {
      this.uploadValue = 0;
      this.cv = null;
      this.cvData = event.target.files[0];
      console.log(event);
      this.cvUpload();
    },
    cvUpload() {
      this.cv = null;
      console.log(this.cvData);
      const storageRef = firebase.storage().ref(`${ this.cvData.name}`).put(this.cvData);
      storageRef.on(`state_changed`, snapshot => {
        this.uploadCV = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error => {
        console.log(error.message);
      }, () => {
        this.uploadCV = 100;
        storageRef.snapshot.ref.getDownloadURL().then(url => {
          this.cv = url;
        })
      })
    },
    handlePreview(file) {
      this.model.imageUrl = URL.createObjectURL(file.raw);
    },
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit("on-validated", res);
        return res;
      });
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
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
      this.cvUpload();
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
        let settings = db.collection('Settings').doc('Drop-down Lists');
        settings.get().then(doc => {
          this.twitters = doc.data().twitters;
          this.instagrams = doc.data().Banks;
        });
        this.student = db.collection('students').doc(doc.id);
        this.student.get().then(doc => {
          if(doc.exists) {
            this.linkedIn = doc.data().linkedIn;
            this.facebook = doc.data().facebook;
            this.twitter = doc.data().twitter;
            this.instagram = doc.data().instagram;
            this.github = doc.data().github;
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
