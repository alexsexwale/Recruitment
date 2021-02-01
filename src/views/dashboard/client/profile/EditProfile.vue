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
        v-bind:aboutMe="aboutMe"
        v-bind:addressLine1="addressLine1"
        v-bind:addressLine2="addressLine2"
        v-bind:city="city"
        v-bind:province="province"
        v-bind:postalCode="postalCode"
        @feedback="addFeedback">
        <template slot="header">
          <md-button class="btn-next md-success" @click="back">Go Back</md-button>
          <p></p>
          <h3 class="title">Edit Your profile</h3>
          <h5 class="category">This information will let us know more about you.</h5>
        </template>

        <wizard-tab>
          <template slot="label">
            <div class="pc-view">About</div> 
            <div class="mobi-view"><i class="fas fa-user"></i></div>
          </template>
          <first-step ref="step1" 
            @firstName="addFirstName"
            @lastName="addLastName"
            @companyName="addCompanyName"
            @companyWebsite="addCompanyWebsite"
            @phoneNumber="addPhoneNumber"
            @vat="addVat"
            @companySize="addCompanySize"
            @industry="addIndustry"
            @aboutMe="addAboutMe">
          </first-step>
        </wizard-tab>

        <wizard-tab>
          <template slot="label">
            <div class="pc-view">Location</div>
            <div class="mobi-view"><i class="fas fa-location-arrow"></i></div>
          </template>
          <second-step ref="step2" 
            @addressLine1="addAddressLine1"
            @addressLine2="addAddressLine2"
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
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export default {
  data() {
    return {
      wizardModel: {},
      feedback: null,
      firstName: null,
      lastName: null,
      companyName: null,
      companyWebsite: null,
      phoneNumber: null,
      vat: null,
      companySize: null,
      industry: null,
      aboutMe: null,
      addressLine1: null,
      addressLine2: null,
      city: null,
      province: null,
      postalCode: null,
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
    back() {
      this.$router.go(-1);
    },
    modalHide() {
      this.modal = false;
    },
    addFirstName: function(firstName) {
      this.firstName = firstName;
    },
    addLastName: function(lastName) {
      this.lastName = lastName;
    },
    addCompanyName: function(companyName) {
      this.companyName = companyName;
    },
    addCompanyWebsite: function(companyWebsite) {
      this.companyWebsite = companyWebsite;
    },
    addPhoneNumber: function(phoneNumber) {
      this.phoneNumber = phoneNumber;
    },
    addVat: function(vat) {
      this.vat = vat;
    },
    addCompanySize: function(companySize) {
      this.companySize = companySize;
    },
    addIndustry: function(industry) {
      this.industry = industry;
    },
    addAboutMe: function(aboutMe) {
      this.aboutMe = aboutMe;
    },
    addAddressLine1: function(addressLine1) {
      this.addressLine1 = addressLine1;
    },
    addAddressLine2: function(addressLine2) {
      this.addressLine2 = addressLine2;
    },
    addCity: function(city) {
      this.city = city;
    },
    addProvince: function(province) {
      this.province = province;
    },
    addPostalCode: function(postalCode) {
      this.postalCode = postalCode;
    },
    addFeedback: function(feedback) {
      this.modal = true;
      this.feedback = feedback;
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
.md-layout-item.md-size-66 {
    min-width: 100%;
}
</style>
