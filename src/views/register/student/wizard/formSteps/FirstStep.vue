<template>
  <div>
    <h5 class="info-text">
      Tell us a little about yourself
    </h5>
    <div class="md-layout">
      <div class="md-layout-item md-size-40 md-small-size-100">
        <div class="picture-container">
          <div class="picture">
            <div v-if="!image">
              <img :src="avatar" class="picture-src" title="" />
            </div>
            <div v-else>
              <img :src="image" />
            </div>
            <input type="file" @change="onFileChange" />
          </div>
          <h6 class="description">Profile Picture</h6>
        </div>
      </div>
      <div class="md-layout-item md-size-60 mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('firstName') && touched.firstName },
            { 'md-form-group': true },
            { 'md-error': errors.has('firstName') }
          ]">
          <md-icon>face</md-icon>
          <label>First Name</label>
          <md-input @change="addFirstName" v-model="firstName" data-vv-name="firstName" type="text" name="firstName" required v-validate="modelValidations.firstName"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('firstName')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('firstName') && touched.firstName">done</md-icon>
          </slide-y-down-transition>
        </md-field>

        <md-field :class="[
            { 'md-valid': !errors.has('lastName') && touched.lastName },
            { 'md-form-group': true },
            { 'md-error': errors.has('lastName') }
          ]">
          <md-icon>person</md-icon>
          <label>Last Name</label>
          <md-input @change="addLastName" v-model="lastName" data-vv-name="lastName" type="text" name="lastName" required v-validate="modelValidations.lastName"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('lastName')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('lastName') && touched.lastName">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-datepicker @input="addDob" v-model="dob">
          <label>Date of birth</label>
        </md-datepicker>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
              { 'md-valid': !errors.has('gender') && touched.gender },
              { 'md-form-group': true },
              { 'md-error': errors.has('gender') }
            ]">
          <md-icon>face</md-icon>
          <label for="select">Gender</label>
          <md-select @input="addGender" v-model="gender" name="select" style="margin-left: 10px;">
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
          <label for="select">Race</label>
          <md-select @input="addRace" v-model="race" name="select" style="margin-left: 10px;">
            <md-option v-for="(race, index) in races" :key="index" :value="race">{{race}}</md-option>
          </md-select>
          <slide-y-down-transition>
              <md-icon class="error" v-show="errors.has('race')">close</md-icon>
            </slide-y-down-transition>
            <slide-y-down-transition>
              <md-icon class="success" v-show="!errors.has('race') && touched.race">done</md-icon>
            </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('phone') && touched.phone },
            { 'md-form-group': true },
            { 'md-error': errors.has('phone') }
          ]">
          <md-icon>phone</md-icon>
          <label>Phone Number</label>
          <md-input @change="addPhone" v-model="phone" data-vv-name="phone" type="text" name="phone" required v-validate="modelValidations.phone"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('phone')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('phone') && touched.phone">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item">
        <md-field :class="[
            { 'md-valid': !errors.has('aboutMe') && touched.aboutMe },
            { 'md-error': errors.has('aboutMe') }
          ]">
          <label>About Me</label>
          <md-textarea @change="addAboutMe" v-model="aboutMe" data-vv-name="aboutMe" type="text" name="aboutMe" required v-validate="modelValidations.aboutMe"></md-textarea>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('aboutMe')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('aboutMe') && touched.aboutMe">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
    </div> 
  </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import db from '@/firebase/init';
import firebase from 'firebase/app';
export default {
  components: {
    SlideYDownTransition
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
      firstName: null,
      lastName: null,
      dob: null,
      gender: null,
      race: null,
      phone: null,
      aboutMe: null,
      genders:[],
      races:[],
      touched: {
        firstName: false,
        lastName: false,
        dob: false,
        gender: false,
        race: false,
        phone: false,
        aboutMe: false
      },
      modelValidations: {
        firstName: {
          required: true,
          min: 2
        },
        lastName: {
          required: true,
          min: 2
        },
        gender: {
          required: true
        },
        race: {
          required: true
        },
        phone: {
          required: true,
          min: 10,
          max: 10
        },
        aboutMe: {
          required: true
        }
      }
    };
  },
  methods: {
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
    addFirstName: function() {
      this.$emit("firstName", this.firstName);
    },
    addLastName: function() {
      this.$emit("lastName", this.lastName);
    },
    addDob: function() {
      this.$emit("dob", this.dob);
    },
    addGender: function() {
      this.$emit("gender", this.gender);
    },
    addRace: function() {
      this.$emit("race", this.race);
    },
    addPhone: function() {
      this.$emit("phone", this.phone);
    },
    addAboutMe: function() {
      this.$emit("aboutMe", this.aboutMe);
    }
  },
  watch: {
    firstName() {
      this.touched.firstName = true;
    },
    lastName() {
      this.touched.lastName = true;
    },
    dob() {
      this.touched.dob = true;
    },
    gender() {
      this.touched.gender = true;
    },
    race() {
      this.touched.race = true;
    },
    phone() {
      this.touched.phone = true;
    },
    aboutMe() {
      this.touched.aboutMe = true;
    }
  },
  created() {
    let user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.firstName = doc.data().name;
        this.lastName = doc.data().surname;
      });
    });
    let settings = db.collection('Settings').doc('Drop-down Lists');
    settings.get().then(doc => {
      this.genders = doc.data().Genders;
      this.races = doc.data().Races; 
    });
  }
};
</script>
<style></style>
