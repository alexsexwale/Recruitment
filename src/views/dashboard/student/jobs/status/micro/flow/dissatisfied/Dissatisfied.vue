<template>
  <div class="content">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <hr><h2 class="centre">Currently Investigating</h2>
    <hr>
    <p class="centre">The client has expressed that they are dissatisfied with the job.</p>
    <p class="centre">We will contact you shortly.</p>
    
    <hr>
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
          <p class="card-description">{{ client.description }}</p>
          </md-card-content>
        </md-card>
        <p style="text-align: center;">Call Jobox at: <b>087 149 4394</b></p>
        <p style="text-align: center;">Email Jobox at: <b><a style="color:blue" href="mailto:contact@jobox.co.za">contact@jobox.co.za</a></b></p>
      </div>
    </div>
  </div>
</template>
<script>
import db from '@/firebase/init';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
export default {
  data() {
    return {
      client: {},
      loading: true  
    }  
  },
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  created() {
    let job = db.collection('micros').doc(this.$route.params.id).get().then(doc => {
      this.client = doc.data();
      this.client.id = doc.id;
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
.md-layout, .md-layout-item {
    width: 40%;
    margin: auto;
}
/* Mobile View */
@media only screen and (max-width: 768px) {
  .md-layout, .md-layout-item {
    width: 100%;
    margin: auto;
  }
}
</style>