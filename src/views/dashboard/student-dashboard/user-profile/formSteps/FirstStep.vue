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

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-datepicker v-model="dob">
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
        <md-select v-model="gender" name="select">
          <md-option value="male">Male</md-option>
          <md-option value="female">Female</md-option>
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
            { 'md-valid': !errors.has('phone') && touched.phone },
            { 'md-form-group': true },
            { 'md-error': errors.has('phone') }
          ]">
          <md-icon>phone</md-icon>
          <label>Phone Number</label>
          <md-input v-model="phone" data-vv-name="phone" type="text" name="phone" required v-validate="modelValidations.phone">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('phone')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('phone') && touched.phone">done</md-icon>
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
      firstName: "Lesedi",
      lastName: "Nkosi",
      dob: Date.now(),
      gender: "Male",
      phone: "0112536789",
      touched: {
        firstName: false,
        lastName: false
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
        phone: {
          required: true,
          min: 10,
          max: 10
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
    dob() {
      this.touched.dob = true;
    },
    gender() {
      this.touched.gender = true;
    },
    phone() {
      this.touched.phone = true;
    }
  }
};
</script>
<style></style>
