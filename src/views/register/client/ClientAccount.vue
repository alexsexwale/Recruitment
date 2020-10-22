<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-66 md-xsmall-size-80 mx-auto">
      <simple-wizard
        v-bind:file="file"
        v-bind:firstName="firstName" 
        v-bind:lastName="lastName"
        v-bind:companyName="companyName"
        v-bind:companyWebsite="companyWebsite"
        v-bind:vat="vat"
        v-bind:companySize="companySize"
        v-bind:industry="industry"
        v-bind:aboutMe="aboutMe"
        v-bind:addressLine1="addressLine1"
        v-bind:city="city"
        v-bind:province="province"
        v-bind:postalCode="postalCode"
        v-bind:email="email"
        @emailVerified="addEmailVerified"
        @feedback="addFeedback">
        <template slot="header">
          <h3 v-if="emailVerified" class="title" style="color:#000">Build your profile</h3>
          <h5 v-if="emailVerified" class="category">This information will let us know more about you.</h5>
          <div v-else>
            <p slot="inputs" style="color:red;">Please check your inbox to verify that <b>{{email}}</b> is the email address that you are currently using</p>
            <md-button @click="verification" class="btn-next md-success">
              Resend verification
            </md-button>
            <br/><br/>
          </div>
        </template>

        <wizard-tab :before-change="() => validateStep('step1')">
          <template slot="label">
            <div class="pc-view">About</div>
            <div class="mobi-view"><i class="fas fa-user"></i></div>
          </template>
          <first-step ref="step1" 
            @on-validated="onStepValidated"
            @file="addFile"
            @firstName="addFirstName"
            @lastName="addLastName"
            @companyName="addCompanyName"
            @companyWebsite="addCompanyWebsite"
            @vat="addVat"
            @companySize="addCompanySize"
            @industry="addIndustry"
            @aboutMe="addAboutMe">
          </first-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step2')">
          <template slot="label">
            <div class="pc-view">Location</div>
            <div class="mobi-view"><i class="fas fa-location-arrow"></i></div>
          </template>
          <second-step ref="step2" 
            @on-validated="onStepValidated"
            @addressLine1="addAddressLineOne"
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
import firebase from 'firebase/app';
import db from '@/firebase/init';

export default {
  data() {
    return {
      wizardModel: {},
      auth: null,
      user: null,
      feedback: null,
      file: null,
      firstName: null,
      lastName: null,
      companyName: null,
      companyWebsite: null,
      vat: null,
      companySize: null,
      industry: null,
      aboutMe: null,
      addressLine1: null,
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
        this.feedback = "Email Sent. Check your inbox and verify your email!";
      }).catch(err => {
        this.modal = true;
        this.feedback = err.message;
      });
    },
    addFile: function(file) {
      this.file = file;
      this.refresh();
    },
    refresh() {
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addFirstName: function(firstName) {
      this.firstName = firstName;
      this.refresh();
    },
    addLastName: function(lastName) {
      this.lastName = lastName;
      this.refresh();
    },
    addCompanyName: function(companyName) {
      this.companyName = companyName;
      this.refresh();
    },
    addCompanyWebsite: function(companyWebsite) {
      this.companyWebsite = companyWebsite;
      this.refresh();
    },
    addVat: function(vat) {
      this.vat = vat;
      this.refresh();
    },
    addCompanySize: function(companySize) {
      this.companySize = companySize;
      this.refresh();
    },
    addIndustry: function(industry) {
      this.industry = industry;
      this.refresh();
    },
    addAboutMe: function(aboutMe) {
      this.aboutMe = aboutMe;
      this.refresh();
    },
    addAddressLineOne: function(addressLine1) {
      this.addressLine1 = addressLine1;
      this.refresh();
    },
    addCity: function(city) {
      this.city = city;
      this.refresh();
    },
    addProvince: function(province) {
      this.province = province;
      this.refresh();
    },
    addPostalCode: function(postalCode) {
      this.postalCode = postalCode;
      this.refresh();
    },
    addFeedback: function(feedback) {
      this.modal = true;
      this.feedback = feedback;
    },
    addEmailVerified: function(emailVerified) {
      this.emailVerified = emailVerified;
      this.refresh();
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
.md-layout-item.md-size-66 {
    min-width: 100%;
}
</style>