<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-66 md-xsmall-size-80 mx-auto">
      <simple-wizard>
        <template slot="header">
          <h3 class="title">Status</h3>
          <md-button v-if="!paid" class="btn-next md-success" @click="makePayment">
            Make Payment
          </md-button>
        </template>

        <wizard-tab :before-change="() => validateStep('step1')">
          <template slot="label">
            Select Student
          </template>
          <first-step ref="step1" @on-validated="onStepValidated"></first-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step2')">
          <template slot="label">
            Confirm job
          </template>
          <second-step ref="step2" @on-validated="onStepValidated"></second-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step3')">
          <template slot="label">
            Job Active
          </template>
          <third-step ref="step3" @on-validated="onStepValidated"></third-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step4')">
          <template slot="label">
            Confirm Completion
          </template>
          <fourth-step ref="step4" @on-validated="wizardComplete"></fourth-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step5')">
          <template slot="label">
            Rate and Review
          </template>
          <fifth-step ref="step5" @on-validated="wizardComplete"></fifth-step>
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
import FifthStep from "./wizard/formSteps/FifthStep.vue";
import swal from "sweetalert2";
import { WizardTab } from "@/components";
import SimpleWizard from "./wizard/Wizard.vue";

export default {
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    FourthStep,
    FifthStep,
    SimpleWizard,
    WizardTab
  },
  data() {
    return {
      paid: false
    }
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
    },
    makePayment() {
      // let payment = this.$router.resolve({name: 'terms-and-conditions'});
      // window.open(terms.href, '_blank');
    }
  }
};
</script>
