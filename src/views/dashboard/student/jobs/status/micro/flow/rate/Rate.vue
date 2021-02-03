<template>
  <form v-if="!client.studentRatingComplete" @submit.prevent="submit">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <hr><h2 class="centre">Please Rate & Review the Client</h2><hr>
    <!-- Rating -->
    <p>Thank you so much for being awesome and adding value to your client.</p>
    <p>In order to ensure that we keep on providing you with better clients, we ask that you please rate and review the client that you worked with.</p>
    <p>This not only helps the clients improve but also assists us in knowing which clients we continue to work with.</p>
    <p>Your feedback will be highly appreciated!</p>
    <strong>Could you please rate the client based on the work you did with them? </strong> <i class="fas fa-question-circle"><md-tooltip md-direction="right">This is similar to an Uber rating where you rate how it was working with the client</md-tooltip></i>
    <star-rating :show-rating="true" :glow="10" :round-start-rating="false" v-model="rating"></star-rating>
    <!-- Review -->
    <md-field :class="[
          { 'md-valid': !errors.has('review') && touched.review },
          { 'md-error': errors.has('review') }
        ]">
        <label>Do you have any additional comments?</label>
        <md-textarea v-model="review" data-vv-name="review" type="text" name="review" v-validate="modelValidations.review"></md-textarea>
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
    <!-- Modal: Incomplete -->
    <modal v-if="modal" @close="modalHide">
      <template slot="header">
        <h4 class="modal-title black">Whoa there! ✋</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <p class="black">{{ feedback }}</p>
      </template>
      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-success" @click="modalHide">Got it</md-button>
        </div>
      </template>
    </modal>
  </form>
  <div v-else>
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <hr><h2 class="centre">Waiting for the Client to Give You a Rating</h2><hr>
    <p class="centre">Waiting for the client to give you a rating.</p><hr>
    <h6 class="centre">Client Information</h6>
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <img v-if="picture" class="img" :src="picture" />
            <img v-else class="img" :src="cardUserImage" />
          </div>
          <md-card-content>
          <h6 class="category text-gray">{{ client.companyName }}</h6>
          <h4><router-link class="card-title" :to="{ name: 'view-client-profile', params: {id: client.clientAlias}}"><a>{{ client.clientName }}</a></router-link></h4>
          <p class="card-description">{{ client.description }}</p>
          </md-card-content>
        </md-card>
        <p style="text-align: center;">Call us at: <b>087 149 4394</b></p>
        <p style="text-align: center;">Email us at: <b><a style="color:blue" href="mailto:contact@jobox.co.za">contact@jobox.co.za</a></b></p>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "@/components";
import db from '@/firebase/init';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import StarRating from 'vue-star-rating';
import { SlideYDownTransition } from "vue2-transitions";
export default {
  components: {
    Modal,
    StarRating,
    SlideYDownTransition
  },
  data() {
    return {
      rating: null,
      review: null,
      feedback: null,
      loading: true,
      modal: false,
      client: {},
      applicant: {},
      picture: null,
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
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  methods: {
    modalHide() {
      this.modal = false;
    },
    submit() {
      this.loading = true;
      let user = firebase.auth().currentUser;
      if(this.rating) {
        db.collection('jobs').doc(this.$route.params.id).get().then(doc => {
          db.collection('studentRatings').add({
            jobId: this.$route.params.id,
            rate: this.rating,
            review: this.review,
            studentId: user.uid,
            clientId : doc.data().clientId
          });
          let rateJob = db.collection('micros').doc(this.$route.params.id)
          rateJob.update({
            studentRatingComplete: true
          });
          db.collection('micros').doc(this.$route.params.id).get().then(doc => {
            if(doc.data().clientRatingComplete) {
              rateJob.update({
                complete: true,
                status: "summary"
              });
            }
          });
        });
        this.loading = false;
      }
      else {
        this.feedback = "Please rate the client before clicking on the submit button";
        this.modal = true;
        this.loading = false;
      }
    }
  },
  watch: {
    review() {
      this.touched.review = true;  
    }  
  },
  created() {
    let jobs = db.collection('micros');
    jobs.doc(this.$route.params.id).get().then(doc => {
      this.client = doc.data();
      db.collection('clients').doc(this.client.clientAlias).get().then(doc => {
        this.picture = doc.data().profile;
      });
    });
    jobs.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.client = change.doc.data();
        }
      });
    });
    this.loading = false;
  }
}
</script>
<style scoped>
.centre {
    text-align: center;
    font-weight: bold;
  }
</style>