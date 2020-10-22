<template>
  <div>
    <h5 class="info-text">Let us know what your budget is. Minimum amount is R10.00</h5>
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
          <md-input @change="addBudget" v-model="budget" data-vv-name="budget" type="number" name="budget" required v-validate="modelValidations.budget"  :disabled="paid == true"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('budget')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('budget') && touched.budget">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
       <p>Jobox service fee at 10% <br>Total: R{{ total() }} </p>
    </div>
  </div>
</template>
<script>
import db from '@/firebase/init';
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
      paid: null,
      touched: {
        budget: false
      },
      modelValidations: {
        budget: {
          required: true,
          min_value: 10
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
      let total = (this.budget * 1.1).toFixed(2);
      return total;
    }
  },
  watch: {
    budget() {
      this.touched.budget = true;
    }
  },
  created() {
    let job = db.collection('micros').doc(this.$route.params.id);
    job.get().then(doc => {
      this.budget = doc.data().budget;
      let payment = db.collection('payments').doc(this.$route.params.id);
      payment.get().then(doc => {
        this.paid = doc.data().inboundPayment;
      });
    });
    
  }
};
</script>
<style></style>
