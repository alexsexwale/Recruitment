<template>
<div>
  <hr v-if="approved">
  <h2 class="centre" v-if="approved">Please be patient while waiting for applicant to respond</h2>
  <hr v-if="approved">
  <br v-if="approved">
  <div class="md-layout" v-if="approved">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100" v-for="(applicant, index) in approvedApplicant" :key="index">
      <md-card class="md-card-profile">
        <div class="md-card-avatar">
          <img class="img" :src="cardUserImage" />
        </div>
        <md-card-content>
          <h6 class="category text-gray">CEO / Co-Founder</h6>
          <h4 class="card-title">{{ applicant.applicant }}</h4>
          <p class="card-description">
            Don't be scared of the truth because we need to restart the human
            foundation in truth
          </p>
          <md-button @click="cancelModal=true;" class="md-danger md-round">Cancel</md-button>
        </md-card-content>
      </md-card>
      <!-- Modal: Cancel -->
      <modal v-if="cancelModal" @close="cancelModalHide">
        <template slot="header">
          <h4 class="modal-title black">Cancel Student</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="cancelModalHide">
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
          <p class="black">The student selection is about to undone. Would you like to continue?</p>
        </template>

        <template slot="footer">
          <div style="text-align:center;">
            <md-button class="md-button md-danger" @click="cancelModalHide">Cancel</md-button>
              &nbsp;&nbsp;&nbsp;
            <md-button class="md-button md-success" @click="cancel(applicant.id)">Yes</md-button>
          </div>
        </template>
      </modal>
    </div>
  </div>
  <hr v-if="availableApplicant || !approved">
  <h2 v-if="!approved" class="centre">Select a student</h2>
  <h2 v-else class="centre">Other students who have applied</h2>
  <hr v-if="availableApplicant || !approved">
  <br>
  <div class="md-layout" v-if="availableApplicant">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" v-for="(applicant, index) in applicants" :key="index">
      <md-card class="md-card-profile">
        <div class="md-card-avatar">
          <img class="img" :src="cardUserImage" />
        </div>
        <md-card-content>
          <h6 class="category text-gray">CEO / Co-Founder</h6>
          <h4 class="card-title">{{ applicant.applicant }}</h4>
          <p class="card-description">
            Don't be scared of the truth because we need to restart the human
            foundation in truth
          </p>
          <md-button @click="select(applicant.id)" class="md-success md-round">Select</md-button>
          &nbsp;&nbsp;&nbsp;
          <md-button @click="declineModal=true;" class="md-danger md-round">Decline</md-button>
        </md-card-content>
      </md-card>
      <!-- Modal: Decline -->
      <modal v-if="declineModal" @close="declineModalHide">
        <template slot="header">
          <h4 class="modal-title black">Decline Student</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="declineModalHide">
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
          <p class="black">The student will be removed from the list of applicants. Would you like to continue?</p>
        </template>

        <template slot="footer">
          <div style="text-align:center;">
            <md-button class="md-button md-danger" @click="declineModalHide">Cancel</md-button>
              &nbsp;&nbsp;&nbsp;
            <md-button class="md-button md-success" @click="decline(applicant.id)">Yes</md-button>
          </div>
        </template>
      </modal>
      <!-- Modal: Cannot select -->
      <modal v-if="noSelectModal" @close="noSelectModalHide">
        <template slot="header">
          <h4 class="modal-title black">Cannot select {{ applicant.applicant }}</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="noSelectModalHide">
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
          <p class="black">You have already selected a student. You will have to cancel the student you have approved in order to select {{ applicant.applicant }}</p>
        </template>

        <template slot="footer">
          <div class="centre">
            <md-button class="md-button md-success" @click="noSelectModalHide">Got it</md-button>
          </div>
        </template>
      </modal>
    </div>
  </div>
  <div v-if="!availableApplicant && !approved">
    <br/><br/>
    <h2 class="black centre">Be patient, students will start applying soon</h2>
  </div>
</div>
</template>
<script>
import db from '@/firebase/init';
import { Modal } from "@/components";
export default {
  components: {
    Modal
  },
  data() {
    return {
      applicants: [],
      approvedApplicant: [],
      availableApplicant : false,
      approved: false,
      selected: false,
      cancelApplicant: false,
      approvedModal: false,
      declineModal: false,
      cancelModal: false,
      noSelectModal: false,
      index: null
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
    declineModalHide() {
      this.declineModal = false;
    },
    cancelModalHide() {
      this.cancelModal = false;  
    },
    noSelectModalHide() {
      this.noSelectModal = false;
    },
    select(id) {
      if(this.approved) {
        this.noSelectModal = true;
      }
      else {
        this.selected = true;
        let applicants = db.collection('applications').doc(id);
        applicants.update({
          approved: true
        });
      }
    },
    decline(id) {
      let applicants = db.collection('applications').doc(id);
      applicants.update({
        status: "declined"
      });
      this.declineModal = false;
    },
    cancel(id) {
      this.cancelApplicant = true;
      let applicants = db.collection('applications').doc(id);
      applicants.update({
        approved: false
      });
      this.cancelModal = false;
    },
    profile() {

    }
  },
  created() {
    let applicants = db.collection('applications');
    applicants.where('jobId', '==', this.$route.params.id).where('status', '==', 'applied').where('approved', '==', false).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.availableApplicant = true;
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
          applicant.id = change.doc.id;
          if(this.selected) {
            this.index = change.newIndex;
            this.applicants.splice(this.index, 1);
            this.approvedApplicant.push(applicant); 
            this.approved = true;
            this.selected = false;
          }

          if(this.cancelApplicant) {
            console.log(this.index)
            this.approvedApplicant.splice(this.index, 1);
            this.applicants.splice(this.index, 0, applicant);
            // this.applicants.push(applicant);
            this.approved = false;
            this.cancelApplicant = false;
          }
        }
      });
    });
  }   
}
</script>
<style scoped>
.centre {
  text-align: center;
}
</style>