<template>
  <div>
    <h5 class="info-text">Specify the location of work</h5>
    <div class="md-layout">
      <div class="md-layout-item md-size-50 md-small-size-100">
        <icon-checkbox v-model="model.remote" icon="fas fa-laptop" title="Remote" v-on:click="model.location"></icon-checkbox>
      </div>
      <div class="md-layout-item md-size-50 md-small-size-100">
        <icon-checkbox v-model="model.location" icon="fas fa-building" title="Promixate" v-on:click="model.remote"></icon-checkbox>
      </div>
      <div class="md-layout-item mt-4 md-small-size-100" v-if="model.location">
        <md-field
          :class="[
            { 'md-valid': !errors.has('location') && touched.name },
            { 'md-form-group': true },
            { 'md-error': errors.has('location') }
          ]">
          <md-icon>face</md-icon>
          <label>location</label>
          <md-input v-model="location" data-vv-name="location" type="text" name="location" required v-validate="modelValidations.location"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('location')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('location') && touched.location">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
      <div class="md-layout-item ml-auto mt-4 md-small-size-100" v-if="model.location">
        <md-datepicker v-model="dob">
          <label>What is the deadline date?</label>
        </md-datepicker>
      </div>
    </div>
  </div>
</template>
<script>
import { IconCheckbox } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";

export default {
  components: {
    IconCheckbox,
    SlideYDownTransition
  },
  data() {
    return {
      model: {
        remote: true,
        location: false
      },
      location:"",
      deadline:"",
      name:"",
      description: "",
      skills: "",
      dob: Date.now(),
      touched: {
        name: false,
        description: false,
        skills: false,
        location:false,
        deadline: false
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
        },
        location: {
          required: true
        },
        deadline: {
          required: true
        }
      }
    };
  },
  methods: {
    validate() {
      this.$emit("on-validated", true, this.model);
      return Promise.resolve(true);
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
    selection() {
      if(model.remote) {
        model.location = false;
      }
      if(model.location) {
        model.remote = false;
      }
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
    },
    location() {
      this.touched.location = true;
    },
    deadline() {
      this.touched.deadline = true;
    }
  }
};
</script>
<style></style>
