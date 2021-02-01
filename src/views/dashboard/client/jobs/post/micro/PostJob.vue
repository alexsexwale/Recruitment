<template>
  <div class="md-layout" id="top">
    <div class="md-layout-item md-size-66 md-xsmall-size-80 mx-auto">
      <simple-wizard
        v-bind:name="name"
        v-bind:description="description"
        v-bind:jobType="jobType"
        v-bind:education="education"
        v-bind:experience="experience"
        v-bind:industryCategory="industryCategory"
        v-bind:jobCategory="jobCategory"
        v-bind:skills="skills"
        v-bind:location="location"
        v-bind:deadline="deadline"
        v-bind:daysOfTheWeek="daysOfTheWeek"
        v-bind:hours="hours"
        v-bind:startDate="startDate"
        v-bind:budget="budget"
        v-bind:benefit="benefit">
        <template slot="header">
          <h3 class="title">Post a Job</h3>
          <h5 class="category">
            This information you fill out will allow students to apply for the job
          </h5>
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
            @education="addEducation"
            @experience="addExperience"
            @jobType="addJobType"
            @industryCategory="addIndustryCategory"
            @jobCategory="addJobCategory"
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
            @deadline="addDeadline"
            @daysOfTheWeek="addDaysOfTheWeek"
            @hours="addHours"
            @startDate="addStartDate"
            v-bind:jobType="jobType">
          </second-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step3')">
          <template slot="label">
            <div class="pc-view">Payment</div>
            <div class="mobi-view"><i class="fas fa-wallet"></i></div>
          </template>
          <third-step ref="step3" 
            @on-validated="onStepValidated"
            @budget="addBudget"
            @benefit="addBenefit"
            v-bind:jobType="jobType">
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
            v-bind:jobType="jobType"
            v-bind:education="education"
            v-bind:experience="experience"
            v-bind:industryCategory="industryCategory"
            v-bind:jobCategory="jobCategory"
            v-bind:skills="skills"
            v-bind:location="location"
            v-bind:deadline="deadline"
            v-bind:daysOfTheWeek="daysOfTheWeek"
            v-bind:hours="hours"
            v-bind:startDate="startDate"
            v-bind:budget="budget"
            v-bind:benefit="benefit">
          </fourth-step>
        </wizard-tab>
      </simple-wizard>
    </div>
  </div>
</template>
<script>
import FirstStep from "./wizard/formSteps/FirstStep.vue";
import SecondStep from "./wizard/formSteps/SecondStep.vue";
import ThirdStep from "./wizard/formSteps/ThirdStep.vue";
import FourthStep from "./wizard/formSteps/FourthStep.vue";
import swal from "sweetalert2";
import { WizardTab } from "@/components";
import SimpleWizard from "./wizard/Wizard.vue";

export default {
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
      wizardModel: {},
      name: null,
      description: null,
      industryCategory: null,
      jobType: null,
      education: null,
      experience: null,
      jobCategory: null,
      skills: [],
      location: null,
      deadline: null,
      daysOfTheWeek: null,
      hours: null,
      startDate: null,
      budget: null,
      benefit: null
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
    addJobType: function(jobType) {
      this.jobType = jobType;
    },
    addEducation: function(education) {
      this.education = education;
    },
    addExperience: function(experience) {
      this.experience = experience;
    },
    addJobCategory: function(jobCategory) {
      this.jobCategory = jobCategory;
    },
    addIndustryCategory: function(industryCategory) {
      this.industryCategory = industryCategory;
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
    addDaysOfTheWeek: function(daysOfTheWeek) {
      this.daysOfTheWeek = daysOfTheWeek
    },
    addHours: function(hours) {
      this.hours = hours;
    },
    addStartDate: function(startDate) {
      this.startDate = startDate;
    },
    addBudget: function(budget) {
      this.budget = budget;
    },
    addBenefit: function(benefit) {
      this.benefit = benefit;
    }
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