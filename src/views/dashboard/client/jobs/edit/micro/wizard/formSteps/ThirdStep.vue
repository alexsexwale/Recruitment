<template>
  <div>
    <h5 class="info-text" v-if="jobType === 'Once-off Project/Task'">Let us know what your budget is. Minimum amount is <b><u>R400.00</u></b></h5>
    <h5 class="info-text" v-else-if="jobType === 'Full-time'">Let us know what the employee salary is. Minimum amount is <b><u>R3500.00</u></b> per month.</h5>
    <h5 class="info-text" v-else>Let us know what the employee salary is. Minimum amount is <b><u>R2000.00</u></b> per month.</h5>
    <div class="md-layout">
      <div class="md-layout-item mt-4 md-size-100">
        <md-field
          :class="[
            { 'md-valid': !errors.has('budget') && touched.budget },
            { 'md-form-group': true },
            { 'md-error': errors.has('budget') }
          ]">
          <md-icon><i class="fas fa-wallet"></i></md-icon>
          <label v-if="jobType === 'Once-off Project/Task'">Budget</label>
          <label v-else>Salary</label>
          <md-input v-if="jobType === 'Once-off Project/Task'" @change="addBudget" v-model="budget" data-vv-name="budget" type="number" min="10" step=".01" name="budget" required v-validate="modelValidations.budget"></md-input>
          <md-input v-else-if="jobType === 'Full-time'" @change="addBudget" v-model="budget" data-vv-name="budget" type="number" min="10" step=".01" name="budget" required v-validate="modelValidations.minSalary"></md-input>
          <md-input v-else @change="addBudget" v-model="budget" data-vv-name="budget" type="number" min="10" step=".01" name="budget" required v-validate="modelValidations.salary"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('budget')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('budget') && touched.budget">done</md-icon>
          </slide-y-down-transition>
        </md-field>

        <!-- <md-field v-if="jobType !== 'Once-off Project/Task'"
          :class="[
            { 'md-valid': !errors.has('benefit') && touched.benefit },
            { 'md-form-group': true },
            { 'md-error': errors.has('benefit') }
          ]">
          <md-icon><i class="fas fa-wallet"></i></md-icon>
          <label>Company Benefits</label>
          <md-select @input="benefit" v-model="benefit" data-vv-name="benefit" type="text" name="benefit" required v-validate="modelValidations.benefit" style="margin-left: 10px;" multiple>
            <md-option v-for="(benefit, index) in list.CompanyBenefits" :key="index" :value="benefit">{{benefit}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('benefit')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('benefit') && touched.benefit">done</md-icon>
          </slide-y-down-transition>
        </md-field> -->
      </div>
      <p>Jobox service fee ({{ percentage() }}%): <b>R{{ fee() }}</b><br>
         Admin fee: <b>R{{ price.facilitationFee }}.00</b> <br><br>
         <span style="font-size: 20px;">Total: <b><u>R{{ total() }}</u></b></span>
      </p>
    </div>
  </div>
</template>
<script>
import { IconCheckbox } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
import firebase from "firebase/app";
import db from '@/firebase/init';
import 'firebase/auth';
import 'firebase/firestore';
import moment from "moment";
import debounce from "debounce";
export default {
  components: {
    IconCheckbox,
    SlideYDownTransition
  },
  props: {
    jobType: {},
  },
  data() {
    return {
      microsDoc: null,
      budget: null,
      benefit: null,
      price: {},
      list: {},
      touched: {
        budget: false,
      },
      modelValidations: {
        budget: {
          required: true,
          min_value: 400
        },
        salary: {
          required: true,
          min_value: 2000
        },
        minSalary: {
          required: true,
          min_value: 3500
        },
        benefit: {
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
    debouncedUpdate: debounce(function() {
      this.updateAccount();
    }, 1500),
    updateAccount() {
      this.microsDoc.get().then(doc => {
        if(doc.exists) {
          if(this.budget) {
            this.microsDoc.update({
              budget: this.budget,
              lastModified: moment(Date.now()).format('L')
            });
          }
        }
        if(doc.exists === false) {
          console.log("doc does not exist: " + this.$route.params.id);
        }
        this.$notify(
        {
          message: 'Your data has been automatically saved!',
          icon: 'add_alert',
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: 'success'
        });
      });
    },
    addBudget: function() {
      this.$emit("budget", this.budget);
      this.debouncedUpdate();
    },
    addBenefit: function() {
      this.$emit("benefit", this.benefit);
      this.debouncedUpdate();
    },
    total() {
      let total = (((this.budget * (1 + this.price.serviceFee)) + this.price.facilitationFee).toFixed(2));
      return total;
    },
    percentage() {
      return this.price.serviceFee * 100;
    },
    fee() {
      let fee = ((this.budget * this.price.serviceFee)).toFixed(2);
      return fee;
    },
  },
  watch: {
    budget() {
      this.touched.budget = true;
    },
    benefit() {
      this.touched.benefit = true;
    }
  },
  created() {
    let settings = db.collection('Settings');
    settings.doc('Business Model').get().then(doc => {
      this.price = doc.data();
    });
    settings.doc('Drop-down Lists').get().then(doc => {
      this.list = doc.data();
    });
    let job = db.collection('micros').doc(this.$route.params.id);
    // job.get().then(doc => {
    //   this.budget = doc.data().budget;
    //   let payment = db.collection('payments').doc(this.$route.params.id);
    //   payment.get().then(doc => {
    //     this.paid = doc.data().inboundPayment;
    //   });
    // });


    this.user = firebase.auth().currentUser;
    let ref = db.collection('jobs');
    ref.where('clientId', '==', this.user.uid).get()
    .then(snapshot => {
        snapshot.forEach(doc => {
        if(doc.exists) { 
          //console.log("payments:client exists:" + this.user.uid);
          this.microsDoc = db.collection('micros').doc(this.$route.params.id);
          this.skillsDoc = db.collection('skills').doc(this.$route.params.id);
          this.jobsDoc = db.collection('jobs').doc(this.$route.params.id);
          this.microsDoc.get().then(doc => {
            if(doc.exists) { 
             // console.log("payments:micros exists:" + this.user.uid);
              this.budget = doc.data().budget;
              let payment = db.collection('payments').doc(this.$route.params.id);
              payment.get().then(doc => {
                this.paid = doc.data().inboundPayment;
              });
            }   
          });
        }
      });
    });

  }
};
</script>
<style></style>
