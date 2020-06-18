<template>
  <div class="md-layout">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <div class="md-layout-item md-small-size-100">
      <md-card class="md-card-profile">
        <div class="md-card-avatar">
          <img class="img" :src="cardUserImage" />
        </div>
        <md-card-content>
          <hr v-if="edit">
          <md-button v-if="edit" class="btn-next md-success button" @click="editProfile">Edit</md-button>
          <hr v-if="edit">
          <!-- <p v-if="rating"><b>{{ rating }}</b></p> -->
          <p v-if="rating" class="card-title"><star-rating :increment="0.01" :rating="rating" :read-only="true" :inline="true" :glow="10" :show-rating="false" class="stars"></star-rating></p>
          <h4 v-if="user.name && user.surname" class="card-title">{{ user.name + ' ' + user.surname }}</h4>
          <p v-if="profile.companyName" class="card-description"><b>Company Name: </b> {{ profile.companyName }}</p>
          <p v-if="profile.website" class="card-description"><b>Website: </b> {{ profile.website }}</p>
          <p v-if="profile.industry" class="card-description"><b>Industry: </b>{{ profile.industry }}</p>
          <p v-if="profile.bio" class="card-description"><b>About Me: </b>{{ profile.bio }}</p>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app';
import db from '@/firebase/init';
import StarRating from 'vue-star-rating';
export default {
  components: { 
    StarRating 
  },
  data() {
    return {
      profile: [],
      user: [],
      rating: 4.84,
      edit: null,
      loading: true 
    }
  },
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  methods: {
    editProfile() {
      this.loading = true;
      this.$router.push({ name: 'edit-client-profile', params: {id: this.$route.params.id} });
      this.loading = false;
    }
  },
  created() {
    // Note: using alias allows the user to update their url profile name, e.g. profile/peter-parker
    // Note: however it is slower to render onto the page

    // let user = db.collection('users').where('alias', '==', this.$route.params.id);
    // user.get().then(snapshot => {
    //   snapshot.forEach(doc => {
    //     this.profile = doc.data();

    //     let client = db.collection('clients').where('userId', '==', this.profile.userId )
    //   });
    // });
    let user = db.collection('users').doc(this.$route.params.id);
    let auth = null;
    user.get().then(user => {
        this.user = user.data();
        auth = firebase.auth().currentUser.uid;
        if(auth == this.user.userId)
          this.edit = true;
    });

    let client = db.collection('clients');
    client.doc(this.$route.params.id).get()
    .then(client => {
      this.profile = client.data(); 
    });
    this.loading = false;
  }
}
</script>
