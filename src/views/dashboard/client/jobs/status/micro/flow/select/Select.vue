<template>
<div>
  <div v-if="loading" class="background"></div>
  <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
  <hr><h2 class="centre"><b>Select a Student</b></h2>
  <hr v-if="approved">
  <p class="centre" v-if="approved">You have chosen a student, please be patient while we wait for them to respond</p>
  <hr v-if="approved">
  <br v-if="approved">
  <div class="md-layout" v-if="approved">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100" v-for="(applicant, index) in approvedApplicant" :key="index">
      <md-card class="md-card-profile">
        <div class="md-card-avatar">
          <img class="img" :src="cardUserImage" />
        </div>
        <md-card-content>
          <h6 class="category text-gray">{{ applicant.degree }}</h6>
          <router-link class="card-title" :to="{ name: 'view-student-profile', params: {id: applicant.applicantAlias}}"><a>{{ applicant.applicant }}</a></router-link>
          <p class="card-description">
            {{ applicant.bio }}
          </p>
          <md-button @click="cancelModal=true;" class="md-danger md-round">Withdraw Selection</md-button>
        </md-card-content>
      </md-card>
      <!-- Modal: Cancel -->
      <modal v-if="cancelModal" @close="cancelModalHide">
        <template slot="header">
          <h4 class="modal-title black">Whoa there! 🤚</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="cancelModalHide">
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
          <p class="black">You are about to withdraw the selection of the student. Are you sure you want to continue with this?</p>
        </template>

        <template slot="footer">
          <div style="text-align:center;">
            <md-button class="md-button md-danger" @click="cancelModalHide">No</md-button>
              &nbsp;&nbsp;&nbsp;
            <md-button class="md-button md-success" @click="cancel(applicant.id)">Yes</md-button>
          </div>
        </template>
      </modal>
    </div>
  </div>
  <hr v-if="available || !approved">
  <p v-if="approved" class="centre">Other students who have applied</p>
  <hr v-if="available || !approved">
  <br>
  <div class="md-layout" v-if="available">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" v-for="(applicant, index) in applicants" :key="index">
      <md-card class="md-card-profile">
        <div class="md-card-avatar">
          <img class="img" :src="cardUserImage" />
        </div>
        <md-card-content>
          <h6 class="category text-gray"> {{ applicant.degree }}</h6>
          <md-button class="md-button md-success" @click="profile(applicant.alias)">{{ applicant.applicant }}</md-button>
          <!-- <router-link class="card-title" :to="{ name: 'view-student-profile', params: {id: applicant.alias}}"><a>{{ applicant.applicant }}</a></router-link> -->
          <p class="card-description">
            {{ applicant.bio }}
          </p>
          <md-button @click="select(applicant.id)" class="md-success md-round">Select</md-button>
        </md-card-content>
      </md-card>
      
      <!-- Modal: Cannot select -->
      <modal v-if="noSelectModal" @close="noSelectModalHide">
        <template slot="header">
          <h4 class="modal-title black">Cannot select {{ applicant.applicant }}</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="noSelectModalHide">
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
          <p class="black">You have already selected a student. You will have to decline the student you have approved in order to select {{ applicant.applicant }}</p>
        </template>

        <template slot="footer">
          <div class="centre">
            <md-button class="md-button md-success" @click="noSelectModalHide">Got it</md-button>
          </div>
        </template>
      </modal>
    </div>
  </div>
  <div v-if="!available && !approved">
    <br/><br/>
    <h2 class="black centre">{{ feedback }}</h2>
  </div>
  <!-- Modal:  -->
  <modal v-if="noPaymentModal" @close="noPaymentModalHide">
    <template slot="header">
      <h4 class="modal-title black">Payment has not been made</h4>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="noPaymentModalHide">
        <md-icon>clear</md-icon>
      </md-button>
    </template>

    <template slot="body">
      <p class="black">Please make the upfront payment before selecting a student.</p>
    </template>

    <template slot="footer">
      <div class="centre">
        <md-button class="md-button md-success" @click="noPaymentModalHide">Got it</md-button>
      </div>
    </template>
  </modal>
  <!-- View Profile:  -->
  <modal v-if="profileModal" @close="profileModalHide">
    <template slot="header">
      <h4 class="modal-title black">{{ profile.name }}</h4>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="noPaymentModalHide">
        <md-icon>clear</md-icon>
      </md-button>
    </template>

    <template slot="body">
      <p class="black">Please make the upfront payment before selecting a student.</p>
    </template>

    <template slot="footer">
      <div class="centre">
        <md-button class="md-button md-success" @click="profileModalHide">Got it</md-button>
      </div>
    </template>
  </modal>
</div>
</template>
<script>
import db from '@/firebase/init';
import { Modal } from "@/components";
import { debounce } from "debounce";
export default {
  components: {
    Modal
  },
  data() {
    return {
      applicants: [],
      approvedApplicant: [],
      available : false,
      approved: false,
      selected: false,
      cancelApplicant: false,
      approvedModal: false,
      cancelModal: false,
      noSelectModal: false,
      noPaymentModal: false,
      profileModal: true,
      profile: {},
      paid: false,
      index: null,
      loading: true,
      feedback: "Please be patient, students will start applying soon"
    };
  },
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  methods: {
    approvedModalHide() {
      this.approvedModal = false;  
    },
    cancelModalHide() {
      this.cancelModal = false;  
    },
    noSelectModalHide() {
      this.noSelectModal = false;
    },
    noPaymentModalHide() {
      this.noPaymentModal = false;
    },
    profileModalHide() {
      this.profileModal = false;
    },
    async reload() {
      location.reload();
    },
    debouncedReload: debounce(function() {
      this.reload();
    }, 1500),
    profile(alias) {
      this.loading = true;
      db.collection('students').doc(alias).get().then(doc => {
        this.profile = doc.data();
        this.profileModal = true;
        this.loading = false;
      });
    },
    select(id) {
      if(this.approved) {
        this.noSelectModal = true;
      }
      else if(this.paid === false) {
        this.noPaymentModal = true;
      }
      else {
        this.loading = true
        this.selected = true;
        let applicants = db.collection('applications').doc(id);
        applicants.update({
          approved: true
        });
        this.debouncedReload();
      }
    },
    cancel(id) { //decline
      this.loading = true;
      this.cancelApplicant = true;
      let applicants = db.collection('applications').doc(id);
      applicants.update({
        approved: false
      });
      this.cancelModal = false;
      this.debouncedReload();
    }
  },
  created() {
    let applicants = db.collection('applications');
    applicants.where('jobId', '==', this.$route.params.id).where('status', '==', 'applied').where('approved', '==', false).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.available = true;
        let applicant = doc.data();
        applicant.id = doc.id;
        this.applicants.push(applicant);
      });
    });
    applicants.where('jobId', '==', this.$route.params.id).where('status', '==', 'applied').where('approved', '==', true).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.approved = true;
        let applicant = doc.data();
        applicant.id = doc.id;
        this.approvedApplicant.push(applicant);
      });
    });
    applicants.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          let applicant = change.doc.data();
          if(this.selected) {
            this.available = false;
            this.approved = false;
            this.feedback = "Selecting " + applicant.applicant;
          }
          if(this.cancelApplicant) {
            this.available = false;
            this.approved = false;
            this.feedback = "Cancelling " + applicant.applicant;
          }
        }
      });
    });

    let payment = db.collection('payments');
    payment.where('jobId', '==', this.$route.params.id).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.paid = doc.data().inboundPayment;
      });
    });
    payment.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.paid = change.doc.data().inboundPayment;
        }
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
</style>