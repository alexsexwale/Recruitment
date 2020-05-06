<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-66 md-xsmall-size-80 mx-auto">
      <simple-wizard 
        v-bind:firstName="firstName" 
        v-bind:lastName="lastName"
        v-bind:dob="dob"
        v-bind:gender="gender"
        v-bind:race="race"
        v-bind:phone="phone"
        v-bind:bio="bio"
        v-bind:institution="institution"
        v-bind:campus="campus"
        v-bind:studentNo="studentNo"
        v-bind:faculty="faculty"
        v-bind:degree="degree"
        v-bind:year="year"
        v-bind:graduateStatus="graduateStatus"
        v-bind:accountName="accountName"
        v-bind:accountNumber="accountNumber"
        v-bind:accountType="accountType"
        v-bind:bankName="bankName"
        v-bind:branchCode="branchCode"
        @feedback="addFeedback">
        <template slot="header">
          <h3 class="title">Build your profile</h3>
          <h5 class="category">
            This information will let us know more about you.
          </h5>
        </template>

        <wizard-tab :before-change="() => validateStep('step1')">
          <template slot="label">
            <div class="pc-view">About</div>
            <div class="mobi-view"><i class="fas fa-user"></i></div>
          </template>
          <first-step ref="step1" 
            @on-validated="onStepValidated" 
            @firstName="addFirstName"
            @lastName="addLastName"
            @dob="addDob"
            @gender="addGender"
            @race="addRace"
            @phone="addPhone"
            @bio="addBio">
          </first-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step2')">
          <template slot="label">
            <div class="pc-view">Studies</div>
            <div class="mobi-view"><i class="fas fa-university"></i></div>
          </template>
          <second-step ref="step2" 
            @on-validated="onStepValidated"
            @institution="addInstitution">
          </second-step>
          <!-- University of Pretoria -->
          <tuks ref="step2" v-if="institution === 'University of Pretoria'" @on-validated="onStepValidated"  @faculty="addFaculty" @degree="addDegree" 
            @year="addYear" @graduateStatus="addGraduateStatus" @campus="addCampus" @studentNo="addStudentNo">
          </tuks>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step3')">
          <template slot="label">
            <div class="pc-view">Banking</div>
            <div class="mobi-view"><i class="fas fa-piggy-bank"></i></div>
          </template>
          <third-step ref="step3" 
            @on-validated="onStepValidated"
            @accountName="addAccountName"
            @accountNumber="addAccountNumber"
            @accountType="addAccountType"
            @bankName="addBankName"
            @branchCode="addBranchCode">
          </third-step>
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
import ThirdStep from "./wizard/formSteps/ThirdStep.vue";
import firebase from 'firebase/app';
import db from '@/firebase/init';
import Tuks from './wizard/Institutions/University of Pretoria/Tuks';
export default {
  data() {
    return {
      wizardModel: {},
      user: null,
      feedback: null,
      firstName: null,
      lastName: null,
      dob: null,
      gender: null,
      race: null,
      phone: null,
      bio: null,
      institution: null,
      campus: null,
      studentNo: null,
      faculty: null,
      degree: null,
      year: null,
      graduateStatus: null,
      accountName: null,
      accountNumber: null,
      accountType: null,
      bankName: null,
      branchCode: null,
      modal: false
    };
  },
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    SimpleWizard,
    WizardTab,
    Modal,
    Tuks
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
    addFirstName: function(firstName) {
      this.firstName = firstName;
    },
    addLastName: function(lastName) {
      this.lastName = lastName;
    },
    addDob: function(dob) {
      this.dob = dob;
    },
    addGender: function(gender) {
      this.gender = gender;
    },
    addRace: function(race) {
      this.race = race;
    },
    addPhone: function(phone) {
      this.phone = phone;
    },
    addBio: function(bio) {
      this.bio = bio;
    },
    addInstitution: function(institution) {
      this.institution = institution;
    },
    addCampus: function(campus) {
      this.campus = campus;
    },
    addStudentNo: function(studentNo) {
      this.studentNo = studentNo;
    },
    addFaculty: function(faculty) {
      this.faculty = faculty;
    },
    addDegree: function(degree) {
      this.degree = degree;
    },
    addYear: function(year) {
      this.year = year;
    },
    addGraduateStatus: function(graduateStatus) {
      this.graduateStatus = graduateStatus;
    },
    addAccountName: function(accountName) {
      this.accountName = accountName;
    },
    addAccountNumber: function(accountNumber) {
      this.accountNumber = accountNumber;
    },
    addAccountType: function(accountType) {
      this.accountType = accountType;
    },
    addBankName: function(bankName) {
      this.bankName = bankName;
    },
    addBranchCode: function(branchCode) {
      this.branchCode = branchCode;
    },
    addFeedback: function(feedback) {
      this.modal = true;
      this.feedback = feedback;
    }
  },
  created() {
    this.user = firebase.auth().currentUser;
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