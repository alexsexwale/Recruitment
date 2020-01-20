<template>
  <div>
    <h5 class="info-text">Have one last final look at the microjob you are about to post</h5>
    <div class="md-layout">
      <md-card class="bg-success">
        <md-card-content>
          <h3 class="card-category card-category-social" style="text-align:center;">
            <i class="far fa-newspaper" /> Microjob Description
          </h3>
          <h4 class="card-title">Microjob Name</h4>
          <p class="card-description">Graphic Designer</p>

          <h4 class="card-title">Microjob Description</h4>
          <p class="card-description">Looking for a graphic designer to design a logo for a beverage company looking to rebrand</p>

          <h4 class="card-title">Skills Required</h4>
          <p class="card-description">Graphic Design</p>

          <div class="card-stats text-center">
            <md-button class="md-success">Edit</md-button>
          </div>
        </md-card-content>
      </md-card>
      <md-card class="bg-success">
        <md-card-content>
          <h3 class="card-category card-category-social" style="text-align:center;">
            <i class="far fa-newspaper" /> Microjob Details
          </h3>
          <h4 class="card-title">Location</h4>
          <p class="card-description">Hatfield, Pretoria</p>

          <h4 class="card-title">Deadline</h4>
          <p class="card-description">7 October 2025</p>

          <div class="card-stats text-center">
            <md-button class="md-success">Edit</md-button>
          </div>
        </md-card-content>
      </md-card>
      <md-card class="bg-success">
          <md-card-content>
            <h3 class="card-category card-category-social" style="text-align:center;">
            <i class="far fa-newspaper" /> Microjob Payment
            </h3>
            <h4 class="card-title">Budget</h4>
            <p class="card-description">R1100.00</p>
            <hr/>
            <b>Cost Breakdown</b>
            <p class="card-description">Freelancer Rate</p> &nbsp;&nbsp; R1000.00
            <p class="card-description">Jobox Service Fee (10%)</p> &nbsp;&nbsp; R100.00


            <h4 class="card-title">Payment Option</h4>
            <p class="card-description">Upfront</p>

            <div class="card-stats text-center">
              <md-button class="md-success">Edit</md-button>
            </div>
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
  data() {
    return {
      model: {
        upfront: false,
        postPayment: false
      },
      budget: "",
      touched: {
        budget: false
      },
      modelValidations: {
        budget: {
          required: true
        }
      }
    };
  },
  methods: {
    validate() {
      this.$emit("on-validated", true, this.model);
      return Promise.resolve(true);
    },
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit("on-validated", res);
        return res;
      });
    }
  },
  watch: {
    budget() {
      this.touched.budget = true;
    }
  }
};
</script>
<style></style>
