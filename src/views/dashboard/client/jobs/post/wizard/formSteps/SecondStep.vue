<template>
  <div>
    <h5 class="info-text">Specify the location of work</h5>
    <div class="md-layout">
      <div class="md-layout-item md-size-50 md-small-size-100">
        <icon-checkbox @input="remoteSelection" v-model="remote" icon="fas fa-laptop" title="Remote" ></icon-checkbox>
      </div>
      <div class="md-layout-item md-size-50 md-small-size-100">
        <icon-checkbox @input="onsiteSelection" v-model="onsite" icon="fas fa-building" title="On-site" ></icon-checkbox>
      </div>
      <div class="md-layout-item mt-4 md-small-size-100" v-if="onsite">
        <md-field :class="[
            { 'md-valid': !errors.has('location') && touched.location },
            { 'md-form-group': true },
            { 'md-error': errors.has('location') }
          ]">
          <md-icon>face</md-icon>
          <label>location</label>
          <md-input @change="addLocation" v-model="location" data-vv-name="location" type="text" name="location" required v-validate="modelValidations.location"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('location')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('location') && touched.location">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-datepicker @input="addDeadline" v-model="deadline">
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
      remote: true,
      onsite: false,
      location: null,
      deadline: null,
      touched: {
        location:false,
        deadline: false
      },
      modelValidations: {
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
    remoteSelection() {
      if(this.remote)
        this.onsite = false;
      if(!this.remote && !this.onsite)
        this.remote = true;
    },
    onsiteSelection() {
      if(this.onsite)
        this.remote = false;
      if(!this.remote && !this.onsite)
        this.onsite = true;
    },
    addLocation: function() {
      this.$emit('location', this.location);
    },
    addDeadline: function() {
      this.$emit('deadline', this.deadline);
    }
  },
  watch: {
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
