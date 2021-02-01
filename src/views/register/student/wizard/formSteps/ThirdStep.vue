<template>
  <div>
    <h5 class="info-text">
      Tell us about your most recent work experience?
    </h5>
      <div class="md-layout">
      <notifications></notifications>
      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('jobTitle1') && touched.jobTitle1 },
            { 'md-form-group': true },
            { 'md-error': errors.has('jobTitle1') }
          ]">
          <md-icon><i class="fas fa-briefcase"></i></md-icon>
          <label>Job Title</label>
          <md-input @change="addJobTitle1" v-model="jobTitle1" data-vv-name="jobTitle1" type="text" name="jobTitle1" v-validate="modelValidations.jobTitle1">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('jobTitle1')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('jobTitle1') && touched.email">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('employer1') && touched.employer1 },
            { 'md-form-group': true },
            { 'md-error': errors.has('employer1') }
          ]">
          <md-icon><i class="fas fa-user-tie"></i></md-icon>
          <label>Employer</label>
          <md-input @change="addEmployer1" v-model="employer1" data-vv-name="employer1" type="text" name="employer1" v-validate="modelValidations.employer1">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('employer1')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('accountemployer1Number') && touched.employer1">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-datepicker @input="addStartDate1" v-model="startDate1" data-vv-name="startDate1" v-validate="modelValidations.startDate1" md-immediately
          :class="[
            { 'md-valid': !errors.has('startDate1') && touched.startDate1 },
            { 'md-form-group': true },
            { 'md-error': errors.has('startDate1') }
          ]">
          <label>Start Date</label>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('startDate1')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('startDate1') && touched.startDate1">done</md-icon>
          </slide-y-down-transition>
        </md-datepicker>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-datepicker v-if="work === false" @input="addEndDate1" v-model="endDate1" data-vv-name="endDate1" v-validate="modelValidations.endDate1" md-immediately
          :class="[
            { 'md-valid': !errors.has('endDate1') && touched.endDate1 },
            { 'md-form-group': true },
            { 'md-error': errors.has('endDate1') }
          ]">
          <label>End Date</label>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('endDate1')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('endDate1') && touched.endDate1">done</md-icon>
          </slide-y-down-transition>
        </md-datepicker>
        <md-checkbox v-model="work" @click="hideEndDate">I currently work here</md-checkbox>
      </div>

      <md-field :class="[
          { 'md-valid': !errors.has('description1') && touched.description1 },
          { 'md-form-group': true },
          { 'md-error': errors.has('description1') }
        ]">
        <label>Description of experience</label>
        <md-textarea class="pad" @input="addDescription1" v-model="description1" data-vv-name="description1" type="description1" name="description1" v-validate="modelValidations.description1">
        </md-textarea>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('description1')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('description1') && touched.description1">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      <modal v-if="modal" @close="modalHide">
        <template slot="header">
          <h4 class="modal-title black">{{ header }}</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <p class="black">{{ body }}</p>
        </template>
        <template slot="footer">
          <div class="centre">
            <md-button class="md-button md-success" @click="modalHide">Got it</md-button>
          </div>
        </template>
      </modal>
    </div>
  </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import { Modal } from "@/components";
import db from '@/firebase/init';
import firebase from 'firebase/app';
import debounce from "debounce";
import moment from "moment";
export default {
  components: {
    SlideYDownTransition,
    Modal
  },
  data() {
    return {
      user: null,
      modal: false,
      student: null,
      jobTitle1: null,
      employer1: null,
      startDate1: null,
      endDate1: null,
      work: false,
      description1: null,
      touched: {
        jobTitle1: false,
        employer1: false,
        startDate1: false,
        endDate1: false,
        description1: false
      },
      modelValidations: {
        jobTitle1: {
          min: 2
        },
        employer1: {
          min: 2
        },
        startDate1: {
        },
        endDate1: {
        },
        description1: {
          min: 10,
          max: 100
        }
      }
    };
  },
  methods: {
    modalHide() {
      this.modal = false;
    },
    hideEndDate() {
      this.work = !this.work;
      if(this.work === true){
        this.endDate1 = null;
        this.addEndDate1();
      }
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
      this.student.get().then(doc => {
        if(doc.exists) {
          if(this.jobTitle1) {
            this.student.update({
              jobTitle1: this.jobTitle1,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.employer1) {
            this.student.update({
              employer1: this.employer1,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.startDate1) {
            this.student.update({
              startDate1: moment(this.startDate1).format('L'),
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.endDate1) {
            this.student.update({
              endDate1: moment(this.endDate1).format('L'),
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.description1) {
            this.student.update({
              description1: this.description1,
              lastModified: moment(Date.now()).format('L')
            });
          }
        }
      });
      this.$notify(
      {
        message: 'Your data has been automatically saved!',
        icon: 'add_alert',
        horizontalAlign: 'center',
        verticalAlign: 'top',
        type: 'success'
      });
    },
    addJobTitle1: function() {
      this.$emit("jobTitle1", this.jobTitle1);
      this.debouncedUpdate();
    },
    addEmployer1: function() {
      this.$emit("employer1", this.employer1);
      this.debouncedUpdate();
    },
    addStartDate1: function() {
      var today = new Date();
      if(this.startDate1 > today) {
        this.startDate1 = null;
        this.modal = true;
        this.header = "Oops! ✋";
        this.body = "You cannot select a future date";
      }
      else {
        this.$emit("startDate1", this.startDate1);
        this.debouncedUpdate();
      }
      
    },
    addEndDate1: function() {
      var today = new Date();
      if(this.endDate1 > today) {
        this.endDate1 = null;
        this.modal = true;
        this.header = "Oops! ✋";
        this.body = "You cannot select a future date";
      }
      else if(this.endDate1 <= this.startDate1) {
        this.endDate1 = null;
        this.modal = true;
        this.header = "Oops! ✋";
        this.body = "You cannot choose an ending date that is before or on your starting date";
      }
      else {
        this.$emit("endDate1", this.endDate1);
        this.debouncedUpdate();
      }
      
    },
    addDescription1: function() {
      this.$emit("description1", this.description1);
      this.debouncedUpdate();
    }
  },
  watch: {
    jobTitle1() {
      this.touched.jobTitle1 = true;
    },
    employer1() {
      this.touched.employer1 = true;
    },
    startDate1() {
      this.touched.startDate1 = true;
    },
    endDate1() {
      this.touched.endDate1 = true;
    },
    description1() {
      this.touched.description1 = true;
    }
  },
  created() {
    this.user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', this.user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.student = db.collection('students').doc(doc.id);
        this.student.get().then(doc => {
          if(doc.exists) {
            this.jobTitle1 = doc.data().jobTitle1;
            this.employer1 = doc.data().employer1;
            this.startDate1 = new Date(doc.data().startDate1);
            if(doc.data().endDate1)
              this.endDate1 = new Date(doc.data().endDate1);
            else
              this.endDate1 = null;
            this.description1 = doc.data().description1;
          }
        })
        .catch(err => {
          console.log(err.message);
        });
      });
    });
  }
};
</script>
<style scoped>
@media only screen and (max-width: 768px) {
  .md-field label {
    font-size: 11px;
  }
}
</style>
