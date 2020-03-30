<template>
  <div>
    <h5 class="info-text">Have one last final look at the microjob you are about to post</h5>
    <div class="md-layout">
      <md-card class="bg-success">
        <md-card-content>
          <h3 class="card-category card-category-social" style="text-align:center;">
            <i class="far fa-newspaper" /> Description
          </h3>
          <h4 class="card-title">Name</h4>
          <p class="card-description">{{ name }}</p>

          <h4 class="card-title">Description</h4>
          <p class="card-description">{{ description }}</p>

          <h4 class="card-title">Skills Required</h4>
          <ul>
            <li v-for="skill in skills" :key="skill" class="card-description">{{ skill }}</li>
          </ul>
        </md-card-content>
      </md-card>
      <md-card class="bg-success">
        <md-card-content>
          <h3 class="card-category card-category-social" style="text-align:center;">
            <i class="far fa-newspaper" /> Details
          </h3>
          <h4 class="card-title">Location</h4>
          <p class="card-description">{{ location }}</p>

          <h4 class="card-title">Anticipated Duration</h4>
          <p class="card-description">{{ deadline }}</p>
        </md-card-content>
      </md-card>
      <md-card class="bg-success">
          <md-card-content>
            <h3 class="card-category card-category-social" style="text-align:center;">
            <i class="far fa-newspaper" /> Payment
            </h3>
            <h4 class="card-title">Total Budget</h4>
            <p class="card-description">R{{ total() }}</p>
            <hr/>
            <b>Cost Breakdown</b>
            <p class="card-description">Freelancer Rate</p> &nbsp;&nbsp; R{{ rate() }}
            <p class="card-description">Jobox Service Fee (10%)</p> &nbsp;&nbsp; R{{ fee() }}
          </md-card-content>
        </md-card>
    </div>
  </div>
</template>
<script>
import { IconCheckbox } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";

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
    // getLocation() {
    //   if(this.location) {
        
    //   }
    //   else{
    //     this.location = "remote";
    //   }
    // },
    // duration() {
    //   switch(this.deadline) {
    //     case "0-1":
    //       return "Less than a week";
    //     case "1-4":
    //       return "Less than a month";
    //     case "4-12":
    //       return "Less than 3 months";
    //     case "unknown":
    //       return "I am not sure yet";
    //   }
    // },
    total() {
      let total = (this.budget * 1.1).toFixed(2);
      return total;
    },
    rate() {
      let rate = (this.budget * 1).toFixed(2);
      return rate;
    },
    fee() {
      let fee = (this.budget * 0.1).toFixed(2);
      return fee;
    }
  }
};
</script>
<style></style>
