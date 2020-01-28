<template>
  <div class="content">
    <div class="md-layout" v-if="availableApplicant">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" v-for="(applicant, index) in applicants" :key="index">
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <img class="img" :src="cardUserImage" />
          </div>
          <md-card-content>
            <h6 class="category text-gray">CEO / Co-Founder</h6>
            <h4 class="card-title">{{ applicant.applicant }}</h4>
            <p class="card-description">
              Don't be scared of the truth because we need to restart the human
              foundation in truth
            </p>
            <md-button @click="select" class="md-success md-round">Select</md-button>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div v-else>
      <br/><br/>
      <h2 class="black" style="text-align:center">Be patient, students will start applying soon</h2>
    </div>
  </div>
</template>
<script>
import UserCard from "./userCard/UserCard.vue";
import db from '@/firebase/init';
export default {
  components: {
    UserCard
  },
  data() {
    return {
      applicants: [],
      availableApplicant : false
    };
  },
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  methods: {
    select() {
      
    }

  },
  created() {
    let applicants = db.collection('applications');
    applicants.where('jobId', '==', this.$route.params.id).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.availableApplicant = true;
        let applicant = doc.data();
        applicant.id = doc.id;
        this.applicants.push(applicant);
      })
    })
  }
};
</script>
<style>

</style>
