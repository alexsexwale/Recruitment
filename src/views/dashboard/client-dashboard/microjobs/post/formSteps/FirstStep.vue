<template>
  <div>
    <h5 class="info-text">
      Let's start with the basic information about the microjob
    </h5>
    <div class="md-layout">
      <div class="md-layout-item mt-4 md-small-size-100">
        <md-field
          :class="[
            { 'md-valid': !errors.has('name') && touched.name },
            { 'md-form-group': true },
            { 'md-error': errors.has('name') }
          ]">
          <md-icon>face</md-icon>
          <label>Microjob Name</label>
          <md-input v-model="name" data-vv-name="name" type="text" name="name" required v-validate="modelValidations.name"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('name')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('name') && touched.name">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
      <div class="md-layout-item mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('description') && touched.description },
            { 'md-form-group': true },
            { 'md-error': errors.has('description') }
          ]">
          <md-icon>record_voice_over</md-icon>
          <label>Microjob Description</label>
          <md-input v-model="description" data-vv-name="description" type="text" name="description" required v-validate="modelValidations.description">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('description')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('description') && touched.description">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
      <div class="md-layout-item mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('skills') && touched.skills },
            { 'md-form-group': true },
            { 'md-error': errors.has('skills') }
          ]">
          <md-icon>record_voice_over</md-icon>
          <label>Required Skills</label>
          <!-- <md-input v-model="skills" data-vv-name="skills" type="text" name="skills" required v-validate="modelValidations.skills">
          </md-input> -->
          <md-chips v-model="skills" data-vv-name="skills" type="text" name="skills" required v-validate="modelValidations.skills"><!-- :md-limit="5"> -->
          <div class="md-helper-text">Eg. Bookeeping</div>
          </md-chips>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('skills')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('skills') && touched.skills">done</md-icon>
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
      name:"",
      description: "",
      skills: [],
      touched: {
        name: false,
        description: false,
       // skills: false,
      },
      modelValidations: {
        name: {
          required: true
        },
        description: {
          required: true
        },
        skills: {
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
    }
  },
  watch: {
    name() {
      this.touched.name = true;
    },
    description() {
      this.touched.description = true;
    },
    skills() {
      this.touched.skills = true;
    }
  }
};
</script>
<style></style>
