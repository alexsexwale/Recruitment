<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-66 md-xsmall-size-80 mx-auto">
      <simple-wizard
        v-bind:dob="dob"
        v-bind:gender="gender"
        v-bind:race="race"
        v-bind:bio="bio"
        v-bind:institution="institution"
        v-bind:campus="campus"
        v-bind:studentNo="studentNo"
        v-bind:faculty="faculty"
        v-bind:degree="degree"
        v-bind:major="major"
        v-bind:year="year"
        v-bind:graduateStatus="graduateStatus"
        v-bind:accountName="accountName"
        v-bind:accountNumber="accountNumber"
        v-bind:accountType="accountType"
        v-bind:bankName="bankName"
        v-bind:branchCode="branchCode"
        v-bind:email="email"
        @emailVerified="addEmailVerified"
        @feedback="addFeedback">
        <template slot="header">
          <h3 v-if="emailVerified" class="title" style="color:#000">Build your profile</h3>
          <h5 v-if="emailVerified" class="category">
            This information will let us know more about you.
          </h5>
          <div v-else>
            <p slot="inputs" style="color:red;">Check your inbox to verify that <b>{{email}}</b> is your email address</p>
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
            @dob="addDob"
            @gender="addGender"
            @race="addRace"
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
      auth: null,
      user: null,
      feedback: null,
      dob: null,
      gender: null,
      race: null,
      bio: null,
      institution: null,
      campus: null,
      studentNo: null,
      faculty: null,
      degree: null,
      major: null,
      year: null,
      graduateStatus: null,
      accountName: null,
      accountNumber: null,
      accountType: null,
      bankName: null,
      branchCode: null,
      email: null,
      emailVerified: null,
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
    refresh() {
      if(!this.emailVerified) {
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
      }
    },
    addDob: function(dob) {
      this.dob = dob;
      this.refresh();
    },
    addGender: function(gender) {
      this.gender = gender;
      this.refresh();
    },
    addRace: function(race) {
      this.race = race;
      this.refresh();
    },
    addBio: function(bio) {
      this.bio = bio;
      this.refresh();
    },
    addInstitution: function(institution) {
      this.institution = institution;
      this.refresh();
    },
    addCampus: function(campus) {
      this.campus = campus;
      this.refresh();
    },
    addStudentNo: function(studentNo) {
      this.studentNo = studentNo;
      this.refresh();
    },
    addFaculty: function(faculty) {
      this.faculty = faculty;
      this.refresh();
    },
    addDegree: function(degree) {
      this.degree = degree;
      this.refresh();
    },
    addMajor: function(major) {
      this.major = major;
      this.refresh();
    },
    addYear: function(year) {
      this.year = year;
      this.refresh();
    },
    addGraduateStatus: function(graduateStatus) {
      this.graduateStatus = graduateStatus;
      this.refresh();
    },
    addAccountName: function(accountName) {
      this.accountName = accountName;
      this.refresh();
    },
    addAccountNumber: function(accountNumber) {
      this.accountNumber = accountNumber;
      this.refresh();
    },
    addAccountType: function(accountType) {
      this.accountType = accountType;
      this.refresh();
    },
    addBankName: function(bankName) {
      this.bankName = bankName;
      this.refresh();
    },
    addBranchCode: function(branchCode) {
      this.branchCode = branchCode;
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
</style>
