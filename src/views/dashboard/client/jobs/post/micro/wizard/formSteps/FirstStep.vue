<template>
  <div>
    <h5 class="info-text">
      Let's start with the basic information about the job
    </h5>
    <div class="padding">
      <md-field :class="[
          { 'md-valid': !errors.has('name') && touched.name },
          { 'md-error': errors.has('name') }
        ]">
        <label>Job Name</label>
        <md-input @change="addName" v-model="name" data-vv-name="name" type="text" name="name" required v-validate="modelValidations.name"></md-input>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('name')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('name') && touched.name">done</md-icon>
        </slide-y-down-transition>
      </md-field>

      <md-field :class="[
          { 'md-valid': !errors.has('description') && touched.description },
          { 'md-error': errors.has('description') }
        ]">
        <label>Job Description</label>
        <md-textarea @change="addDescription" v-model="description" data-vv-name="description" type="text" name="description" required v-validate="modelValidations.description"></md-textarea>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('description')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('description') && touched.description">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      <br/><br/>
      <md-field :class="[
          { 'md-valid': !errors.has('jobType') && touched.jobType },
          { 'md-error': errors.has('jobType') }
        ]">
        <label>Employment Type</label>
        <md-select @input="addJobType" v-model="jobType" data-vv-name="jobType" type="text" name="jobType" required v-validate="modelValidations.jobType" style="margin-left: 10px;">
          <md-option v-for="(jobType, index) in extraList.JobType" :key="index" :value="jobType">{{jobType}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('jobType')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('jobType') && touched.jobType">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      <br/><br/>
      <md-field :class="[
          { 'md-valid': !errors.has('education') && touched.education },
          { 'md-error': errors.has('education') }
        ]">
        <label>Minimum Level of Education</label>
        <md-select @input="addEducation" v-model="education" data-vv-name="education" type="text" name="education" required v-validate="modelValidations.education" style="margin-left: 10px;">
          <md-option v-for="(education, index) in extraList.MinimumEducation" :key="index" :value="education">{{education}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('education')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('education') && touched.education">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      <br/><br/>
      <md-field :class="[
          { 'md-valid': !errors.has('experience') && touched.experience },
          { 'md-error': errors.has('experience') }
        ]">
        <label>Minimum Work Experience</label>
        <md-select @input="addExperience" v-model="experience" data-vv-name="experience" type="text" name="experience" required v-validate="modelValidations.experience" style="margin-left: 10px;">
          <md-option v-for="(experience, index) in extraList.MinimumExperience" :key="index" :value="experience">{{experience}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('experience')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('experience') && touched.experience">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      <br/><br/>
      <md-field :class="[
          { 'md-valid': !errors.has('industryCategory') && touched.industryCategory },
          { 'md-error': errors.has('industryCategory') }
        ]">
        <label>Job Category</label>
        <md-select @input="addIndustryCategory" v-model="industryCategory" data-vv-name="industryCategory" type="text" name="industryCategory" required v-validate="modelValidations.industryCategory" style="margin-left: 10px;">
          <md-option v-for="(industryCategory, index) in list.JobCategory" :key="index" :value="industryCategory">{{industryCategory}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('industryCategory')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('industryCategory') && touched.industryCategory">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      <br/><br/>
      <!-- Industry: Administration -->
      <md-field v-if="industryCategory === 'Administration'" :class="[
          { 'md-valid': !errors.has('jobCategory') && touched.jobCategory },
          { 'md-error': errors.has('jobCategory') }
        ]">
        <label>Job Title</label>
        <md-select @input="addJobCategory" v-model="jobCategory" data-vv-name="jobCategory" type="text" name="jobCategory" required v-validate="modelValidations.jobCategory" style="margin-left: 10px;">
          <md-option v-for="(jobCategory, index) in list.Administration" :key="index" :value="jobCategory">{{jobCategory}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('jobCategory')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('jobCategory') && touched.jobCategory">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      <!-- Industry: Advertising, Design & Media -->
      <md-field v-if="industryCategory === 'Advertising, Design & Media'" :class="[
          { 'md-valid': !errors.has('jobCategory') && touched.jobCategory },
          { 'md-error': errors.has('jobCategory') }
        ]">
        <label>Job Title</label>
        <md-select @input="addJobCategory" v-model="jobCategory" data-vv-name="jobCategory" type="text" name="jobCategory" required v-validate="modelValidations.jobCategory" style="margin-left: 10px;">
          <md-option v-for="(jobCategory, index) in list.AdvertisingDesignMedia" :key="index" :value="jobCategory">{{jobCategory}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('jobCategory')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('jobCategory') && touched.jobCategory">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      <!-- Industry: Banking & Financial Services -->
      <md-field v-if="industryCategory === 'Banking & Financial Services'" :class="[
          { 'md-valid': !errors.has('jobCategory') && touched.jobCategory },
          { 'md-error': errors.has('jobCategory') }
        ]">
        <label>Job Title</label>
        <md-select @input="addJobCategory" v-model="jobCategory" data-vv-name="jobCategory" type="text" name="jobCategory" required v-validate="modelValidations.jobCategory" style="margin-left: 10px;">
          <md-option v-for="(jobCategory, index) in list.BankingFinancialServices" :key="index" :value="jobCategory">{{jobCategory}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('jobCategory')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('jobCategory') && touched.jobCategory">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      <!-- Industry: Education -->
      <md-field v-if="industryCategory === 'Education'" :class="[
          { 'md-valid': !errors.has('jobCategory') && touched.jobCategory },
          { 'md-error': errors.has('jobCategory') }
        ]">
        <label>Job Title</label>
        <md-select @input="addJobCategory" v-model="jobCategory" data-vv-name="jobCategory" type="text" name="jobCategory" required v-validate="modelValidations.jobCategory" style="margin-left: 10px;">
          <md-option v-for="(jobCategory, index) in list.Education" :key="index" :value="jobCategory">{{jobCategory}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('jobCategory')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('jobCategory') && touched.jobCategory">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      <!-- Industry: Hospitality -->
      <md-field v-if="industryCategory === 'Hospitality'" :class="[
          { 'md-valid': !errors.has('jobCategory') && touched.jobCategory },
          { 'md-error': errors.has('jobCategory') }
        ]">
        <label>Job Title</label>
        <md-select @input="addJobCategory" v-model="jobCategory" data-vv-name="jobCategory" type="text" name="jobCategory" required v-validate="modelValidations.jobCategory" style="margin-left: 10px;">
          <md-option v-for="(jobCategory, index) in list.Hospitality" :key="index" :value="jobCategory">{{jobCategory}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('jobCategory')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('jobCategory') && touched.jobCategory">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      <!-- Industry: Human Resources -->
      <md-field v-if="industryCategory === 'Human Resources'" :class="[
          { 'md-valid': !errors.has('jobCategory') && touched.jobCategory },
          { 'md-error': errors.has('jobCategory') }
        ]">
        <label>Job Title</label>
        <md-select @input="addJobCategory" v-model="jobCategory" data-vv-name="jobCategory" type="text" name="jobCategory" required v-validate="modelValidations.jobCategory" style="margin-left: 10px;">
          <md-option v-for="(jobCategory, index) in list.HumanResources" :key="index" :value="jobCategory">{{jobCategory}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('jobCategory')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('jobCategory') && touched.jobCategory">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      
      <!-- Industry: Information Technology  -->
      <md-field v-if="industryCategory === 'Information Technology'" :class="[
          { 'md-valid': !errors.has('jobCategory') && touched.jobCategory },
          { 'md-error': errors.has('jobCategory') }
        ]">
        <label>Job Title</label>
        <md-select @input="addJobCategory" v-model="jobCategory" data-vv-name="jobCategory" type="text" name="jobCategory" required v-validate="modelValidations.jobCategory" style="margin-left: 10px;">
          <md-option v-for="(jobCategory, index) in list.InformationTechnology" :key="index" :value="jobCategory">{{jobCategory}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('jobCategory')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('jobCategory') && touched.jobCategory">done</md-icon>
        </slide-y-down-transition>
      </md-field>

      <!-- Industry: Legal -->
      <md-field v-if="industryCategory === 'Legal'" :class="[
          { 'md-valid': !errors.has('jobCategory') && touched.jobCategory },
          { 'md-error': errors.has('jobCategory') }
        ]">
        <label>Job Title</label>
        <md-select @input="addJobCategory" v-model="jobCategory" data-vv-name="jobCategory" type="text" name="jobCategory" required v-validate="modelValidations.jobCategory" style="margin-left: 10px;">
          <md-option v-for="(jobCategory, index) in list.Legal" :key="index" :value="jobCategory">{{jobCategory}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('jobCategory')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('jobCategory') && touched.jobCategory">done</md-icon>
        </slide-y-down-transition>
      </md-field>

      <!-- Industry: Retail -->
      <md-field v-if="industryCategory === 'Retail'" :class="[
          { 'md-valid': !errors.has('jobCategory') && touched.jobCategory },
          { 'md-error': errors.has('jobCategory') }
        ]">
        <label>Job Title</label>
        <md-select @input="addJobCategory" v-model="jobCategory" data-vv-name="jobCategory" type="text" name="jobCategory" required v-validate="modelValidations.jobCategory" style="margin-left: 10px;">
          <md-option v-for="(jobCategory, index) in list.Retail" :key="index" :value="jobCategory">{{jobCategory}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('jobCategory')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('jobCategory') && touched.jobCategory">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      <!-- Industry: Sales -->
      <md-field v-if="industryCategory === 'Sales'" :class="[
          { 'md-valid': !errors.has('jobCategory') && touched.jobCategory },
          { 'md-error': errors.has('jobCategory') }
        ]">
        <label>Job Title</label>
        <md-select @input="addJobCategory" v-model="jobCategory" data-vv-name="jobCategory" type="text" name="jobCategory" required v-validate="modelValidations.jobCategory" style="margin-left: 10px;">
          <md-option v-for="(jobCategory, index) in list.Sales" :key="index" :value="jobCategory">{{jobCategory}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('jobCategory')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('jobCategory') && touched.jobCategory">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      <!-- Industry: Other -->
      <md-field v-if="industryCategory === 'Other'" :class="[
          { 'md-valid': !errors.has('jobCategory') && touched.jobCategory },
          { 'md-error': errors.has('jobCategory') }
        ]">
        <label>Job Title</label>
        <md-input @input="addJobCategory" v-model="jobCategory" data-vv-name="jobCategory" type="text" name="jobCategory" required v-validate="modelValidations.jobCategory" style="margin-left: 10px;">
        </md-input>
        <md-icon class="error" v-show="errors.has('jobCategory')">close</md-icon>
        <md-icon class="success" v-show="!errors.has('jobCategory') && touched.jobCategory">done</md-icon>
      </md-field>

      <span v-if="industryCategory"><br/><br/></span>
      <md-field :class="[
          { 'md-valid': !errors.has('skills') && touched.skills },
          { 'md-error': errors.has('skills') }
        ]">
        <label>Required Skills *</label>
        <md-chips @input="addSkills" v-model="skills" data-vv-name="skills" type="text" name="skills" required v-validate="modelValidations.skills"><!-- :md-limit="5"> -->
          <div class="md-helper-text">Press enter to add a skill</div>
        </md-chips>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('skills')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('skills') && touched.skills">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import { SlideYDownTransition } from "vue2-transitions";
