<template>
  <div>
    <h5 class="info-text">
      Tell us about your most recent studies
    </h5>
    <div class="md-layout">
      <notifications></notifications>
      <!-- Currently Studying -->
      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('studying') && touched.studying },
            { 'md-form-group': true },
            { 'md-error': errors.has('studying') }
          ]">
          <md-icon>school</md-icon>
          <label>Are You Currently Studying</label>
          <md-select class="pad" @input="addStudying" v-model="studying" data-vv-name="studying" type="text" name="studying" required v-validate="modelValidations.studying">
            <md-option v-for="(yes_no, index) in yes_no" :key="index" :value="yes_no">{{yes_no}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('studying')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('studying') && touched.studying">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
      <!-- Institution -->
      <div v-if="studying" class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('institution') && touched.institution },
            { 'md-form-group': true },
            { 'md-error': errors.has('institution') }
          ]">
          <md-icon>school</md-icon>
          <label v-if="studying == 'Yes'">Where are you studying?</label>
          <label v-else>Where did you study?</label>
          <md-select class="pad" @input="addInstitution" v-model="institution" data-vv-name="institution" type="text" name="institution" required v-validate="modelValidations.institution">
            <md-option v-for="(institution, index) in institutions" :key="index" :value="institution">{{institution}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('institution')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('institution') && touched.institution">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
       <!-- Start Date -->
      <div v-if="studying === 'No'" class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-datepicker @input="addStartDate" v-model="startDate" data-vv-name="startDate" v-validate="modelValidations.startDate" md-immediately
          :class="[
            { 'md-valid': !errors.has('startDate') && touched.startDate },
            { 'md-form-group': true },
            { 'md-error': errors.has('startDate') }
          ]">
          <label>Start Date</label>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('startDate')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('startDate') && touched.startDate">done</md-icon>
          </slide-y-down-transition>
        </md-datepicker>
      </div>
      <!-- End Date -->
      <div v-if="studying === 'No'" class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-datepicker @input="addEndDate" v-model="endDate" data-vv-name="endDate" v-validate="modelValidations.endDate" md-immediately md-success
          :class="[
            { 'md-valid': !errors.has('endDate') && touched.endDate },
            { 'md-form-group': true },
            { 'md-error': errors.has('endDate') }
          ]">
          <label>End Date</label>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('endDate')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('endDate') && touched.endDate">done</md-icon>
          </slide-y-down-transition>
        </md-datepicker>
      </div>
    </div>
  </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import db from '@/firebase/init';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import debounce from "debounce";
import moment from "moment";
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
      user: null,
      student: null,
      institution: null,
      institutions: [],
      studying: null,
      yes_no: null,
      endDate: null,
      touched: {
        institution: false,
        studying: false,
        startDate: false,
        endDate: false
      },
      modelValidations: {
        institution: {
          required: true
        },
        studying: {
          required: true
        },       
        startDate: {
          required: true
        },
        endDate: {
          required: true
        }
      }
    };
  },
  methods: {
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
          if(this.institutions) {
            this.student.update({
              institution: this.institution,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.studying) {
            this.student.update({
              studying: this.studying,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.startDate) {
            this.student.update({
              startDate: this.studying,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.endDate) {
            this.student.update({
              endDate: this.studying,
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
    addInstitution: function() {
      this.$emit("institution", this.institution);
      this.debouncedUpdate();
    },
    addStudying: function() {
      this.$emit("studying", this.studying);
      this.debouncedUpdate();
    },
    addStartDate: function() {
      this.$emit("startDate", this.startDate);
      this.debouncedUpdate();
    },
    addEndDate: function() {
      this.$emit("endDate", this.endDate);
      this.debouncedUpdate();
    }
  },
  watch: {
    institution() {
      this.touched.institution = true;
    },
    studying() {
      this.touched.studying = true;
    },
    startDate() {
      this.touched.startDate = true;
    },
    endDate() {
      this.touched.endDate = true;
    }
  },
  created() {
    let settings = db.collection('Settings').doc('Drop-down Lists');
    settings.get().then(doc => {
      this.institutions = doc.data().Institutions;
      this.yes_no = doc.data().yes_no;
    });

    this.user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', this.user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.student = db.collection('students').doc(doc.id);
        this.student.get().then(doc => {
          if(doc.exists) {
            this.institution = doc.data().institution;
            this.studying = doc.data().studying;
            this.startDate = doc.data().startDate;
            this.endDate = doc.data().endDate;
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
