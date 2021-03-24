<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-66 md-xsmall-size-80 mx-auto">
      <simple-wizard
        v-bind:dob="dob"
        v-bind:gender="gender"
        v-bind:race="race"
        v-bind:citizenship="citizenship"
        v-bind:identification="identification"
        v-bind:passport="passport"
        v-bind:bio="bio"
        v-bind:studying="studying"
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
        v-bind:linkedIn="linkedIn"
        v-bind:facebook="facebook"
        v-bind:twitter="twitter"
        v-bind:instagram="instagram"
        v-bind:github="github"
        v-bind:portfolio="portfolio"
        v-bind:personalWebsite="personalWebsite"
        v-bind:industryCategory="industryCategory"
        @emailVerified="addEmailVerified"
        @feedback="addFeedback">
        <template slot="header">
          <h3 v-if="emailVerified" class="title" style="color:#000">Build your profile</h3>
          <h5 v-if="emailVerified" class="category">
            This information will let us know more about you
          </h5>
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
            @dob="addDob"
            @gender="addGender"
            @race="addRace"
            @citizenship="addCitizenship"
            @passport="addPassport"
            @identification="addIdentification"
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
            @institution="addInstitution"
            @studying="addStudying">
          </second-step>
          <!-- University of Pretoria -->
          <tuks ref="step2" v-if="institution === 'University of Pretoria'" @on-validated="onStepValidated"  @faculty="addFaculty" @degree="addDegree" 
            @year="addYear" @graduateStatus="addGraduateStatus" @campus="addCampus" @studentNo="addStudentNo">
          </tuks>
          <!-- University of the Witwatersrand -->
          <wits ref="step2" v-if="institution === 'University of the Witwatersrand'" @on-validated="onStepValidated"  @faculty="addFaculty" @degree="addDegree" 
            @year="addYear" @graduateStatus="addGraduateStatus" @campus="addCampus" @studentNo="addStudentNo">
          </wits>
          <!-- CodeSpace -->
          <code-space ref="step2" v-if="institution === 'CodeSpace'" @on-validated="onStepValidated" @course="addCourse"  >

          </code-space>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step3')">
          <template slot="label">
            <div class="pc-view">Experience</div>
            <div class="mobi-view"><i class="fas fa-briefcase"></i></div>
          </template>
          <third-step ref="step3" 
            @on-validated="onStepValidated">
          </third-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step4')">
          <template slot="label">
            <div class="pc-view">Portfolio</div>
            <div class="mobi-view"><i class="fas fa-globe-africa"></i></div>
          </template>
          <fourth-step ref="step4" 
            @on-validated="onStepValidated"
            @linkedIn="addLinkedIn"
            @facebook="addFacebook"
            @twitter="addTwitter"
            @instagram="addInstagram"
            @github="addGithub"
            @portfolio="addPortfolio"
            @personalWebsite="addPersonalWebsite"
            @industryCategory="addIndustryCategory">
          </fourth-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step5')">
          <template slot="label">
            <div class="pc-view">Banking</div>
            <div class="mobi-view"><i class="fas fa-piggy-bank"></i></div>
          </template>
          <fifth-step ref="step5" 
            @on-validated="onStepValidated"
            @accountName="addAccountName"
            @accountNumber="addAccountNumber"
            @accountType="addAccountType"
            @bankName="addBankName"
            @branchCode="addBranchCode">
          </fifth-step>
        </wizard-tab>
      </simple-wizard>
    </div>
    <!-- Modal: Error handling -->
    <modal v-if="modal" @close="modalHide">
      <template slot="header">
        <h4 class="modal-title black">Check your inbox!</h4>
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
import FourthStep from "./wizard/formSteps/FourthStep.vue";
import FifthStep from "./wizard/formSteps/FifthStep";
import firebase from 'firebase/app';
import db from '@/firebase/init';
import Tuks from './wizard/Institutions/University of Pretoria/Tuks';
import Wits from './wizard/Institutions/University of the Witwatersrand/Wits';
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
      citizenship: null,
      identification: null,
      passport: null,
      bio: null,
      institution: null,
      studying: null,
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
      linkedIn: null,
      facebook: null,
      twitter: null,
      instagram: null,
      github: null,
      portfolio: null,
      personalWebsite: null,
      industryCategory: null,
      email: null,
      emailVerified: null,
      modal: false
    };
  },
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    FourthStep,
    FifthStep,
    SimpleWizard,
    WizardTab,
    Modal,
    Tuks,
    Wits
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
    addCitizenship: function(citizenship) {
      this.citizenship = citizenship;
      this.refresh();
    },
    addIdentification: function(identification) {
      this.identification = identification;
      this.refresh();
    },
    addPassport: function(passport) {
      this.passport = passport;
      this.refresh();
    },
    addBio: function(bio) {
      this.bio = bio;
      this.refresh();
    },
    addStudying: function(studying) {
      this.studying = studying;
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
    addLinkedIn: function(linkedIn) {
      this.linkedIn = linkedIn;
      this.refresh();
    },
    addFacebook: function(facebook) {
      this.facebook = facebook;
      this.refresh();
    },
    addTwitter: function(twitter) {
      this.twitter = twitter;
      this.refresh();
    },
    addInstagram: function(instagram) {
      this.instagram = instagram;
      this.refresh();
    },
    addGithub: function(github) {
      this.github = github;
      this.refresh();
    },
    addPortfolio: function(portfolio) {
      this.portfolio = portfolio;
      this.refresh();
    },
    addPersonalWebsite: function(personalWebsite) {
      this.personalWebsite = personalWebsite;
      this.refresh();
    },
    addFeedback: function(feedback) {
      this.modal = true;
      this.feedback = feedback;
    },
    addEmailVerified: function(emailVerified) {
      this.emailVerified = emailVerified;
      this.refresh();
    },
    addIndustryCategory: function(industryCategory) {
      this.industryCategory = industryCategory;
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
