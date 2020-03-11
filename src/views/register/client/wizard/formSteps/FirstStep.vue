<template>
  <div>
    <h5 class="info-text">
      Let's start with the basic information (with validation)
    </h5>
    <div class="md-layout">
      <div class="md-layout-item md-size-40 md-small-size-100">
        <div class="picture-container">
          <div class="picture">
            <div v-if="!file">
              <img :src="avatar" class="picture-src" title="" />
            </div>
            <div v-else>
              <img :src="file" />
            </div>
            <input type="file" @change="onFileChange" />
          </div>
          <h6 class="description">Profile Picture</h6>
        </div>
      </div>
      <div class="md-layout-item md-size-60 mt-4 md-small-size-100">
        <md-field
          :class="[
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
          <md-input @change="addLastName" v-model="lastName" data-vv-name="lastName" type="text" name="lastName" required v-validate="modelValidations.lastName">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('lastName')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('lastName') && touched.lastName">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('companyName') && touched.companyName },
            { 'md-form-group': true },
            { 'md-error': errors.has('companyName') }
          ]">
          <md-icon><i class="fas fa-building"></i></md-icon>
          <label>Company Name</label>
          <md-input @change="addCompanyName" v-model="companyName" data-vv-name="companyName" type="text" name="companyName" required v-validate="modelValidations.companyName">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('companyName')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('companyName') && touched.companyName">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('companyWebsite') && touched.companyWebsite },
            { 'md-form-group': true },
            { 'md-error': errors.has('companyWebsite') }
          ]">
          <md-icon><i class="fas fa-globe"></i></md-icon>
          <label>Company Website</label>
          <md-input @change="addCompanyWebsite" v-model="companyWebsite" data-vv-name="companyWebsite" type="text" name="companyWebsite" required v-validate="modelValidations.companyWebsite">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('companyWebsite')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('companyWebsite') && touched.companyWebsite">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('phoneNumber') && touched.phoneNumber },
            { 'md-form-group': true },
            { 'md-error': errors.has('phoneNumber') }
          ]">
          <md-icon>phone</md-icon>
          <label>Phone Number</label>
          <md-input @change="addPhoneNumber" v-model="phoneNumber" data-vv-name="phoneNumber" type="text" name="phoneNumber" required v-validate="modelValidations.phoneNumber">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('phoneNumber')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('phoneNumber') && touched.phoneNumber">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('vat') && touched.vat },
            { 'md-form-group': true },
            { 'md-error': errors.has('vat') }
          ]">
          <md-icon><i class="fas fa-file-prescription"></i></md-icon>
          <label>VAT No.</label>
          <md-input @change="addVat" v-model="vat" data-vv-name="vat" type="number" name="vat">
          </md-input>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('companySize') && touched.companySize },
            { 'md-form-group': true },
            { 'md-error': errors.has('companySize') }
          ]">
          <md-icon><i class="fas fa-sitemap"></i></md-icon>
          <label>Company Size</label>
          <md-select @input="addCompanySize" v-model="companySize" name="select" style="margin-left: 10px;">
            <md-option v-for="(sizeType, index) in sizeTypes" :key="index" :value="sizeType">{{sizeType}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('companySize')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('companySize') && touched.companySize">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('industry') && touched.industry },
            { 'md-form-group': true },
            { 'md-error': errors.has('industry') }
          ]">
          <md-icon><i class="fas fa-industry"></i></md-icon>
          <md-autocomplete style="margin-left: 10px;" v-model="industry" :md-options="industries" data-vv-name="industry" name="industry" required v-validate="modelValidations.industry">
            <label>Industry</label>
          </md-autocomplete>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('industry')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('industry') && touched.industry">done</md-icon>
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
      file: null,
      firstName: null,
      lastName: null,
      companyName: null,
      companyWebsite: null,
      phoneNumber: null,
      vat: null,
      companySize: null,
      sizeTypes: [],
      industry: null,
      industries: [],
      touched: {
        firstName: false,
        lastName: false,
        companyName: false,
        companyWebsite: false,
        phoneNumber: false,
        vat: false,
        companySize: false,
        industry: false
      },
      modelValidations: {
        firstName: {
          required: true
        },
        lastName: {
          required: true
        },
        companyName: {
          required: true
        },
        companyWebsite: {
          required: true
        },
        phoneNumber: {
          required: true,
          min: 10,
          max: 10,
        },
        vat: {
          required: true,
          min: 10,
          max: 10
        },
        companySize: {
          required: true
        },
        industry: {
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
      this.file = e.target.files;
      this.createImage(this.file[0]);
      this.$emit("file", this.file[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.file = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    addFirstName: function() {
      this.$emit("firstName", this.firstName);
    },
    addLastName: function() {
      this.$emit("lastName", this.lastName);
    },
    addCompanyName: function() {
      this.$emit("companyName", this.companyName);
    },
    addCompanyWebsite: function() {
      this.$emit("companyWebsite", this.companyWebsite);
    },
    addPhoneNumber: function() {
      this.$emit("phoneNumber", this.phoneNumber);
    },
    addVat: function() {
      this.$emit("vat", this.vat);
    },
    addCompanySize: function() {
      this.$emit("companySize", this.companySize);
    },
    addIndustry: function() {
      this.$emit("industry", this.industry);
    }
  },
  watch: {
    firstName() {
      this.touched.firstName = true;
    },
    lastName() {
      this.touched.lastName = true;
    },
    companyName() {
      this.touched.companyName = true;
    },
    companyWebsite() {
      this.touched.companyWebsite = true;
    },
    phoneNumber() {
      this.touched.phoneNumber = true;
    },
    vat() {
      this.touched.vat = true;
    },
    companySize() {
      this.touched.companySize = true;
    },
    industry() {
      this.touched.industry = true;
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
      this.industries = doc.data().Industries;
      this.sizeTypes = doc.data().CompanySizes;
    });
  }
};
</script>
<style></style>