export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      name: null,
      description: null,
      jobType: null,
      education: null,
      experience: null,
      industryCategory: null,
      jobCategory: null,
      skills: [],
      list:[],
      extraList: [],
      touched: {
        name: false,
        description: false,
        jobType: false,
        education: false,
        experience: false,
        industryCategory: false,
        jobCategory: false,
        skills: false,
      },
      modelValidations: {
        name: {
          required: true,
          max: 50,
          min: 2
        },
        description: {
          required: true,
          max: 200,
          min: 5
        },
        jobType: {
          required: true
        },
        education: {
          required: true
        },
        experience: {
          required: true
        },
        industryCategory: {
          required: true
        },
        jobCategory: {
          required: true
        },
        skills: {
          required: true
        }
      }
    };
  },
  methods: {
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit("on-validated", res);
        return res;
      });
    },
    addName: function() {
      this.$emit("name", this.name);
    },
    addDescription: function() {
      this.$emit("description", this.description);
    },
    addJobType: function() {
      this.$emit("jobType", this.jobType);
    },
    addEducation: function() {
      this.$emit("education", this.education);
    },
    addExperience: function() {
      this.$emit("experience", this.experience);
    },
    addIndustryCategory: function() {
      this.jobCategory = null;
      this.$emit("industryCategory", this.industryCategory);
    },
    addJobCategory: function() {
      this.$emit("jobCategory", this.jobCategory);
    },
    addSkills: function() {
      this.$emit("skills", this.skills);
    }
  },
  watch: {
    name() {
      this.touched.name = true;
    },
    description() {
      this.touched.description = true;
    },
    jobType() {
      this.touched.jobType = true;
    },
    education() {
      this.touched.education = true;
    },
    experience() {
      this.touched.experience = true;
    },
    industryCategory() {
      this.touched.industryCategory = true;
    },
    jobCategory() {
      this.touched.jobCategory = true;
    },
    skills() {
      this.touched.skills = true;
    }
  },
  created() {
    let settings = db.collection('Settings');
    
    settings.doc('Drop-down Lists').get().then(doc => {
      this.extraList = doc.data();
    });

    settings.doc('Job Category Drop-down Lists').get().then(doc => {
      this.list = doc.data();
    });
  }
};
</script>
<style>
.md-helper-text {
  bottom: -18px !important;
}
.padding {
  padding:10px;
}
</style>
