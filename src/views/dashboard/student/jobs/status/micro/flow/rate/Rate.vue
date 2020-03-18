<template>
  <form @submit.prevent="submit">
    <hr/>
     <p class="centre">In order to complete the job, you will need to rate the other party.</p>
    <hr/>
    <strong>Rate the client </strong> <i class="fas fa-question-circle"></i>
    <star-rating :show-rating="false" :glow="10" v-model="rating"></star-rating>

    <md-field :class="[
          { 'md-valid': !errors.has('review') && touched.review },
          { 'md-error': errors.has('review') }
        ]">
        <label>Tell us about your experience working with the client</label>
        <md-textarea v-model="review" data-vv-name="review" type="text" name="review" required v-validate="modelValidations.review"></md-textarea>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('review')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('review') && touched.review">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    <br/>
    <div class="centre">
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
      rating: null,
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
    }
  },
  methods: {
    submit() {
      if(this.rating && this.review) {
        let ClientRating = db.collection('clientRatings');
        clientRating.add({
          jobId: this.$route.params.id,
          rate: this.rating,
          review: this.review 
        })
        let rateJob = db.collection('jobs').doc(this.$route.params.id);
        rateJob.update({
          status: "done"  
        });
        this.$router.push({ name: 'complete-student-jobs'});
      }
    }
  },
  watch: {
    review() {
      this.touched.review = true;  
    }  
  }
}
</script>
<style scoped>
.centre {
    text-align: center;
    font-weight: bold;
  }
</style>