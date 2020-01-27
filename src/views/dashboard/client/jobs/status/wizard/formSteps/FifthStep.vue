<template>
  <div>
    <strong>Interpersonal </strong><i class="fas fa-question-circle"></i> <star-rating v-model="interpersonal"></star-rating>
    <strong>Communication </strong><i class="fas fa-question-circle"></i> <star-rating v-model="communication"></star-rating>
    <strong>Organisational </strong><i class="fas fa-question-circle"></i> <star-rating v-model="organisational"></star-rating>
    <strong>Leadership </strong><i class="fas fa-question-circle"></i> <star-rating v-model="leadership"></star-rating>
    <strong>Problem Solving </strong><i class="fas fa-question-circle"></i> <star-rating v-model="problemSolving"></star-rating>
    <md-field>
      <label>Tell us about your experience work with the student</label>
      <md-textarea v-model="review" type="text"></md-textarea>
    </md-field>
    <br/>
    <div style="text-align:center">
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
      interpersonal: null,
      communication: null,
      organisational: null,
      leadership: null,
      problemSolving: null,
      review: null,
      feedback: null
    };
  },
  methods: {
    submit() {
        if(this.interpersonal && this.communication && this.organisational && this.leadership && this.problemSolving && this.review) {

        }
    }
  },
};
</script>
<style></style>
