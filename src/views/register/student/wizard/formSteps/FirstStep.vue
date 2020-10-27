<template>
  <div>
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
            <input type="file" @change="onFileChange" disabled title="Currently disabled" />
          </div>
          <!-- <h6 class="description">Profile Picture</h6> -->
          <h6 class="description">Currently disabled</h6>
        </div>
      </div>
      <div class="md-layout-item md-size-60 mt-4 md-small-size-100">
        <md-datepicker @input="addDob" v-model="dob" data-vv-name="dob" required v-validate="modelValidations.dob"
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
            { 'md-valid': !errors.has('bio') && touched.bio },
            { 'md-error': errors.has('bio') }
          ]">
          <label>About Me</label>
          <md-textarea @change="addBio" v-model="bio" data-vv-name="bio" type="text" name="bio" required v-validate="modelValidations.bio"></md-textarea>
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
        <h4 class="modal-title black">Under The Age Limit!</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <p class="black">Unfortunately, you are too young to sign up to the platform.</p>
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
      image: "",
      modal: false,
      user: null,
      student: null,
      dob: null,
      gender: null,
      race: null,
      bio: null,
      genders:[],
      races:[],
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
          required: true
        }
      }
    };
  },
  methods: {
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
          if(this.dob) {
            this.student.update({
              dateOfBirth: moment(this.dob).format('L'),
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
            bio: this.bio,
            institution: null,
            institutionType: "University",
            campus: null,
            studentNo: null,
            faculty: null,
            degree: null,
            year: null,
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
            personalWebsite: null
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
    }
  },
  created() {
    let settings = db.collection('Settings').doc('Drop-down Lists');
    settings.get().then(doc => {
      this.genders = doc.data().Genders;
      this.races = doc.data().Races; 
    });

    this.user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', this.user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.student = db.collection('students').doc(doc.id);
        this.student.get().then(doc => {
          if(doc.exists) {
            this.dob = new Date(doc.data().dateOfBirth);
            this.gender = doc.data().gender;
            this.race = doc.data().race;
            this.bio = doc.data().bio;
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