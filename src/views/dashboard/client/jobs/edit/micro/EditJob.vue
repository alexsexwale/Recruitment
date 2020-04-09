<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-66 md-xsmall-size-80 mx-auto">
      <simple-wizard
        v-bind:name="name"
        v-bind:description="description"
        v-bind:category="category"
        v-bind:skills="skills"
        v-bind:location="location"
        v-bind:deadline="deadline"
        v-bind:budget="budget"
        v-bind:payment="payment">
        <template slot="header">
          <h3 class="title">Edit {{ name }}</h3>
        </template>

        <wizard-tab :before-change="() => validateStep('step1')">
          <template slot="label">
            <div class="pc-view">Description</div>
            <div class="mobi-view"><i class="fas fa-list-ul"></i></div>  
          </template>
          <first-step ref="step1" 
            @on-validated="onStepValidated"
            @name="addName"
            @description="addDescription"
            @category="addCategory"
            @skills="addSkills">
          </first-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step2')">
          <template slot="label">
            <div class="pc-view">Location</div>
            <div class="mobi-view"><i class="fas fa-location-arrow"></i></div>
          </template>
          <second-step ref="step2"
            @on-validated="onStepValidated"
            @location="addLocation"
            @deadline="addDeadline">
          </second-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step3')">
          <template slot="label">
            <div class="pc-view">Payment</div>
            <div class="mobi-view"><i class="fas fa-wallet"></i></div>
          </template>
          <third-step ref="step3" 
            @on-validated="onStepValidated"
            @budget="addBudget">
          </third-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step4')">
          <template slot="label">
            <div class="pc-view">Review</div>
            <div class="mobi-view"><i class="fas fa-tasks"></i></div>
          </template>
          <fourth-step ref="step4" 
            v-bind:name="name"
            v-bind:description="description"
            v-bind:category="category"
            v-bind:skills="skills"
            v-bind:location="location"
            v-bind:deadline="deadline"
            v-bind:budget="budget">
          </fourth-step>
        </wizard-tab>
      </simple-wizard>
    </div>
  </div>
</template>
<script>
import db from '@/firebase/init';
import FirstStep from "./wizard/formSteps/FirstStep.vue";
import SecondStep from "./wizard/formSteps/SecondStep.vue";
import ThirdStep from "./wizard/formSteps/ThirdStep.vue";
import FourthStep from "./wizard/formSteps/FourthStep.vue";
import swal from "sweetalert2";
import { WizardTab } from "@/components";
import SimpleWizard from "./wizard/Wizard.vue";

export default {
  data() {
    return {
      wizardModel: {}
    };
  },
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    FourthStep,
    SimpleWizard,
    WizardTab
  },
  data() {
    return {
      name: null,
      description: null,
      category: null,
      skills: [],
      location: null,
      deadline: null,
      budget: null,
      payment: null
    }
  },
  methods: {
    validateStep(ref) {
      return this.$refs[ref].validate();
    },
    onStepValidated(validated, model) {
      this.wizardModel = { ...this.wizardModel, ...model };
    },
    addName: function(name) {
      this.name = name;
    },
    addDescription: function(description) {
      this.description = description;
    },
    addCategory: function(category) {
      this.category = category;
    },
    addSkills: function(skills) {
      this.skills = skills;
    },
    addLocation: function(location) {
      this.location = location;
    },
    addDeadline: function(deadline) {
      this.deadline = deadline;
    },
    addBudget: function(budget) {
      this.budget = budget;
    }
  },
  created() {
    let job = db.collection('micros').doc(this.$route.params.id);
    job.get().then(doc => {
      this.name = doc.data().name;
      this.description = doc.data().description;
      this.budget = doc.data().budget;

      let skills = db.collection('skills').doc(this.$route.params.id);
      skills.get().then(doc => {
        this.skills = doc.data().skills;
        this.category = doc.data().category;
      });
    });
  }
};
</script>
<style scoped>
@media only screen and (max-width: 768px) {
  .pc-view {
    display: none;
  }
  .md-layout-item.md-xsmall-size-80 {
    min-width: 100%;
    overflow-x: hidden;
  }
  .md-card-wizard .nav-pills > li i {
    font-size: 0px;
  }
}

@media only screen and (min-width: 768px) {
  .mobi-view {
    display: none;
  }
}
</style>
