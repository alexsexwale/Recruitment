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
          <md-input @change="addBudget" v-model="budget" data-vv-name="budget" type="number" name="budget" required disabled v-validate="modelValidations.budget"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('budget')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('budget') && touched.budget">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
      <div class="md-layout-item md-size-50 md-small-size-100">
        <icon-checkbox v-model="upfront" icon="fas fa-laptop" title="Upfront"></icon-checkbox>
      </div>
      <div class="md-layout-item md-size-50 md-small-size-100">
        <icon-checkbox v-model="postPayment" icon="fas fa-building" title="Post Payment"></icon-checkbox>
      </div>
      <div class="md-layout-item mt-4 md-size-100" v-if="postPayment">
        <md-field
          :class="[
            { 'md-valid': !errors.has('payment') && touched.payment },
            { 'md-form-group': true },
            { 'md-error': errors.has('payment') }
          ]">
          <md-icon>face</md-icon>
          <label>Days Until Payment</label>
          <md-input @change="addPayment" v-model="payment" data-vv-name="payment" type="text" name="payment" required v-validate="modelValidations.payment"></md-input>
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
      upfront: false,
      postPayment: false,
      budget: null,
      payment: null,
      touched: {
        budget: false,
        payment: false
      },
      modelValidations: {
        budget: {
          required: true
        },
        payment: {
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
    addBudget: function() {
      this.$emit("budget", this.budget);
    },
    addPayment: function() {
      this.$emit("payment", this.payment);
    }
  },
  watch: {
    budget() {
      this.touched.budget = true;
    },
    payment() {
      this.touched.payment = true;
    }
  },
  created() {
    let job = db.collection('jobs').where('jobId', '==', this.$route.params.id);
    job.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.budget = doc.data().budget;
        this.payment = doc.data().postPayment;
        if(this.payment)
          this.postPayment = true;
        else
          this.upfront = true;
      })
      
    })
  }
};
</script>
<style></style>
