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
            { 'md-error': errors.has('location') }
          ]">
          <label>Location</label>
          <md-input @change="addLocation" v-model="location" data-vv-name="location" type="text" name="location" required v-validate="modelValidations.location"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('location')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('location') && touched.location">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
      <br/><br/>
      <div v-if="jobType === 'Once-off Project/Task'" class="md-layout-item mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('deadline') && touched.deadline },
            { 'md-error': errors.has('deadline') }
          ]">
          <label>Duration</label>
          <md-select @input="addDeadline" v-model="deadline" data-vv-name="deadline" type="text" name="deadline" required v-validate="modelValidations.deadline" style="margin-left: 10px;">
            <md-option v-for="(deadline, index) in deadlines" :key="index" :value="deadline">{{deadline}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('deadline')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('deadline') && touched.deadline">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div v-if="jobType !== 'Once-off Project/Task'" class="md-layout-item mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('daysOfTheWeek') && touched.daysOfTheWeek },
            { 'md-error': errors.has('daysOfTheWeek') }
          ]">
          <label>Working Days</label>
          <md-select @input="addDaysOfTheWeek" v-model="daysOfTheWeek" data-vv-name="daysOfTheWeek" type="text" name="daysOfTheWeek" multiple style="margin-left: 10px;">
            <md-option v-for="(daysOfTheWeek, index) in DaysOfTheWeek" :key="index" :value="daysOfTheWeek">{{daysOfTheWeek}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('daysOfTheWeek')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('daysOfTheWeek') && touched.daysOfTheWeek">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div v-if="jobType === 'Internship' || jobType === 'Part-time'" class="md-layout-item mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('hours') && touched.hours },
            { 'md-error': errors.has('hours') }
          ]">
          <label>Working Hours Per week</label>
          <md-select @input="addHours" v-model="hours" data-vv-name="hours" type="text" name="hours" v-validate="modelValidations.hours" style="margin-left: 10px;">
            <md-option v-for="(hours, index) in workingHours" :key="index" :value="hours">{{hours}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('hours')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('hours') && touched.hours">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item mt-4 md-small-size-100">
        <md-datepicker @input="addStartDate" v-model="startDate" data-vv-name="startDate" required v-validate="modelValidations.startDate" :md-disabled-dates="disabledDates" md-immediately
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
    </div>
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
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import moment from "moment";
import { IconCheckbox } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
import { Modal } from "@/components";

export default {
  components: {
    IconCheckbox,
    SlideYDownTransition,
    Modal
  },
  props: {
    jobType: {}
  },
  data() {
    return {
      remote: true,
      onsite: false,
      location: null,
      deadline: null,
      hours: null,
      daysOfTheWeek: null,
      DaysOfTheWeek: null,
      deadlines: null,
      workingHours: null,
      startDate: null,
      disabledDates: date => {
        const day = date.getDay()
        return day === 6 || day === 0
      },
      days: 14, 
      modal: false,
      header: null,
      body: null,
      touched: {
        location:false,
        deadline: false,
        hours: false,
        daysOfTheWeek: false,
        startDate: false
      },
      modelValidations: {
        location: {
          required: true
        },
        deadline: {
          required: true
        },
        hours: {
          required: true
        },
        daysOfTheWeek: {
          required: true
        },
        startDate: {
          required: true
        }
      }
    };
  },
  methods: {
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
      if(this.remote) {
        this.onsite = false;
      }
      if(!this.remote && !this.onsite) {
        this.remote = true;
      }
      this.addRemote();
    },
    onsiteSelection() {
      if(this.onsite) {
        this.remote = false;
      }
      if(!this.remote && !this.onsite) {
        this.onsite = true;
      }
    },
    addRemote: function() {
      this.$emit("location", "Remote");
    },
    addLocation: function() {
      this.$emit("location", this.location);
    },
    addDeadline: function() {
      this.$emit("deadline", this.deadline);
    },
    addHours: function() {
      this.deadline = null;
      this.$emit("hours", this.hours);
    },
    addDaysOfTheWeek: function() {
      this.deadline = null;
      this.$emit("daysOfTheWeek", this.daysOfTheWeek);
    },
    addStartDate: function() {
      var date = new Date();
      var daysAfter = new Date(date.getFullYear(), date.getMonth(), date.getDate() + this.days);
      if(this.startDate <= date) {
        this.startDate = null;
        this.modal = true;
        this.header = "Oops! ✋";
        this.body = "You cannot select any days before today's date. Please select a date after " + moment(daysAfter).format('LL');
      }
      else if(this.startDate <= daysAfter) {
        this.startDate = null;
        this.modal = true;
        this.header = "Oops! ✋";
        this.body = "You cannot select a date " + this.days + " days before the start date. Please select a date after " + moment(daysAfter).format('LL');
      }
      else {
        this.$emit("startDate", this.startDate);
      }
    },
    modalHide() {
      this.modal = false;
    }
  },
  watch: {
    location() {
      this.touched.location = true;
    },
    deadline() {
      this.touched.deadline = true;
    },
    hours() {
      this.touched.hours = true;
    },
    daysOfTheWeek() {
      this.touched.daysOfTheWeek = true;
    },
    startDate() {
      this.touched.startDate = true;
    }
  },
  created() {
    let settings = db.collection('Settings');
    settings.doc('Drop-down Lists').get().then(doc => {
      this.deadlines = doc.data().Deadlines;
      this.DaysOfTheWeek = doc.data().DaysOfTheWeek;
      this.workingHours = doc.data().WorkingHours;
    });
    settings.doc('Business Model').get().then(doc => {
      this.days = doc.data().startDate;
    });
    this.remoteSelection();
    
    let job = db.collection('micros').doc(this.$route.params.id);
    job.get().then(doc => {
      this.location = doc.data().location;
      this.deadline = doc.data().duration;
      this.daysOfTheWeek = doc.data().daysOfTheWeek;
      this.hours = doc.data().workingHours;
      if(this.location == "Remote")
        this.remote = true;
      else
        this.onsite = true;
      db.collection('jobs').doc(this.$route.params.id).get()
      .then(doc => {
        this.startDate = new Date(doc.data().startDate);
      });
    });
  }
};
</script>
<style>
.padding {
  padding:10px;
}
.margin-left {
  margin-left: 10px;
}
</style>
