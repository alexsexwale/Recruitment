<template>
  <div class="content">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <hr><h2 class="centre">Work in Progress!</h2><hr>
    <p class="centre">You are currently working with the student</p>
    <hr>
    <h6 class="centre">Student Information</h6>
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <br>  
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <img v-if="profile" class="img" :src="profile" />
            <img v-else class="img" :src="cardUserImage" />
          </div>
          <md-card-content>
            <h6 class="category text-gray">{{ applicant.degree }}</h6>
            <router-link class="card-title" :to="{ name: 'view-student-profile', params: {id: applicant.alias}}"><a>{{ applicant.applicant }}</a></router-link>
            <p class="card-description">
              {{ applicant.bio }}
            </p>
          </md-card-content>
        </md-card>
        <p style="text-align: center;">Call us at: <b>087 149 4394</b></p>
        <p style="text-align: center;">Email us at: <b><a style="color:blue" href="mailto:contact@jobox.co.za">contact@jobox.co.za</a></b></p>
      </div>
    </div>
    <div class="centre">
      <md-button @click="cancelModal=true;" class="md-danger">
        Cancel Job
      </md-button>
    </div>
    <!-- Modal: Cancel -->
    <modal v-if="cancelModal" @close="cancelModalHide">
      <template slot="header">
        <h4 class="modal-title black">Whoa there! ✋</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="cancelModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">Are you sure you want to abandon the job?</p>
      </template>

      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-danger" @click="cancelModalHide">No</md-button>
            &nbsp;&nbsp;&nbsp;
          <md-button class="md-button md-success" @click="clientCancelActive(job)">Yes</md-button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import db from '@/firebase/init';
import 'firebase/auth';
import 'firebase/firestore';
import { Modal } from "@/components";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Modal
  },
  data() {
    return {
      cancelModal: false,
      applicant: {},
      job: {},
      loading: true,
      profile: null
    }
  },
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  methods: {
    ...mapActions(["clientCancelActive"]),
    cancelModalHide() {
      this.cancelModal = false;
    } 
  },
  created() {
    db.collection('micros').doc(this.$route.params.id).get().then(doc => {
      this.job = doc.data();
    });
    db.collection('applications').where('jobId', '==', this.$route.params.id).where('status', '==', 'applied').where('approved', '==', true).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.available = true;
        this.applicant = doc.data();
        this.applicant.id = doc.id;
        db.collection('students').doc(this.applicant.alias).get().then(doc => {
          this.profile = doc.data().profile;
        });
      });
    });
    this.loading = false;
  }
}
</script>
<style scoped>
.centre {
  text-align: center;
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