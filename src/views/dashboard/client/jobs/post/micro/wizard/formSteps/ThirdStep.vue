<template>
  <div>
    <h5 class="info-text">Let us know what your budget is. Minimum amount is R400.00</h5>
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
          <md-input @change="addBudget" v-model="budget" data-vv-name="budget" type="number" min="10" step=".01" name="budget" required v-validate="modelValidations.budget"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('budget')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('budget') && touched.budget">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
      <p>Jobox service fee at 15%<br>Payment facilitation fee at R100.00 <br>Total: R{{ total() }} </p>
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
      budget: null,
      touched: {
        budget: false,
      },
      modelValidations: {
        budget: {
          required: true,
          min_value: 400
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
    addBudget: function() {
      this.$emit("budget", this.budget);
    },
    total() {
      let total = (((this.budget * 1.15) + 100).toFixed(2));
      return total;
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
