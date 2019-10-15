<template>
  <div>
    <h5 class="info-text">
      Tell us about your studies
    </h5>
    <div class="md-layout">

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('email') && touched.email },
            { 'md-form-group': true },
            { 'md-error': errors.has('email') }
          ]">
          <md-icon>school</md-icon>
          <label>Where do you study?</label>
          <md-input v-model="email" data-vv-name="email" type="text" name="email" required v-validate="modelValidations.email">
          </md-input>
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
            { 'md-valid': !errors.has('email') && touched.email },
            { 'md-form-group': true },
            { 'md-error': errors.has('email') }
          ]">
          <md-icon>school</md-icon>
          <label>Select your campus</label>
          <md-input v-model="email" data-vv-name="email" type="text" name="email" required v-validate="modelValidations.email">
          </md-input>
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
            { 'md-valid': !errors.has('email') && touched.email },
            { 'md-form-group': true },
            { 'md-error': errors.has('email') }
          ]">
          <md-icon>school</md-icon>
          <label>Student Number</label>
          <md-input v-model="email" data-vv-name="email" type="text" name="email" required v-validate="modelValidations.email">
          </md-input>
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
            { 'md-valid': !errors.has('email') && touched.email },
            { 'md-form-group': true },
            { 'md-error': errors.has('email') }
          ]">
          <md-icon>school</md-icon>
          <label>Select your faculty</label>
          <md-input v-model="email" data-vv-name="email" type="text" name="email" required v-validate="modelValidations.email">
          </md-input>
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
            { 'md-valid': !errors.has('email') && touched.email },
            { 'md-form-group': true },
            { 'md-error': errors.has('email') }
          ]">
          <md-icon>school</md-icon>
          <label>Select your degree</label>
          <md-input v-model="email" data-vv-name="email" type="text" name="email" required v-validate="modelValidations.email">
          </md-input>
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
            { 'md-valid': !errors.has('email') && touched.email },
            { 'md-form-group': true },
            { 'md-error': errors.has('email') }
          ]">
          <md-icon>school</md-icon>
          <label>Select your major</label>
          <md-input v-model="email" data-vv-name="email" type="text" name="email" required v-validate="modelValidations.email">
          </md-input>
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
            { 'md-valid': !errors.has('email') && touched.email },
            { 'md-form-group': true },
            { 'md-error': errors.has('email') }
          ]">
          <md-icon>school</md-icon>
          <label>What year are you in?</label>
          <md-input v-model="email" data-vv-name="email" type="text" name="email" required v-validate="modelValidations.email">
          </md-input>
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
            { 'md-valid': !errors.has('email') && touched.email },
            { 'md-form-group': true },
            { 'md-error': errors.has('email') }
          ]">
          <md-icon>school</md-icon>
          <label>Undergraduate/Postgraduate</label>
          <md-input v-model="email" data-vv-name="email" type="text" name="email" required v-validate="modelValidations.email">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('email')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('email') && touched.email">done</md-icon>
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
      gender: "",
      email: "",
      touched: {
        firstName: false,
        lastName: false
      },
      modelValidations: {
        firstName: {
          required: true,
          min: 5
        },
        lastName: {
          required: true,
          min: 5
        },
        email: {
          required: true,
          email: true
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
    }
  }
};
</script>
<style></style>
