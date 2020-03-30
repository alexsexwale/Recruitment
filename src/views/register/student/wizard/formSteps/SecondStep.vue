<template>
  <div>
    <h5 class="info-text">
      Tell us about your studies
    </h5>
    <div class="md-layout">

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('institution') && touched.institution },
            { 'md-form-group': true },
            { 'md-error': errors.has('institution') }
          ]">
          <md-icon>school</md-icon>
          <label>Institution</label>
          <md-select @input="addInstitution" v-model="institution" data-vv-name="institution" type="text" name="institution" required v-validate="modelValidations.institution">
            <md-option v-for="(institution, index) in institutions" :key="index" :value="institution">{{institution}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('institution')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('institution') && touched.institution">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('campus') && touched.campus },
            { 'md-form-group': true },
            { 'md-error': errors.has('campus') }
          ]">
          <md-icon>school</md-icon>
          <label>Campus</label>
          <md-input @change="addCampus" v-model="campus" data-vv-name="campus" type="text" name="campus" required v-validate="modelValidations.campus">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('campus')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('campus') && touched.campus">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('studentNo') && touched.studentNo },
            { 'md-form-group': true },
            { 'md-error': errors.has('studentNo') }
          ]">
          <md-icon>school</md-icon>
          <label>Student ID</label>
          <md-input @change="addStudentNo" v-model="studentNo" data-vv-name="studentNo" type="text" name="studentNo" required v-validate="modelValidations.studentNo">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('studentNo')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('studentNo') && touched.studentNo">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('faculty') && touched.faculty },
            { 'md-form-group': true },
            { 'md-error': errors.has('faculty') }
          ]">
          <md-icon>school</md-icon>
          <label>Faculty</label>
          <md-select @input="addFaculty" v-model="faculty" data-vv-name="faculty" type="text" name="faculty" required v-validate="modelValidations.faculty">
            <md-option v-for="(faculty, index) in faculties" :key="index" :value="faculty">{{faculty}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('faculty')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('faculty') && touched.faculty">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('degree') && touched.degree },
            { 'md-form-group': true },
            { 'md-error': errors.has('degree') }
          ]">
          <md-icon>school</md-icon>
          <label>Degree</label>
          <md-input @change="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('year') && touched.year },
            { 'md-form-group': true },
            { 'md-error': errors.has('year') }
          ]">
          <md-icon>school</md-icon>
          <label>Year of Study?</label>
          <md-select @input="addYear" v-model="year" data-vv-name="year" type="text" name="year" required v-validate="modelValidations.year">
            <md-option v-for="(year, index) in years" :key="index" :value="year">{{year}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('year')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('year') && touched.year">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('graduateStatus') && touched.graduateStatus },
            { 'md-form-group': true },
            { 'md-error': errors.has('graduateStatus') }
          ]">
          <md-icon>school</md-icon>
          <label>Undergraduate/Postgraduate</label>
          <md-select @input="addGraduateStatus" v-model="graduateStatus" data-vv-name="graduateStatus" type="text" name="graduateStatus" required v-validate="modelValidations.graduateStatus">
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
    </div>
  </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import db from '@/firebase/init';
import firebase from 'firebase/app';
export default {
  components: {
    SlideYDownTransition
  },
  props: {
    avatar: {
      type: String,
      default: "./img/default-avatar.png"
    }
  },
  data() {
    return {
      institution: null,
      campus: null,
      studentNo: null,
      faculty: null,
      degree: null,
      year: null,
      graduateStatus: "",
      institutions: [],
      faculties: [],
      years: [],
      graduates: [],
      touched: {
        institution: false,
        campus: false,
        studentNo: false,
        faculty: false,
        degree: false,
        year: false,
        graduateStatus: false
      },
      modelValidations: {
        institution: {
          required: true
        },
        campus: {
          required: true
        },
        studentNo: {
          required: true
        },
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
        }
      }
    };
  },
  methods: {
    handlePreview(file) {
      this.model.imageUrl = URL.createObjectURL(file.raw);
    },
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit("on-validated", res);
        return res;
      });
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    addInstitution: function() {
      this.$emit("institution", this.institution);
    },
    addCampus: function() {
      this.$emit("campus", this.campus);
    },
    addStudentNo: function() {
      this.$emit("studentNo", this.studentNo);
    },
    addFaculty: function() {
      this.$emit("faculty", this.faculty);
    },
    addDegree: function() {
      this.$emit("degree", this.degree);
    },
    addYear: function() {
      this.$emit("year", this.year);
    },
    addGraduateStatus: function() {
      this.$emit("graduateStatus", this.graduateStatus);
    }
  },
  watch: {
    institution() {
      this.touched.institution = true;
    },
    campus() {
      this.touched.campus = true;
    },
    studentNo() {
      this.touched.studentNo = true;
    },
    faculty() {
      this.touched.faculty = true;
    },
    degree() {
      this.touched.degree = true;
    },
    year() {
      this.touched.year = true;
    },
    graduateStatus() {
      this.touched.graduateStatus = true;
    }
  },
  created() {
    let settings = db.collection('Settings').doc('Drop-down Lists');
    settings.get().then(doc => {
      this.races = doc.data().Races; 
      this.faculties = doc.data().Faculties;
      this.graduates = doc.data().Graduates;
      this.institutions = doc.data().Institutions;
      this.years = doc.data().Years;
    });
  }
};
</script>
<style scoped>
@media only screen and (max-width: 768px) {
  .md-field label {
    font-size: 11px;
  }
}
</style>
