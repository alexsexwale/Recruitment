<template>
  <form @submit.prevent="submit">
    <hr>
      <h2 class="centre">Rate & Review</h2>
    <hr>
    <br>
    <strong>Interpersonal </strong><i class="fas fa-question-circle"></i> <star-rating v-model="interpersonal"></star-rating>
    <strong>Communication </strong><i class="fas fa-question-circle"></i> <star-rating v-model="communication"></star-rating>
    <strong>Organisational </strong><i class="fas fa-question-circle"></i> <star-rating v-model="organisational"></star-rating>
    <strong>Leadership </strong><i class="fas fa-question-circle"></i> <star-rating v-model="leadership"></star-rating>
    <strong>Problem Solving </strong><i class="fas fa-question-circle"></i> <star-rating v-model="problemSolving"></star-rating>
    <md-field :class="[
          { 'md-valid': !errors.has('review') && touched.review },
          { 'md-error': errors.has('review') }
        ]">
        <label>Tell us about your experience work with the student</label>
        <md-textarea v-model="review" data-vv-name="review" type="text" name="review" required v-validate="modelValidations.review"></md-textarea>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('review')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('review') && touched.review">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    <br/>
    <div style="text-align:center">
      <button class="md-button md-success md-theme-default" slot="footer">
        <div class="md-ripple">
          <div class="md-button-content">
            Submit
          </div>
        </div>
      </button>
    </div>
  </form>
</template>
<script>
import db from '@/firebase/init';
import firebase from "firebase/app";
import StarRating from 'vue-star-rating';
import { SlideYDownTransition } from "vue2-transitions";
export default {
  components: {
    StarRating,
    SlideYDownTransition
  },
  data() {
    return {
      interpersonal: null,
      communication: null,
      organisational: null,
      leadership: null,
      problemSolving: null,
      review: null,
      feedback: null,
      touched: {
        review: false
      },
      modelValidations: {
        review: {
          required: true  
        }  
      }
    };
  },
  methods: {
    submit() {
        if(this.interpersonal && this.communication && this.organisational && this.leadership && this.problemSolving && this.review) {
          let StudentRating = db.collection('studentRatings');
            StudentRating.add({
            jobId: this.$route.params.id,
            rate: this.rating,
            review: this.review 
          })
          let rateJob = db.collection('jobs').doc(this.$route.params.id);
          rateJob.update({
            status: "done" 
          });
          this.$router.push({ name: 'complete-jobs'});
        }
     }
  },
  watch: {
    review() {
      this.touched.review = true;  
    }  
  }
};
</script>
<style scoped>
.centre {
  text-align: center;
}
</style>