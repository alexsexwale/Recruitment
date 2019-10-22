<template>
  <div>
    <h5 class="info-text">
      Let's start with the basic information (with validation)
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
          <h6 class="description">Choose Picture</h6>
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
          <md-input v-model="firstName" data-vv-name="firstName" type="text" name="firstName" required v-validate="modelValidations.firstName"></md-input>
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
          <md-icon>record_voice_over</md-icon>
          <label>Last Name</label>
          <md-input v-model="lastName" data-vv-name="lastName" type="text" name="lastName" required v-validate="modelValidations.lastName">
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
          <md-icon>email</md-icon>
          <label>Company Name</label>
          <md-input v-model="companyName" data-vv-name="companyName" type="text" name="companyName" required v-validate="modelValidations.companyName">
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
          <md-icon>http</md-icon>
          <label>Company Website</label>
          <md-input v-model="companyWebsite" data-vv-name="companyWebsite" type="text" name="companyWebsite" required v-validate="modelValidations.companyWebsite">
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
          <md-input v-model="phoneNumber" data-vv-name="phoneNumber" type="text" name="phoneNumber" required v-validate="modelValidations.phoneNumber">
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
          <md-icon>email</md-icon>
          <label>VAT No.</label>
          <md-input v-model="vat" data-vv-name="vat" type="text" name="vat" required v-validate="modelValidations.vat">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('vat')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('vat') && touched.vat">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('companySize') && touched.companySize },
            { 'md-form-group': true },
            { 'md-error': errors.has('companySize') }
          ]">
          <md-icon>email</md-icon>
          <label>Company Size</label>
          <md-input v-model="companySize" data-vv-name="companySize" type="text" name="companySize" required v-validate="modelValidations.companySize">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('companySize')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('companySize') && touched.companySize">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('industry') && touched.industry },
            { 'md-form-group': true },
            { 'md-error': errors.has('industry') }
          ]">
          <md-icon>email</md-icon>
          <label>Industry</label>
          <md-input v-model="industry" data-vv-name="industry" type="text" name="industry" required v-validate="modelValidations.industry">
          </md-input>
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
      single: null,
      firstName: "",
      lastName: "",
      companyName: "",
      companyWebsite: "",
      phoneNumber: "",
      vat: "",
      companySize: "",
      industry: "",
      email: "",
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
        email: {
          required: true,
          email: true
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
          max: 10
        },
        vat: {
          required: true
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
    }
  },
  watch: {
    firstName() {
      this.touched.firstName = true;
    },
    lastName() {
      this.touched.lastName = true;
    },
    email() {
      this.touched.email = true;
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
      this.touched.industry
    }
  }
};
</script>
<style></style>
