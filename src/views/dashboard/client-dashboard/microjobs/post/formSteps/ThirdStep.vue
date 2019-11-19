<template>
  <div>
    <h5 class="info-text">Specify the location of work</h5>
    <div class="md-layout">
      <div class="md-layout-item mt-4 md-size-100">
        <md-field
          :class="[
            { 'md-valid': !errors.has('budget') && touched.budget },
            { 'md-form-group': true },
            { 'md-error': errors.has('budget') }
          ]">
          <md-icon>face</md-icon>
          <label>Budget</label>
          <md-input v-model="budget" data-vv-name="budget" type="text" name="budget" required v-validate="modelValidations.budget"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('budget')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('budget') && touched.budget">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
      <div class="md-layout-item md-size-50 md-small-size-100">
        <icon-checkbox v-model="model.upfront" icon="fas fa-laptop" title="Upfront"></icon-checkbox>
      </div>
      <div class="md-layout-item md-size-50 md-small-size-100">
        <icon-checkbox v-model="model.postPayment" icon="fas fa-building" title="Post Payment"></icon-checkbox>
      </div>
      <div class="md-layout-item mt-4 md-size-100" v-if="model.postPayment">
        <md-field
          :class="[
            { 'md-valid': !errors.has('payment') && touched.payment },
            { 'md-form-group': true },
            { 'md-error': errors.has('payment') }
          ]">
          <md-icon>face</md-icon>
          <label>Days Until Payment</label>
          <md-input v-model="payment" data-vv-name="payment" type="text" name="payment" required v-validate="modelValidations.payment"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('payment')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('payment') && touched.payment">done</md-icon>
          </slide-y-down-transition>
        </md-field>
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
        upfront: false,
        postPayment: false
      },
      budget: "",
      touched: {
        budget: false
      },
      modelValidations: {
        budget: {
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
    }
  },
  watch: {
    budget() {
      this.touched.budget = true;
    }
  }
};
</script>
<style></style>
