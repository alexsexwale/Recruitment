<template>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-100">
      <md-card class="md-card-profile">
        <div class="md-card-avatar">
          <img class="img" :src="cardUserImage" />
        </div>
        <md-card-content>
          <h6 v-if="profile.companyName" class="category text-gray">{{ profile.companyName }}</h6>
          <h4 class="card-title">{{ user.name + ' ' + user.surname }}</h4>
          <p v-if="profile.website" class="card-description"><b>Website: </b> {{ profile.website }}</p>
          <p v-if="profile.industry" class="card-description"><b>Industry: </b>{{ profile.industry }}</p>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
import db from '@/firebase/init';
export default {
    data() {
      return {
        profile: [],
        user: [] 
      }
    },
    props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  created() {
      // let user = db.collection('users').where('alias', '==', this.$route.params.id);
      // user.get().then(snapshot => {
      //   snapshot.forEach(doc => {
      //     this.profile = doc.data();

      //     let client = db.collection('clients').where('userId', '==', this.profile.userId )
      //   });
      // });
      let user = db.collection('users');
      user.doc(this.$route.params.id).get()
      .then(user => {
          this.user = user.data();
      });

      let client = db.collection('clients');
      client.doc(this.$route.params.id).get()
      .then(client => {
        this.profile = client.data(); 
      });
  }
}
</script>