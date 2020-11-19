<template>
    <div class="md-layout">
      <notifications></notifications>
      <!-- Faculties -->
      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('faculty') && touched.faculty },
            { 'md-form-group': true },
            { 'md-error': errors.has('faculty') }
          ]">
          <md-icon>school</md-icon>
          <label>Faculty</label>
          <md-select class="pad" @input="addFaculty" v-model="faculty" data-vv-name="faculty" type="text" name="faculty" required v-validate="modelValidations.faculty">
            <md-option v-for="(faculty, index) in faculties" :key="index" :value="faculty">{{ faculty }}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('faculty')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('faculty') && touched.faculty">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <!-- Undergraduate or Postgraduate -->
      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
          { 'md-valid': !errors.has('graduateStatus') && touched.graduateStatus },
          { 'md-form-group': true },
          { 'md-error': errors.has('graduateStatus') }
          ]">
          <md-icon>school</md-icon>
          <label>Undergraduate/Postgraduate</label>
          <md-select class="pad" @input="addGraduateStatus" v-model="graduateStatus" data-vv-name="graduateStatus" type="text" name="graduateStatus" required v-validate="modelValidations.graduateStatus">
            <md-option v-for="(graduate, index) in graduates" :key="index" :value="graduate">{{graduate}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('graduateStatus')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('graduateStatus') && touched.graduateStatus">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <!-- University of the Witwatersrand - Undergraduate Year of Study -->
      <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="graduateStatus==='Undergraduate'">
        <md-field :class="[
          { 'md-valid': !errors.has('year') && touched.year },
          { 'md-form-group': true },
          { 'md-error': errors.has('year') }
          ]">
          <md-icon>school</md-icon>
          <label>Year of Study?</label>
          <md-select class="pad" @input="addYear" v-model="year" data-vv-name="year" type="text" name="year" required v-validate="modelValidations.year">
            <md-option v-for="(year, index) in undergraduateYears" :key="index" :value="year">{{year}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('year')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('year') && touched.year">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <!-- Postgraduate Year of Study -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="graduateStatus === 'Postgraduate'">
      <md-field :class="[
          { 'md-valid': !errors.has('year') && touched.year },
          { 'md-form-group': true },
          { 'md-error': errors.has('year') }
          ]">
          <md-icon>school</md-icon>
          <label>Year of Study?</label>
          <md-select class="pad" @input="addYear" v-model="year" data-vv-name="year" type="text" name="year" required v-validate="modelValidations.year">
            <md-option v-for="(year, index) in postgraduateYears" :key="index" :value="year">{{year}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('year')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('year') && touched.year">done</md-icon>
          </slide-y-down-transition>
      </md-field>
    </div>


    </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import db from '@/firebase/init';
import firebase from 'firebase/app';
import debounce from "debounce";
import moment from "moment";
export default {
    name: 'wits',
    components: {
      SlideYDownTransition
    },
    data() {
      return {
        user: null,
        student: null,
        graduates: null,
        faculty: null,
        degree: null,
        year: null,
        graduateStatus: null,
        studentNo: null,
        undergraduateYears: [],
        postgraduateYears: [],
        faculties: [],

        // Diplomas
        healthSciencesDiplomas: [],

        // Higher Diplomas
        commerceLawAndManagementHigherDiplomas: [],
        humaitiesHigherDiplomas: [],
        scienceHigherDiplomas: [],

        // Advance Diplomas
        healthSciencesAdvanceDiplomas: [],
        humanitiesAdvanceDiplomas: [],
        scienceAdvanceDiplomas: [],

        // Advance Certificates
        humanitiesAdvancedCertificates: [],

        // Postgraduate Occasional Studies 
        engineeringAndBuiltEnvironmentPostgraduateOccassionalStudies: [],
        healthSciencesPostgraduateOccasionalStudies: [],
        sciencePostgraduateOccasionalStudies: [],

        // Undergraduate Occasional Studies 
        engineeringAndBuiltEnvironmentUndergraduateOccassionalStudies: [],
        healthSciencesUndergraduateOccassionalStudies: [],
        scienceUndergraduateOccasionalStudies: [],

        // Undergraduate Degrees
        commerceLawAndManagementUndergraduateDegrees: [],
        engineeringAndBuiltEnvironmentUndergradateDegrees: [],
        healthSciencesUndergradateDegrees: [],
        humanitiesUndergraduateDegrees: [],
        scienceUndergraduateDegrees: [],

        // Postgraduate Diploma/Certificates
        commerceLawAndManagementPostgraduateDiplomas: [],
        engineeringAndBuiltEnvironmentPostgraduateDiplomas: [],
        healthSciencesPostgraduateDiplomas: [],
        humanitiesPostgraduateCertificates: [],
        humanitiesPostgraduateDiplomas: [],

        // Honours Degrees
        commerceLawAndManagementHonoursDegrees: [],
        engineeringAndBuiltEnvironmentHonoursDegrees: [],
        healthSciencesHonoursDegrees: [],
        humanitiesHonoursDegrees: [],

        // Masters Degrees
        commerceLawAndManagementMastersDegrees: [],
        engineeringAndBuiltEnvironmentMastersDegrees: [],
        healthSciencesMastersDegrees: [],
        humanitiesMastersDegrees: [],
        scienceMastersDegrees: [],

        // Doctorates Degrees
        commerceLawAndManagementDoctorateDegrees: [],
        engineeringAndBuiltEnvironmentDoctoratesDegrees: [],
        healthSciencesDoctoratesDegrees: [],
        humanitiesDoctorateDegrees: [],
        scienceDoctorateDegrees: [],
        touched: {
          faculty: {
            required: true
          },
          degree: {
            required: true
          },
          year: {
            required: true
          },
          graduateStatus: {
            required: true
          },
          studentNo: {
            required: true
          }
        }
      }
    },
    methods: {
      debouncedUpdate: debounce(function() {
        this.updateAccount();
      }, 1500),
      updateAccount() {

      },
      validate() {
        return this.$validator.validateAll().then(res => {
          this.$emit("on-validated", res);
          return res;
        });
      }
    },
    watch: {

    },
    created() {
      let settings = db.collection('Settings').doc('Drop-down Lists');
      settings.get().then(doc => {
        this.graduates = doc.data().Graduates;
      });

      let Dropdowns = db.collection('Settings').doc('University of the Witwatersrand Drop-down Lists');
      Dropdowns.get().then(doc => {
        // Faculties
        this.faculties = doc.data().Faculties;

        // Graduate Status
        this.undergraduateYears = doc.data().UndergraduateYears;
        this.postgraduateYears = doc.data().PostgraduateYears;

        // Advance Diplomas/Advance Certificates/Certificates/Higher Certificate/Postgraduate Diploma/Certificates
        this.healthSciencesDiplomas = doc.data().HealthSciencesDiplomas;
        this.commerceLawAndManagementHigherDiplomas = doc.data().CommerceLawAndManagementHigherDiplomas;
        this.humaitiesHigherDiplomas = doc.data().HumaitiesHigherDiplomas;
        this.scienceHigherDiplomas = doc.data().ScienceHigherDiplomas;
        this.healthSciencesAdvanceDiplomas = doc.data().HealthSciencesAdvanceDiplomas;
        this.humanitiesAdvanceDiplomas = doc.data().HumanitiesAdvanceDiplomas;
        this.scienceAdvanceDiplomas = doc.data().ScienceAdvanceDiplomas;
        this.humanitiesAdvancedCertificates = doc.data().HumanitiesAdvancedCertificates;

        // Postgraduate Occasional Studies 
        this.engineeringAndBuiltEnvironmentPostgraduateOccassionalStudies = doc.data().EngineeringAndBuiltEnvironmentPostgraduateOccassionalStudies;
        this.healthSciencesPostgraduateOccasionalStudies = doc.data().HealthSciencesPostgraduateOccasionalStudies()
        this.sciencePostgraduateOccasionalStudies = doc.data().SciencePostgraduateOccasionalStudies


        // Postgraduate Diploma/Certificates
        this.commerceLawAndManagementPostgraduateDiplomas = doc.data().CommerceLawAndManagementPostgraduateDiplomas;
        this.engineeringAndBuiltEnvironmentPostgraduateDiplomas = doc.data().EngineeringAndBuiltEnvironmentPostgraduateDiplomas;
        this.healthSciencesPostgraduateDiplomas = doc.data().HealthSciencesPostgraduateDiplomas;
        this.humanitiesPostgraduateCertificates = doc.data().HumanitiesPostgraduateCertificates;
        this.humanitiesPostgraduateDiplomas = doc.data().HumanitiesPostgraduateDiplomas;

        // Undergraduate Occasional Studies 
        this.engineeringAndBuiltEnvironmentUndergraduateOccassionalStudies = doc.data().EngineeringAndBuiltEnvironmentUndergraduateOccassionalStudies;
        this.healthSciencesUndergraduateOccassionalStudies = doc.data().HealthSciencesUndergraduateOccassionalStudies;
        this.scienceUndergraduateOccasionalStudies = doc.data().ScienceUndergraduateOccasionalStudies;

        // Undergraduate Degrees
        this.commerceLawAndManagementUndergraduateDegrees = doc.data().CommerceLawAndManagementUndergraduateDegrees;
        this.engineeringAndBuiltEnvironmentUndergradateDegrees = doc.data().EngineeringAndBuiltEnvironmentUndergradateDegrees;
        this.healthSciencesUndergradateDegrees = doc.data().HealthSciencesUndergradateDegrees;
        this.humanitiesUndergraduateDegrees = doc.data().HumanitiesUndergraduateDegrees;
        this.scienceUndergraduateDegrees = doc.data().ScienceUndergraduateDegrees;

        // Honours Degrees
        this.commerceLawAndManagementHonoursDegrees = doc.data().CommerceLawAndManagementHonoursDegrees;
        this.engineeringAndBuiltEnvironmentHonoursDegrees = doc.data().EngineeringAndBuiltEnvironmentHonoursDegrees;
        this.healthSciencesHonoursDegrees = doc.data().HealthSciencesHonoursDegrees;
        this.humanitiesHonoursDegrees = doc.data().HumanitiesHonoursDegrees;

        // Masters Degrees
        this.commerceLawAndManagementMastersDegrees = doc.data().CommerceLawAndManagementMastersDegrees;
        this.engineeringAndBuiltEnvironmentMastersDegrees = doc.data().EngineeringAndBuiltEnvironmentMastersDegrees;
        this.healthSciencesMastersDegrees = doc.data().HealthSciencesMastersDegrees;
        this.humanitiesMastersDegrees = doc.data().HumanitiesMastersDegrees;
        this.scienceMastersDegrees = doc.data().ScienceMastersDegrees;

        // Doctorates Degrees
        this.commerceLawAndManagementDoctorateDegrees = doc.data().CommerceLawAndManagementDoctorateDegrees;
        this.engineeringAndBuiltEnvironmentDoctoratesDegrees = doc.data().EngineeringAndBuiltEnvironmentDoctoratesDegrees;
        this.healthSciencesDoctoratesDegrees = doc.data().HealthSciencesDoctoratesDegrees;
        this.humanitiesDoctorateDegrees = doc.data().HumanitiesDoctorateDegrees;
        this.scienceDoctorateDegrees = doc.data().ScienceDoctorateDegrees;
      });

      this.user = firebase.auth().currentUser;
      let ref = db.collection('users');
      ref.where('userId', '==', this.user.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.student = db.collection('students').doc(doc.id);
          this.student.get().then(doc => {
            if(doc.exists) {
              this.faculty = doc.data().faculty;
              // this.graduateStatus = doc.data().graduateStatus;
              // this.degree = doc.data().degree;
              // this.year = doc.data().year;
              this.studentNo = doc.data().studentNo;
            }
          })
          .catch(err => {
            console.log(err.message);
          });
        });
      });
    }
}
</script>