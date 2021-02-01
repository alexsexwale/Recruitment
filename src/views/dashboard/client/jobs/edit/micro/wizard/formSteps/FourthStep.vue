<template>
  <div>
    <h5 class="info-text">Have one last final look at the job you are about to post</h5>
    <div class="md-layout">
      <md-card>
        <md-card-content>
          <collapse :collapse="['Job Description', 'Job Information', 'Budget']" icon="keyboard_arrow_down" color-collapse="success">
            <template slot="md-collapse-pane-1">
              <md-card class="bg-success">
                <md-card-content>
                  <h3 class="card-category card-category-social" style="text-align:center;">
                    <i class="fas fa-list-ul"></i> Job Description
                  </h3>
                  <h4 class="card-title">Job Name</h4>
                  <p class="card-description">{{ name }}</p>

                  <h4 class="card-title">Job Description</h4>
                  <p class="card-description">{{ description }}</p>

                  <h4 class="card-title">Job Category</h4>
                    <p class="card-description">{{ category }}</p>

                  <h4 class="card-title">Skills Required</h4>
                  <ul v-if="skills">
                    <li v-for="skill in skills" :key="skill" class="card-description">{{ skill }}</li>
                  </ul>
                </md-card-content>
              </md-card>
            </template>
            <template slot="md-collapse-pane-2">
              <md-card class="bg-success">
                <md-card-content>
                  <h3 class="card-category card-category-social" style="text-align:center;">
                    <i class="fas fa-clipboard-list"></i> Job Information
                  </h3>
                  <h4 class="card-title">Location</h4>
                  <p class="card-description">{{ location }}</p>

                  <h4 class="card-title">Estimated Duration</h4>
                  <p class="card-description">{{ deadline }}</p>
                </md-card-content>
              </md-card>
            </template>
            <template slot="md-collapse-pane-3">
              <md-card class="bg-success">
                <md-card-content>
                  <h3 class="card-category card-category-social" style="text-align:center;">
                  <i class="fas fa-wallet"></i> Budget
                  </h3>
                  <h4 class="card-title">Total Budget</h4>
                  <p class="card-description"><b>R{{ total() }}</b> = <b>R{{ rate() }}</b> + <b>R{{ fee() }}</b> + <b>R{{ price.facilitationFee }}.00</b></p>
                  <hr/>
                  <h4 class="card-title">Cost Breakdown</h4>
                  <p class="card-description">Student Rate:  <b>R{{ rate() }}</b></p> 
                  <p class="card-description">Jobox Service Fee ({{ percentage() }}%): <b>R{{ fee() }}</b></p> 
                  <p class="card-description">Jobox Facilitation Cost: <b>R{{ price.facilitationFee }}.00</b></p>
                </md-card-content>
              </md-card>
            </template>
          </collapse>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
import { IconCheckbox, Collapse } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
import db from '@/firebase/init';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage';

export default {
  components: {
    IconCheckbox,
    Collapse,
    SlideYDownTransition
  },
  props: {
    name: {},
    description: {},
    category:{},
    skills: {},
    location: {},
    deadline: {},
    budget: {},
    payment: {}
  },
  data() {
    return {
      deadlineReview: null,
      price: {}
    };
  },
  methods: {
    total() {
      let total = ((this.budget * (1 + this.price.serviceFee)) + this.price.facilitationFee).toFixed(2);
      return total;
    },
    rate() {
      let rate = (this.budget * 1).toFixed(2);
      return rate;
    },
    fee() {
      let fee = ((this.budget * this.price.serviceFee)).toFixed(2);
      return fee;
    },
    percentage() {
      return this.price.serviceFee * 100;
    }
  },
  created() {
    let businessModel = db.collection('Settings').doc('Business Model');
    businessModel.get().then(doc => {
      this.price = doc.data();
    }); 
  }
};
</script>
<style></style>
