<template>
  <div class="md-layout">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <div class="md-layout-item md-small-size-100">
      <md-card class="md-card-profile">
        <div class="md-card-avatar">
          <img v-if="profile.profile" class="img" :src="profile.profile" />
          <img v-if="!profile.profile" class="img" :src="cardUserImage" />
        </div>
        <md-card-content>
          <hr v-if="edit">
          <md-button v-if="edit" class="btn-next md-success button" @click="editProfile">Edit Profile</md-button>
          <hr v-if="edit">
          <!-- <p v-if="rating"><b>{{ rating }}</b></p> -->
          <!-- <p v-if="rating" class="card-title"><star-rating :increment="0.01" :rating="rating" :read-only="true" :inline="true" :glow="10" :show-rating="false" class="stars"></star-rating></p> -->
          <h4 v-if="user.name && user.surname" class="card-title"><b>{{ user.name + ' ' + user.surname }}</b></h4>
          <p v-if="profile.degree" class="card-description"><b>Degree: </b> {{ profile.degree }}</p>
          <p v-if="profile.year" class="card-description"><b>Year of Study: </b> {{ profile.year }}</p>
          <p v-if="profile.institution" class="card-description"><b>Institution: </b>{{ profile.institution }}</p>
          <p v-if="profile.graduateStatus" class="card-description"><b>Graduate Status: </b> {{ profile.graduateStatus }}</p>
          <p v-if="profile.bio" class="card-description"><b>About Me: </b>{{ profile.bio }}</p>
          <md-button v-if="profile.portfolio" class="btn-next md-info button" @click="portfolio">View Portfolio</md-button>
          <p v-if="(profile.github && profile.github !== '') || (profile.linkedIn && profile.linkedIn !== '') || (profile.facebook && profile.facebook !== '') || (profile.twitter && profile.twitter !== '') || (profile.instagram && profile.instagram !== '')">
            <md-icon v-if="profile.linkedIn && profile.linkedIn !== ''"><i class="fab fa-linkedin" style="color:#0e76a8; cursor: pointer" @click="linkedin"></i></md-icon>	
            <span v-if="profile.linkedIn && profile.linkedIn !== ''">&nbsp;</span><span v-if="profile.linkedIn && profile.linkedIn !== ''">&nbsp;</span><span v-if="profile.linkedIn && profile.linkedIn !== ''">&nbsp;</span><span v-if="profile.linkedIn && profile.linkedIn !== ''">&nbsp;</span>
            <md-icon v-if="profile.github && profile.github !== ''"><i class="fab fa-github" style="color: #000; cursor: pointer" @click="github"></i></md-icon>
            <span v-if="profile.github && profile.github !== ''">&nbsp;</span><span v-if="profile.github && profile.github !== ''">&nbsp;</span><span v-if="profile.github && profile.github !== ''">&nbsp;</span><span v-if="profile.github && profile.github !== ''">&nbsp;</span>
            <md-icon v-if="profile.facebook && profile.facebook !== ''"><i class="fab fa-facebook" style="color:#3b5998; cursor: pointer" @click="facebook"></i></md-icon>
            <span v-if="profile.facebook && profile.facebook !== ''">&nbsp;</span><span v-if="profile.facebook && profile.facebook !== ''">&nbsp;</span><span v-if="profile.facebook && profile.facebook !== ''">&nbsp;</span><span v-if="profile.facebook && profile.facebook !== ''">&nbsp;</span>
            <md-icon v-if="profile.twitter && profile.twitter !== ''"><i class="fab fa-twitter" style="color:#00acee; cursor: pointer" @click="twitter"></i></md-icon>
            <span v-if="profile.twitter && profile.twitter !== ''">&nbsp;</span><span v-if="profile.twitter && profile.twitter !== ''">&nbsp;</span><span v-if="profile.twitter && profile.twitter !== ''">&nbsp;</span><span v-if="profile.twitter && profile.twitter !== ''">&nbsp;</span>
            <md-icon v-if="profile.instagram && profile.instagram !== ''"><i class="fab fa-instagram" style="color: #d6249f; cursor: pointer" @click="instagram"></i></md-icon>
          </p>
          
          <!-- <el-carousel trigger="click" :interval="5000">
            <el-carousel-item>
              <testimonial-card card-plain>
                <div slot="cardAvatarTop" class="md-card-avatar mt-0">
                  <a href="javascript:void(0)">
                    <img class="img" :src="sectionTestimonials2.testimonials1">
                  </a>
                </div>
                <template slot="cardContent">
                  <h5 class="card-description">
                    "I speak yell scream directly at the old guard on behalf
                    of the future. I gotta say at that time I’d like to meet
                    Kanye I speak yell scream directly at the old guard on
                    behalf of the future. My brother Chance!!! <br>Thank you
                    for letting me work on this masterpiece. One of my
                    favorite people."
                  </h5>
                  <h4 class="card-title">Kendall Thompson</h4>
                  <h6 class="card-category text-muted">CEO @ Marketing Digital Ltd.</h6>
                </template>
                <template slot="cardAction">
                  <md-icon class="text-warning">
                    star
                  </md-icon>
                  <md-icon class="text-warning">
                    star
                  </md-icon>
                  <md-icon class="text-warning">
                    star
                  </md-icon>
                  <md-icon class="text-warning">
                    star
                  </md-icon>
                </template>
              </testimonial-card>
            </el-carousel-item>
            <el-carousel-item>
              <testimonial-card card-plain>
                <div slot="cardAvatarTop" class="md-card-avatar mt-0">
                  <a href="javascript:void(0)">
                    <img class="img" :src="sectionTestimonials2.testimonials2">
                  </a>
                </div>
                <template slot="cardContent">
                  <h5 class="card-description">
                    "Thank you Anna for the invite thank you to the whole
                    Vogue team Called I Miss the Old Kanye At the God's last
                    game Chop up the soul Kanye. I promise I will never let
                    the people down. I want a better life for all!!! Pablo
                    Pablo Pablo Pablo! Thank you Anna for the invite thank you
                    to the whole Vogue team."
                  </h5>
                  <h4 class="card-title">Christian Louboutin</h4>
                  <h6 class="card-category text-muted">Designer @ Louboutin &amp; Co.</h6>
                </template>
                <template slot="cardAction">
                  <md-icon class="text-warning">
                    star
                  </md-icon>
                  <md-icon class="text-warning">
                    star
                  </md-icon>
                  <md-icon class="text-warning">
                    star
                  </md-icon>
                  <md-icon class="text-warning">
                    star
                  </md-icon>
                </template>
              </testimonial-card>
            </el-carousel-item>
          </el-carousel> -->
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
import db from '@/firebase/init';
import firebase from 'firebase/app';
import StarRating from 'vue-star-rating';
import { TestimonialCard } from "@/components";
import { Carousel, CarouselItem } from 'element-ui';
export default {
  name: 'client-profile',
  components: { 
      StarRating,
      TestimonialCard,
      Carousel,
      CarouselItem
  },
  data() {
    return {
      profile: [],
      user: [],
      rating: 4.84,
      edit: null,
      loading: true,
      sectionTestimonials2: {
        testimonials1: require("@/assets/img/faces/kendall.jpg"),
        testimonials2: require("@/assets/img/faces/christian.jpg")
      },
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
      this.$router.push({ name: 'edit-student-profile', params: {id: this.$route.params.id} });
    },
    portfolio() {
      window.open(this.profile.portfolio, '_blank');
    },
    linkedin() {
      window.open(this.profile.linkedIn, '_blank');
    },
    github() {
      window.open(this.profile.github, '_blank');
    },
    facebook() {
      window.open(this.profile.facebook, '_blank');
    },
    twitter() {
      window.open(this.profile.twitter, '_blank');
    },
    instagram() {
      window.open(this.profile.instagram, '_blank');
    }
  },
  created() {
    // Note: using alias allows the user to update their url profile name, e.g. profile/peter-parker
    // Note: however it is slower to render onto the page

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
    let auth = null;
    user.get().then(user => {
      this.user = user.data();
      let student = db.collection('students').doc(this.$route.params.id);
      student.get().then(student => {
        this.profile = student.data(); 
      });
      if(firebase.auth().currentUser.uid === this.user.userId)
        this.edit = true;
    });
    this.loading = false;
  }
}
</script>
<style lang="scss">
.mt-0 {
  margin-top: 0 !important;
}
</style>