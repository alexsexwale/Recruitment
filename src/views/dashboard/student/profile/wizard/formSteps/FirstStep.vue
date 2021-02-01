<template>
  <div>
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"><div class="loading"></div></div></div>
    <h5 class="info-text">
      Tell us a little about yourself
    </h5>
    <div class="md-layout">
      <notifications></notifications>
      <div class="md-layout-item md-size-40 md-small-size-100">
        <div class="picture-container">
          <div class="picture">
            <div v-if="!image">
              <img :src="avatar" class="picture-src" title="" />
            </div>
            <div v-else>
              <img :src="image" />
            </div>
            <input type="file" @change="previewImage" title="Profile Picture" />
          </div>
          <h6 class="description">Profile Picture</h6>
          <!-- <h6 class="description">Currently disabled</h6> -->
        </div>
      </div>
      <div class="md-layout-item md-size-60 mt-4 md-small-size-100">
        <md-datepicker @input="addDob" v-model="dob" data-vv-name="dob" required v-validate="modelValidations.dob" md-immediately
          :class="[
              { 'md-valid': !errors.has('dob') && touched.gender },
              { 'md-form-group': true },
              { 'md-error': errors.has('dob') }
            ]">
          <label>Date of birth</label>
          <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('dob')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('dob') && touched.dob">done</md-icon>
          </slide-y-down-transition>
        </md-datepicker>
          
        <md-field :class="[
              { 'md-valid': !errors.has('gender') && touched.gender },
              { 'md-form-group': true },
              { 'md-error': errors.has('gender') }
            ]">
          <md-icon>face</md-icon>
          <label for="gender">Gender</label>
          <md-select class="pad" @input="addGender" v-model="gender" data-vv-name="gender" name="gender" required v-validate="modelValidations.gender">
            <md-option v-for="(gender, index) in genders" :key="index" :value="gender">{{gender}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('gender')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('gender') && touched.gender">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
              { 'md-valid': !errors.has('race') && touched.race },
              { 'md-form-group': true },
              { 'md-error': errors.has('race') }
            ]">
          <md-icon>face</md-icon>
          <label for="race">Race</label>
          <md-select class="pad" @input="addRace" v-model="race" data-vv-name="race" name="race" required v-validate="modelValidations.race">
            <md-option v-for="(race, index) in races" :key="index" :value="race">{{race}}</md-option>
          </md-select>
          <slide-y-down-transition>
              <md-icon class="error" v-show="errors.has('race')">close</md-icon>
            </slide-y-down-transition>
            <slide-y-down-transition>
              <md-icon class="success" v-show="!errors.has('race') && touched.race">done</md-icon>
            </slide-y-down-transition>
        </md-field>

        <md-field :class="[
              { 'md-valid': !errors.has('licence') && touched.licence },
              { 'md-form-group': true },
              { 'md-error': errors.has('licence') }
            ]">
          <md-icon><i class="far fa-id-badge"></i></md-icon>
          <label for="licence">Do you have a Driver's licence?</label>
          <md-select class="pad" @input="addLicence" v-model="licence" data-vv-name="licence" name="licence" required v-validate="modelValidations.licence">
            <md-option v-for="(yes_no, index) in yes_no" :key="index" :value="yes_no">{{yes_no}}</md-option>
          </md-select>
          <slide-y-down-transition>
              <md-icon class="error" v-show="errors.has('licence')">close</md-icon>
            </slide-y-down-transition>
            <slide-y-down-transition>
              <md-icon class="success" v-show="!errors.has('licence') && touched.licence">done</md-icon>
            </slide-y-down-transition>
        </md-field>

        <md-field v-if="licence == 'Yes'" :class="[
              { 'md-valid': !errors.has('vehicle') && touched.vehicle },
              { 'md-form-group': true },
              { 'md-error': errors.has('vehicle') }
            ]">
          <md-icon><i class="fas fa-car"></i></md-icon>
          <label for="vehicle">Do you have your own vehicle?</label>
          <md-select class="pad" @input="addVehicle" v-model="vehicle" data-vv-name="vehicle" name="vehicle" required v-validate="modelValidations.vehicle">
            <md-option v-for="(yes_no, index) in yes_no" :key="index" :value="yes_no">{{yes_no}}</md-option>
          </md-select>
          <slide-y-down-transition>
              <md-icon class="error" v-show="errors.has('vehicle')">close</md-icon>
            </slide-y-down-transition>
            <slide-y-down-transition>
              <md-icon class="success" v-show="!errors.has('vehicle') && touched.vehicle">done</md-icon>
            </slide-y-down-transition>
        </md-field>
        
        <md-field :class="[
            { 'md-valid': !errors.has('bio') && touched.bio },
            { 'md-error': errors.has('bio') }
          ]">
          <label>Professional Summary</label>
          <md-textarea @change="addBio" v-model="bio" data-vv-name="bio" type="text" name="bio" aria-placeholder="2 to 3 Sentences about your overall experience" required v-validate="modelValidations.bio"></md-textarea>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('bio')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('bio') && touched.bio">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
    </div>
    <modal v-if="modal" @close="modalHide">
      <template slot="header">
        <h4 class="modal-title black">{{ header }}</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <p class="black">{{ body }}</p>
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
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import moment from "moment";
import debounce from "debounce";
export default {
  components: {
    SlideYDownTransition,
    Modal
  },
  props: {
    avatar: {
      type: String,
      default: "./img/default-avatar.png"
    }
  },
  data() {
    return {
      alias: null,
      image: "",
      loading: null,
      modal: false,
      header: "",
      body: "",
      user: null,
      student: null,
      dob: null,
      gender: null,
      race: null,
      licence: null,
      vehicle: "No",
      bio: null,
      genders:[],
      races:[],
      yes_no:[],
      touched: {
        dob: false,
        gender: false,
        race: false,
        bio: false
      },
      modelValidations: {
        dob: {
          required: true
        },
        gender: {
          required: true
        },
        race: {
          required: true
        },
        bio: {
          required: true,
          min: 10,
          max: 100
        }
      }
    };
  },
  methods: {
    previewImage(event) {
      var file = event.target.files[0];
      if(file.size < 2 * 1024 * 1024) { // less than 2MB
        this.fileUpload(file);
      }
      else {
        this.modal = true;
        this.header = "Whoa there! ✋";
        this.body = "You cannot exceed the file limit of 2MB";
      }
    },
    fileUpload(data) {
      this.loading = true;
      const storageRef = firebase.storage().ref().child('users/students/' + this.alias + '/profile/' + data.name).put(data);
      storageRef.on(`state_changed`, snapshot => {
      }, error => {
        console.log(error.message);
      }, () => {
        storageRef.snapshot.ref.getDownloadURL().then(url => {
          this.image = url;
          console.log(this.image)
          this.updateAccount();
          this.loading = false;
        });
      })
    },
    calculateAge(birthday) {
      var today = new Date();
      var birthDate = new Date(birthday);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
    },
    modalHide() {
      this.modal = false;
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
    debouncedUpdate: debounce(function() {
      this.updateAccount();
    }, 1500),
    updateAccount() {
      this.student.get().then(doc => {
        if(doc.exists) {
          if(this.dob) {
            this.student.update({
              dateOfBirth: moment(this.dob).format('L'),
              lastModified: moment(Date.now()).format('L'),
            });
          }
          if(this.image) {
            this.student.update({
              profile: this.image,
              lastModified: moment(Date.now()).format('L'),
            });
          }
          if(this.gender) {
            this.student.update({
              gender: this.gender,
              lastModified: moment(Date.now()).format('L'),
            });
          }
          if(this.race) {
            this.student.update({
              race: this.race,
              lastModified: moment(Date.now()).format('L'),
            });
          }
          if(this.licence === "No") {
            this.vehicle = "No";
            this.student.update({
              vehicle: this.vehicle,
              licence: this.licence,
              lastModified: moment(Date.now()).format('L')
            });
          }
          else {
            this.student.update({
              licence: this.licence,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.vehicle) {
            this.student.update({
              vehicle: this.vehicle,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.bio) {
            this.student.update({
              bio: this.bio,
              lastModified: moment(Date.now()).format('L'),
            });
          }
        }
        
        if(doc.exists === false) {
          this.student.set({
            userId: this.user.uid,
            created: moment(Date.now()).format('L'),
            lastModified: moment(Date.now()).format('L'),
            dateOfBirth: moment(this.dob).format('L'),
            gender: this.gender,
            race: this.race,
            licence: this.licence,
            vehicle: this.vehicle,
            bio: this.bio,
            institution: null,
            institutionType: "University",
            campus: null,
            studentNo: null,
            faculty: null,
            degree: null,
            year: null,
            jobTitle1: null,
            employer1: null,
            startDate1: null,
            endDate1: null,
            description1: null,
            graduateStatus: null,
            accountName: null,
            accountNumber: null,
            accountType: null,
            bankName: null,
            branchCode: null,
            accountCreated: false,
            portfolio: null,
            linkedIn: null,
            facebook: null,
            twitter: null,
            instagram: null,
            gitHub: null,
            portfolio: null,
            personalWebsite: null,
            profile: null
          });
        }
        this.$notify(
        {
          message: 'Your data has been automatically saved!',
          icon: 'add_alert',
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: 'success'
        });
      });
    },
    addDob: function() {
      if(this.calculateAge(this.dob) > 17) {
        this.$emit("dob", this.dob);
        this.debouncedUpdate();
      }
      else {
        this.dob = null;
        this.modal = true;
        this.header = "Under The Age Limit! ✋";
        this.body = "Unfortunately, you are too young to sign up to the platform.";
      }
    },
    addGender: function() {
      this.$emit("gender", this.gender);
      this.debouncedUpdate();
    },
    addRace: function() {
      this.$emit("race", this.race);
      this.debouncedUpdate();
    },
    addLicence: function() {
      this.$emit("licence", this.licence);
      this.debouncedUpdate();
    },
    addVehicle: function() {
      this.$emit("vehicle", this.vehicle);
      this.debouncedUpdate();
    },
    addBio: function() {
      this.$emit("bio", this.bio);
      this.debouncedUpdate();
    }
  },
  watch: {
    dob() {
      this.touched.dob = true;
    },
    gender() {
      this.touched.gender = true;
    },
    race() {
      this.touched.race = true;
    },
    bio() {
      this.touched.bio = true;
    },
    licence() {
      this.touched.licence = true;
    },
    vehicle() {
      this.touched.vehicle = true;
    }
  },
  created() {
    let settings = db.collection('Settings').doc('Drop-down Lists');
    settings.get().then(doc => {
      this.genders = doc.data().Genders;
      this.races = doc.data().Races;
      this.yes_no = doc.data().yes_no;

    });

    this.user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', this.user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.alias = doc.id;
        this.student = db.collection('students').doc(doc.id);
        this.student.get().then(doc => {
          if(doc.exists) {
            this.dob = new Date(doc.data().dateOfBirth);
            this.gender = doc.data().gender;
            this.race = doc.data().race;
            this.bio = doc.data().bio;
            this.licence = doc.data().licence;
            this.vehicle = doc.data().vehicle;
            this.image = doc.data().profile;
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