<template>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-100">
      <md-card class="md-card-profile">
        <div class="md-card-avatar">
          <img class="img" :src="cardUserImage" />
        </div>
        <md-card-content>
          <p class="card-title"><star-rating :increment="0.01" :rating="4.84" :read-only="true" :inline="true" class="stars"></star-rating></p>
          <h4 class="card-title">{{ user.name + ' ' + user.surname }}</h4>
          <p v-if="profile.degree" class="card-description"><b>Degree: </b> {{ profile.degree }}</p>
          <p v-if="profile.year" class="card-description"><b>Year of Study: </b> {{ profile.year }}</p>
          <p v-if="profile.institution" class="card-description"><b>Institution: </b>{{ profile.institution }}</p>
          <p v-if="profile.graduateStatus" class="card-description"><b>Graduate Status: </b> {{ profile.graduateStatus }}</p>
          <p v-if="profile.aboutMe" class="card-description"><b>About Me: </b>{{ profile.aboutMe }}</p>
          
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
import db from '@/firebase/init';
import StarRating from 'vue-star-rating';
export default {
    components: { 
        StarRating 
    },
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

    // Note: using alias allows the user to update their url profile name, e.g. profile/peter-parker
    // Note: slower to render onto the page

    //   let user = db.collection('users').where('alias', '==', this.$route.params.id);
    //   user.get().then(snapshot => {
    //     snapshot.forEach(doc => {
    //       this.user = doc.data();

    //       let student = db.collection('students').where('userId', '==', this.user.userId )
    //       student.get().then(snapshot => {
    //         snapshot.forEach(doc => {
    //           this.profile = doc.data();
    //         });
    //       });
    //     });
    //   });

    // Note: checking document id's for the data
    let user = db.collection('users').doc(this.$route.params.id);
    user.get().then(user => {
        this.user = user.data();
    });

    let student = db.collection('students').doc(this.$route.params.id);
    student.get().then(student => {
    this.profile = student.data(); 
    });
  }
}
</script>