<template>
  <div class="content">
    <hr/>
    <p class="centre">Waiting for the client to confirm the completion of the job.</p>
    <hr/>
    <h6 class="centre">Client Information</h6>
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <img class="img" :src="cardUserImage" />
          </div>
          <md-card-content>
          <h6 class="category text-gray">CEO / Co-Founder</h6>
          <h4 class="card-title">{{ client.clientName }}</h4>
          <p class="card-description">
            Don't be scared of the truth because we need to restart the human
            foundation in truth
          </p>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
import db from '@/firebase/init';
export default {
  data() {
    return {
      client: {}  
    }  
  },
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  created() {
    let job = db.collection('jobs').where('jobId', '==', this.$route.params.id);
    job.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.client = doc.data();
        this.client.id = doc.id;
      });  
    });  
  }  
}
</script>
<style scoped>
.centre {
  text-align: center;
  font-weight: bold;
}
</style>