<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-66 md-xsmall-size-80 mx-auto">
      <simple-wizard>
        <template slot="header">
          <h3 class="title">Post a Microjob</h3>
          <h5 class="category">
            This information you fill out will allow students to apply for the microjob
          </h5>
        </template>

        <wizard-tab :before-change="() => validateStep('step1')">
          <template slot="label">
            Description
          </template>
          <first-step ref="step1" @on-validated="onStepValidated"></first-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step2')">
          <template slot="label">
            Details
          </template>
          <second-step
            ref="step2"
            @on-validated="onStepValidated"
          ></second-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step3')">
          <template slot="label">
            Payments
          </template>
          <third-step ref="step3" @on-validated="wizardComplete"></third-step>
        </wizard-tab>
      </simple-wizard>
    </div>
  </div>
</template>
<script>
import FirstStep from "./formSteps/FirstStep.vue";
import SecondStep from "./formSteps/SecondStep.vue";
import ThirdStep from "./formSteps/ThirdStep.vue";
import swal from "sweetalert2";
import { SimpleWizard, WizardTab } from "@/components";

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
  methods: {
    validateStep(ref) {
      return this.$refs[ref].validate();
    },
    onStepValidated(validated, model) {
      this.wizardModel = { ...this.wizardModel, ...model };
    },
    wizardComplete() {
      swal({
        title: "Good job!",
        text: "You clicked the finish button!",
        type: "success",
        confirmButtonClass: "md-button md-success",
        buttonsStyling: false
      });
    }
  }
};
</script>
