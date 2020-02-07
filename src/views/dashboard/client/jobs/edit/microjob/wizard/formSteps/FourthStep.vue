<template>
  <div>
    <h5 class="info-text">Have one last final look at the microjob you are about to post</h5>
    <div class="md-layout">
      <md-card class="bg-success">
        <md-card-content>
          <h3 class="card-category card-category-social" style="text-align:center;">
            <i class="far fa-newspaper" /> Job description
          </h3>
          <h4 class="card-title">Name</h4>
          <p class="card-description">{{ name }}</p>

          <h4 class="card-title">Description</h4>
          <p class="card-description">{{ description}}</p>

          <h4 class="card-title">Skills Required</h4>
          <p v-for="skill in skills" :key="skill" class="card-description">{{ skill }}</p>
        </md-card-content>
      </md-card>
      <md-card class="bg-success">
        <md-card-content>
          <h3 class="card-category card-category-social" style="text-align:center;">
            <i class="far fa-newspaper" /> Job Details
          </h3>
          <h4 class="card-title">Location</h4>
          <p class="card-description">{{ location }}</p>

          <h4 class="card-title">Deadline</h4>
          <p class="card-description">{{ deadlineDisplay() }}</p>
        </md-card-content>
      </md-card>
      <md-card class="bg-success">
          <md-card-content>
            <h3 class="card-category card-category-social" style="text-align:center;">
            <i class="far fa-newspaper" /> Microjob Payment
            </h3>
            <h4 class="card-title">Budget</h4>
            <p class="card-description">R{{ budget }}</p>
            <hr/>
            <b>Cost Breakdown</b>
            <p class="card-description">Freelancer Rate</p> &nbsp;&nbsp; R{{ budget * 0.9}}
            <p class="card-description">Jobox Service Fee (10%)</p> &nbsp;&nbsp; R{{budget * 0.1}}

            <h4 class="card-title">Payment Option</h4>
            <p class="card-description">Upfront</p>
          </md-card-content>
        </md-card>
    </div>
  </div>
</template>
<script>
import { IconCheckbox } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
import moment from "moment";

export default {
  components: {
    IconCheckbox,
    SlideYDownTransition
  },
  props: {
    name: {},
    description: {},
    skills: {},
    location: {},
    deadline: {},
    budget: {},
    payment: {}
  },
  data() {
    return {
      deadlineReview: null
    };
  },
  methods: {
    deadlineDisplay() {
      return this.deadlineReview = moment(this.deadline).format('DD MMMM YYYY');
    }
  }
};
</script>
<style></style>
