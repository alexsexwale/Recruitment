<template>
    <div class="md-layout">
      <notifications></notifications>
      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <!-- Courses -->
        <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('course') && touched.course },
            { 'md-form-group': true },
            { 'md-error': errors.has('course') }
            ]">
            <md-icon>school</md-icon>
            <label>Courses</label>
            <md-select class="pad" @input="addCourse" v-model="course" data-vv-name="course" type="text" name="course" required v-validate="modelValidations.course">
            <md-option v-for="(course, index) in courses" :key="index" :value="course">{{ course }}</md-option>
            </md-select>
            <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('course')">close</md-icon>
            </slide-y-down-transition>
            <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('course') && touched.course">done</md-icon>
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
import debounce from "debounce";
import moment from "moment";
export default {
    name: 'code-space',
    components: {
      SlideYDownTransition
    },
    data() {
        return {
          alias: null,
          user: null,  
          softwareTraining: null,  
          courses: [],
          awsCurriculum: [],
          awsDuration: "",
          awsSkills: [],
          backendDevelopmentCurriculum: [],
          backendDevelopementDuration: "",
          backendDevelopementSkills: [],
          frontendDevelopmentCurriculum: [],
          frontendDevelopmentDuration: "",
          frontendDevelopmentSkills: [],
          introToWebCurriculum: [],
          introToWebDuration: "",
          introToWebSkills: [],
          mobileAppDevelopmentCurriculum: [],
          mobileAppDevelopmentDuration: "",
          mobileAppDevelopmentSkills: [],
          softwareDevelopmentCurriculum: [],
          softwareDevelopmentDuration: "",
          softwareDevelopmentSkills: [],
          webDesignCurriculum: [],
          webDesignDuration: "",
          webDesignSkills: [],
          course: null,
          curriculum: [],
          duration: null,
          skills: []
        }
    },
    methods: {
        debouncedUpdate: debounce(function(){
            this.updateAccount();
        }, 1500),
        updateAccount() {
          this.softwareTraining.get().then(doc => {
            if(doc.exists) {
              this.softwareTraining.update({
                lastModified: moment(Date.now()).format('L'),
                course: this.course,
                curriculum: this.curriculum,
                duration: this.duration,
                skills: this.skills
              });  
            }
            else {
              this.softwareTraining.set({
                userId: this.user.uid,
                created: moment(Date.now()).format('L'),
                lastModified: moment(Date.now()).format('L'),
                course: this.course,
                curriculum: this.curriculum,
                duration: this.duration,
                skills: this.skills
              }); 
              db.collection('institutions').doc(this.alias).set({
                userId: this.user.uid,
                created: moment(Date.now()).format('L'),
                lastModified: moment(Date.now()).format('L'),
                type: "Software Training Institute",
                name: "CodeSpace",
                city: "Cape Town",
                province_state: "Western Cape",
                country: "South Africa",
                website: "https://www.codespace.co.za/"
              }); 
            }  
          });
        },
        addCourses: function() {
            if(this.course === "Intro to Web") {
              this.curriculum = this.introToWebCurriculum;
              this.duration = this.introToWebDuration;
              this.skills = this.introToWebSkills;
            }
            if(this.course === "Web Design") {
              this.curriculum = this.webDesignCurriculum;
              this.duration = this.webDesignDuration;
              this.skills = this.webDesignSkills;
            }
            if(this.course === "Frontend Development") {
              this.curriculum = this.frontendDevelopmentCurriculum;
              this.duration = this.frontendDevelopmentDuration;
              this.skills = this.frontendDevelopmentSkills
            }
            if(this.course === "Backend Development") {
              this.curriculum = this.backendDevelopmentCurriculum;
              this.duration = this.backendDevelopementDuration;
              this.skills = this.backendDevelopementSkills;
            }
            if(this.course === "Software Development") {
              this.curriculum = this.softwareDevelopmentCurriculum;
              this.duration = this.softwareDevelopmentDuration;
              this.skills = this.softwareDevelopmentSkills;
            }
            if(this.course === "Mobile Development") {
              this.curriculum = this.mobileAppDevelopmentCurriculum;
              this.duration = this.mobileAppDevelopmentDuration;
              this.skills = this.mobileAppDevelopmentSkills;
            }
            if(this.course === "AWS Cloud Foundations") {
                this.curriculum = this.awsCurriculum;
                this.duration = this.awsDuration;
                this.skills = this.awsSkills;
            }

            this.$emit("course", this.course);
            this.$emit("curriculum", this.curriculum);
            this.$emit("duration", this.duration);
            this.$emit("skills", this.skills);
            this.debouncedUpdate();
        }
    },
    watch: {
        course() {
          this.touched.course = true;
        }
    },
    created() {
      let Dropdowns = db.collection('Settings').doc('CodeSpace Drop-down Lists');
      Dropdowns.get().then(doc => {
        // Courses  
        this.courses = doc.data().courses; 

        // AWS cloud foundations
        this.awsCurriculum = doc.data().
        
        // Intro to web
        this.introToWebCurriculum = doc.data().IntroToWebCurriculum;
        this.introToWebDuration = doc.data().IntroToWebDuration;
        this.introToWebSkills = doc.data().IntroToWebSkills;

        // Web Design
        this.webDesignCurriculum = doc.data().WebDesignCurriculum;
        this.webDesignDuration = doc.data().WebDesignDuration;
        this.webDesignSkills = doc.data().WebDesignSkills;

        // Frontend Development
        this.frontendDevelopmentCurriculum = doc.data().FrontendDevelopmentCurriculum;
        this.frontendDevelopmentDuration = doc.data().FrontendDevelopmentDuration;
        this.frontendDevelopmentSkills = doc.data().FrontendDevelopmentSkills;

        // Backend Development
        this.backendDevelopmentCurriculum = doc.data().BackendDevelopmentCurriculum;
        this.frontendDevelopmentDuration = doc.data().BackendDevelopmentDuration;
        this.frontendDevelopmentSkills = doc.data().BackendDevelopmentSkills;

        // Software Development
        this.softwareDevelopmentCurriculum = doc.data().SoftwareDevelopmentCurriculum;
        this.softwareDevelopmentDuration = doc.data().SoftwareDevelopmentDuration;
        this.softwareDevelopmentSkills = doc.data().SoftwareDevelopmentSkills;

        // Mobile Development
        this.mobileAppDevelopmentCurriculum = doc.data().MobileAppDevelopmentCurriculum;
        this.mobileAppDevelopmentDuration = doc.data().MobileAppDevelopmentDuration;
        this.mobileAppDevelopmentSkills = doc.data().MobileAppDevelopmentSkills;

        this.user = firebase.auth().currentUser;
        let ref = db.collection('users');
        ref.where('userId', '==', this.user.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.alias = doc.id;  
            this.softwareTraining = db.collection('softwareDevelopmentTraining').doc(this.alias);
            this.softwareTraining.get().then(doc => {
              if(doc.exists) {
                this.course = doc.data().course;  
              }  
            })
            .catch(err => {
              console.log(err.message);
            });
          });
        });
      });
    }
}
</script>