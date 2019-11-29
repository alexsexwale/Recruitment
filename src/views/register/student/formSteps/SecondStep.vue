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
          <label>Where do you study?</label>
          <md-select v-model="institution" data-vv-name="institution" type="text" name="institution" required v-validate="modelValidations.institution" style="margin-left: 10px;">
            <md-option value="University of Pretoria">University of Pretoria</md-option>
            <md-option value="Sefako Makgatho Health Sciences">Sefako Makgatho Health Sciences</md-option>
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
          <label>Enter your campus</label>
          <md-input v-model="campus" data-vv-name="campus" type="text" name="campus" required v-validate="modelValidations.campus">
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
          <label>Student Number</label>
          <md-input v-model="studentNo" data-vv-name="studentNo" type="text" name="studentNo" required v-validate="modelValidations.studentNo">
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
          <label>Select your faculty</label>
          <md-select v-model="faculty" data-vv-name="faculty" type="text" name="faculty" required v-validate="modelValidations.faculty" style="margin-left: 10px;">
            <md-option value="Economic and Management Sciences">Economic and Management Sciences</md-option>
            <md-option value="Education">Education</md-option>
            <md-option value="Engineering, Built Environment and Information Technology">Engineering, Built Environment and Information Technology</md-option>
            <md-option value="Health Sciences">Health Sciences</md-option>
            <md-option value="Humanities">Humanities</md-option>
            <md-option value="Law">Law</md-option>
            <md-option value="Natural and Agricultural Sciences">Natural and Agricultural Sciences</md-option>
            <md-option value="Theology and Religion">Theology and Religion</md-option>
            <md-option value="Veterinary Science">Veterinary Science</md-option>
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
          <label>Select your degree</label>
          <md-input v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
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
            { 'md-valid': !errors.has('major') && touched.major },
            { 'md-form-group': true },
            { 'md-error': errors.has('major') }
          ]">
          <md-icon>school</md-icon>
          <label>Select your major</label>
          <md-input v-model="major" data-vv-name="major" type="text" name="major" required v-validate="modelValidations.major">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('major')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('major') && touched.major">done</md-icon>
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
          <label>What year are you in?</label>
          <md-select v-model="year" data-vv-name="year" type="text" name="year" required v-validate="modelValidations.year" style="margin-left: 10px;">
            <md-option value="1st Year">1st Year</md-option>
            <md-option value="2nd Year">2nd Year</md-option>
            <md-option value="3rd Year">3rd Year</md-option>
            <md-option value="4th Year">4th Year</md-option>
            <md-option value="5th Year">5th Year</md-option>
            <md-option value="Honours">Honours</md-option>
            <md-option value="Masters">Masters</md-option>
            <md-option value="PhD">PhD</md-option>
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
          <md-input v-model="graduateStatus" data-vv-name="graduateStatus" type="text" name="graduateStatus" required v-validate="modelValidations.graduateStatus">
          </md-input>
          <md-select v-model="graduateStatus" data-vv-name="graduateStatus" type="text" name="graduateStatus" required v-validate="modelValidations.graduateStatus" style="margin-left: 10px;">
            <md-option value="Undergraduate">Undergraduate</md-option>
            <md-option value="Postgraduate">Postgraduate</md-option>
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
      institution: "",
      campus: "",
      studentNo: "",
      faculty: "",
      degree: "",
      major: "",
      year: "",
      graduateStatus: "",
      touched: {
        firstName: false,
        lastName: false,
        institution: false,
        campus: false,
        studentNo: false,
        faculty: false,
        degree: false,
        major: false,
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
        major: {
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
    major() {
      this.touched.major = true;
    },
    year() {
      this.touched.year = true;
    },
    graduateStatus() {
      this.touched.graduateStatus = true;
    }
  }
};
</script>
<style></style>
