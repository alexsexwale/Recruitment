<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-66 md-xsmall-size-80 mx-auto">
      <simple-wizard
        v-bind:name="name"
        v-bind:description="description"
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
            Description
          </template>
          <first-step ref="step1" 
            @on-validated="onStepValidated"
            @name="addName"
            @description="addDescription"
            @skills="addSkills">
          </first-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step2')">
          <template slot="label">
            Location
          </template>
          <second-step ref="step2"
            @on-validated="onStepValidated"
            @location="addLocation"
            @deadline="addDeadline">
          </second-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step3')">
          <template slot="label">
            Payments
          </template>
          <third-step ref="step3" 
            @on-validated="onStepValidated"
            @budget="addBudget"
            @payment="addPayment">
          </third-step>
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
    SimpleWizard,
    WizardTab
  },
  data() {
    return {
      name: null,
      description: null,
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
    },
    addPayment: function(postPayment) {
      this.postPayment = postPayment;
    }
  },
  created() {
    let job = db.collection('jobs').where('jobId', '==', this.$route.params.id);
    job.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.name = doc.data().name;
      })
    })
  }
};
</script>
