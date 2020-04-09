<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <hr>
          <h2 class="centre">Confirm Completion</h2>
        <hr>
        <br>  
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <img class="img" :src="cardUserImage" />
          </div>
          <md-card-content>
            <h6 class="category text-gray">{{ applicant.degree }}</h6>
            <router-link class="card-title" :to="{ name: 'view-student-profile', params: {id: applicant.alias}}"><a>{{ applicant.applicant }}</a></router-link>
            <p class="card-description">
              {{ applicant.bio }}
            </p>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div class="centre">
      <md-button @click="dissatisfied" class="md-danger">
        I'm not satisfied
      </md-button>
        &nbsp;&nbsp;&nbsp;
      <md-button @click="complete" class="md-success">
        Confirm completion
      </md-button>
    </div>
    <!-- Modal: Cancel -->
    <modal v-if="cancelModal" @close="cancelModalHide">
      <template slot="header">
        <h4 class="modal-title black">Cancel Job </h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="cancelModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">Canceling the job would mean that big big problems. I have not thought of the logic yet</p>
      </template>

      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-danger" @click="cancelModalHide">Cancel</md-button>
            &nbsp;&nbsp;&nbsp;
          <md-button class="md-button md-success" @click="cancel()">Yes</md-button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import db from '@/firebase/init';
import moment from "moment";
import { Modal } from "@/components";
export default {
  components: {
    Modal
  },
  data() {
    return {
      cancelModal: false,
      client: {},
      applicant: {}
    }
  },
  props: {
    cardUserImage: {
      type: String,
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  methods: {
    cancelModalHide() {
      this.cancelModal = false;  
    },
    dissatisfied() {
      let job = db.collection('jobs').doc(this.client.id);
      job.update({
        complete: false,
        satisfied: false,
        lastModified: moment(Date.now()).format('L')  
      });
      this.$router.push({ name: 'client-dissatisfied', params: {id: job.id} });
    },
    cancel() {
      let job = db.collection('jobs').doc(this.client.id);
      job.update({
        complete: false,
        lastModified: moment(Date.now()).format('L')  
      });
      this.$router.push({ name: 'client-cancel', params: {id: job.id} });
    },
    complete() {
      let job = db.collection('jobs').doc(this.client.id);
      job.update({
        status: "rate",
        satisfied: true,
        complete: true,
        lastModified: moment(Date.now()).format('L')  
      });
    } 
  },
  created() {
    db.collection('jobs').doc(this.$route.params.id).get().then(doc => {
      this.client = doc.data();
      this.client.id = doc.id;
    });
    
    db.collection('applications').where('jobId', '==', this.$route.params.id).where('status', '==', 'applied').where('approved', '==', false).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.available = true;
        this.applicant = doc.data();
        this.applicant.id = doc.id;
      });
    });  
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