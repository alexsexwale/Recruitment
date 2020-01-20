<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-66 md-xsmall-size-80 mx-auto">
      <simple-wizard
        v-bind:firstName="firstName" 
        v-bind:lastName="lastName"
        v-bind:companyName="companyName"
        v-bind:companyWebsite="companyWebsite"
        v-bind:phoneNumber="phoneNumber"
        v-bind:vat="vat"
        v-bind:companySize="companySize"
        v-bind:industry="industry"
        v-bind:addressLine1="addressLine1"
        v-bind:addressLine2="addressLine2"
        v-bind:city="city"
        v-bind:province="province"
        v-bind:postalCode="postalCode"
        @emailVerified="addEmailVerified"
        @feedback="addFeedback">
        <template slot="header">
          <h3 class="title">Build your profile</h3>
          <h5 v-if="emailVerified" class="category">This information will let us know more about you.</h5>
          <div v-else>
            <p slot="inputs" style="color:red;">Check your inbox to verify that <b>{{email}}</b> is your email address</p>
            <md-button @click="verification" class="btn-next md-success">
              Resend verification
            </md-button>
            <br/><br/>
          </div>
        </template>

        <wizard-tab :before-change="() => validateStep('step1')">
          <template slot="label">About</template>
          <first-step ref="step1" 
            @on-validated="onStepValidated"
            @firstName="addFirstName"
            @lastName="addLastName"
            @companyName="addCompanyName"
            @companyWebsite="addCompanyWebsite"
            @phoneNumber="addPhoneNumber"
            @vat="addVat"
            @companySize="addCompanySize"
            @industry="addIndustry">
          </first-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step2')">
          <template slot="label">Location</template>
          <second-step ref="step2" 
            @on-validated="onStepValidated"
            @addressLine1="addAddressLineOne"
            @addressLine2="addAddressLineTwo"
            @city="addCity"
            @province="addProvince"
            @postalCode="addPostalCode">
          </second-step>
        </wizard-tab>
      </simple-wizard>
    </div>
    <!-- Modal: Error handling -->
    <modal v-if="modal" @close="modalHide">
      <template slot="header">
        <h4 class="modal-title black">Oops!</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">{{feedback}}</p>
      </template>

      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-success" @click="modalHide">Got it</md-button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import swal from "sweetalert2";
import { WizardTab, Modal } from "@/components";
import SimpleWizard from "./wizard/Wizard.vue";
import FirstStep from "./wizard/formSteps/FirstStep.vue";
import SecondStep from "./wizard/formSteps/SecondStep.vue";
import firebase from 'firebase';
import db from '@/firebase/init';

export default {
  data() {
    return {
      wizardModel: {},
      auth: null,
      user: null,
      feedback: null,
      firstName: null,
      lastName: null,
      companyName: null,
      companyWebsite: null,
      phoneNumber: null,
      vat: null,
      companySize: null,
      industry: null,
      addressLine1: null,
      addressLine2: null,
      city: null,
      province: null,
      postalCode: null,
      email: null,
      emailVerified: null,
      modal: false
    };
  },
  components: {
    FirstStep,
    SecondStep,
    SimpleWizard,
    WizardTab,
    Modal
  },
  methods: {
    modalHide() {
      this.modal = false;
    },
    validateStep(ref) {
      return this.$refs[ref].validate();
    },
    onStepValidated(validated, model) {
      this.wizardModel = { ...this.wizardModel, ...model };
    },
    verification() {
      this.user.sendEmailVerification().then(() => {
        this.modal = true;
        this.feedback = "Email Sent. Check your inbox and verify!";
      }).catch(err => {
        // An error happened.
        this.modal = true;
        this.feedback = err.message;
      });
    },
    addFirstName: function(firstName) {
      this.firstName = firstName;
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addLastName: function(lastName) {
      this.lastName = lastName;
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addCompanyName: function(companyName) {
      this.companyName = companyName;
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addCompanyWebsite: function(companyWebsite) {
      this.companyWebsite = companyWebsite;
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addPhoneNumber: function(phoneNumber) {
      this.phoneNumber = phoneNumber;
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addVat: function(vat) {
      this.vat = vat;
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addCompanySize: function(companySize) {
      this.companySize = companySize;
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addIndustry: function(industry) {
      this.industry = industry;
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addAddressLineOne: function(addressLine1) {
      this.addressLine1 = addressLine1;
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addAddressLineTwo: function(addressLine2) {
      this.addressLine2 = addressLine2;
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addCity: function(city) {
      this.city = city;
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addProvince: function(province) {
      this.province = province;
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addPostalCode: function(postalCode) {
      this.postalCode = postalCode;
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addFeedback: function(feedback) {
      this.modal = true;
      this.feedback = feedback;
    },
    addEmailVerified: function(emailVerified) {
      this.emailVerified = emailVerified;
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    }
  },
  created() {
    this.auth = firebase.auth();
    this.user = this.auth.currentUser;
    this.emailVerified = this.user.emailVerified;
    let ref = db.collection('users');
    ref.where('userId', '==', this.user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.email = doc.data().email;
      })
    })
  }
};
</script>
