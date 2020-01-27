<template>
  <div>
    <hr/>
     <p class="centre">In order to complete the job off, you will need to rate the other party.</p>
    <hr/>
    <strong>Rate the client </strong> <i class="fas fa-question-circle"></i>
    <star-rating v-model="rating"></star-rating>
    <md-field>
      <label>Tell us about your experience working with the client</label>
      <md-textarea v-model="review" type="text"></md-textarea>
    </md-field>
    <br/>
    <div class="centre">
      <md-button @click="submit" class="md-success">Submit</md-button>
    </div>
  </div>
</template>
<script>
import StarRating from 'vue-star-rating'

export default {
  components: {
    StarRating
  },
  data() {
    return {
      rating: null,
      review: null,
      feedback: null
    };
  },
  methods: {
    submit() {
        if(this.rating) {

        }
    }
  },
};
</script>
<style scoped>
  .centre {
    text-align: center;
    font-weight: bold;
  }
</style>
