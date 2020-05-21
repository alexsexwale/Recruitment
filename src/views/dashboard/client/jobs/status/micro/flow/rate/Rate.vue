<template>
  <form @submit.prevent="submit">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <hr><h2 class="centre">Rate & Review</h2><hr>
    <!-- Interpersonal -->
    <strong>Interpersonal </strong><i class="fas fa-question-circle"><md-tooltip md-direction="right">blah blah blah Interpersonal</md-tooltip></i>
    <star-rating :show-rating="false" :glow="10" v-model="interpersonal"></star-rating>
    <!-- Communication -->
    <strong>Communication </strong><i class="fas fa-question-circle"><md-tooltip md-direction="right">blah blah blah Communication</md-tooltip></i>
    <star-rating :show-rating="false" :glow="10" v-model="communication"></star-rating>
    <!-- Organisational -->
    <strong>Organisational </strong><i class="fas fa-question-circle"><md-tooltip md-direction="right">blah blah blah Organisational</md-tooltip></i>
    <star-rating :show-rating="false" :glow="10" v-model="organisational"></star-rating>
    <!-- Leadership -->
    <strong>Leadership </strong><i class="fas fa-question-circle"><md-tooltip md-direction="right">blah blah blah Leadership</md-tooltip></i>
    <star-rating :show-rating="false" :glow="10" v-model="leadership"></star-rating>
    <!-- Problem Solving -->
    <strong>Problem Solving </strong><i class="fas fa-question-circle"><md-tooltip md-direction="right">blah blah blah Problem Solving</md-tooltip></i>
    <star-rating :show-rating="false" v-model="problemSolving"></star-rating>
    <!-- Review -->
    <md-field :class="[
        { 'md-valid': !errors.has('review') && touched.review },
        { 'md-error': errors.has('review') }
      ]">
      <label>Tell us about your experience working with the student</label>
      <md-textarea v-model="review" data-vv-name="review" type="text" name="review" required v-validate="modelValidations.review"></md-textarea>
      <slide-y-down-transition>
        <md-icon class="error" v-show="errors.has('review')">close</md-icon>
      </slide-y-down-transition>
      <slide-y-down-transition>
        <md-icon class="success" v-show="!errors.has('review') && touched.review">done</md-icon>
      </slide-y-down-transition>
    </md-field>
    <br/>
    <!-- Submit -->
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
      loading: false,
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
      this.loading = true;
      let user = firebase.auth().currentUser;
      if(this.interpersonal && this.communication && this.organisational && this.leadership && this.problemSolving && this.review) {
        let averageRating = ((this.interpersonal + this.interpersonal + this.communication + this.organisational + this.leadership + this.problemSolving)/5).toFixed(2);
        let StudentRating = db.collection('clientRatings');
          StudentRating.add({
          jobId: this.$route.params.id,
          interpersonal: this.interpersonal,
          communication: this.communication,
          organisational: this.organisational,
          leadership: this.leadership,
          problemSolving: this.problemSolving,
          average: averageRating,
          review: this.review,
          //studentId: ,
          clientId : user.uid
        });
        let rateJob = db.collection('micros').doc(this.$route.params.id);
        rateJob.get().then(doc => {
          rateJob.update({
            clientRatingComplete: true,
          });
          if(doc.data().studentRatingComplete) {
            rateJob.update({
              complete: true
            });
            this.$router.push({ name: 'complete-jobs'});
          }
          else {
            let ref = db.collection('users');
            ref.where('userId', '==', user.uid).get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                this.$router.push({ name: 'client-profile', params: doc.id});
              });
            });
          }
        });
      }
      else {
        this.feedback = "Please complete the form before submitting";
        this.loading = false;
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
  font-weight: bold;
}
</style>