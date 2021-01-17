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
        <label>Name</label>
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
        <label>Description</label>
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
          { 'md-valid': !errors.has('category') && touched.category },
          { 'md-error': errors.has('category') }
        ]">
        <label>Task/Project</label>
        <md-select @input="addCategory" v-model="category" data-vv-name="category" type="text" name="category" required v-validate="modelValidations.category" style="margin-left: 10px;">
          <md-option v-for="(category, index) in skillCategories" :key="index" :value="category">{{category}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('category')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('category') && touched.category">done</md-icon>
        </slide-y-down-transition>
      </md-field>
      <br/><br/>
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
import { SlideYDownTransition } from "vue2-transitions";
export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      name:null,
      description: null,
      category: null,
      skills: [],
      skillCategories:[],
      touched: {
        name: false,
        description: false,
        category: false,
        skills: false,
      },
      modelValidations: {
        name: {
          required: true
        },
        description: {
          required: true
        },
        category: {
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
    addCategory: function() {
      this.$emit("category", this.category);
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
    category() {
      this.touched.category = true;
    },
    skills() {
      this.touched.skills = true;
    }
  },
  created() {
    let settings = db.collection('Settings').doc('Drop-down Lists');
    settings.get().then(doc => {
      this.skillCategories = doc.data().SkillCategories;
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
