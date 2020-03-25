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
          <h6 class="category text-gray">{{ client.companyName }}</h6>
          <h4><router-link class="card-title" :to="{ name: 'view-client-profile', params: {id: client.clientAlias}}"><a>{{ client.clientName }}</a></router-link></h4>
          <p class="card-description">
            {{ client.description }}
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
    let job = db.collection('micros').doc(this.$route.params.id);
    job.get().then(doc => {
      this.client = doc.data();
      this.client.id = doc.id;
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