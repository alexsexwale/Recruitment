<template>
  <div class="content">
    <div class="md-layout" v-if="availableApplicant">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" v-for="applicant in applicants" :key="applicant.id">
        <user-card button-color="success" v-bind:applicant="applicants.applicant"></user-card>
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
