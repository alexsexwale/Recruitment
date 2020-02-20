<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <hr>
        <h2 class="centre">Active Job</h2>
        <hr>
        <br>  
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <img class="img" :src="cardUserImage" />
          </div>
          <md-card-content>
          <h6 class="category text-gray">CEO / Co-Founder</h6>
          <!-- <h4 class="card-title">{{ applicant.applicant }}</h4> -->
          <p class="card-description">
            Don't be scared of the truth because we need to restart the human
            foundation in truth
          </p>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div class="centre">
      <md-button @click="cancelModal=true;" class="md-danger">
        Cancel
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
import { Modal } from "@/components";
export default {
  components: {
    Modal
  },
  data() {
    return {
      cancelModal: false
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
    cancel(id) {
    //   this.cancelApplicant = true;
    //   let applicants = db.collection('applications').doc(id);
    //   applicants.update({
    //     approved: false
    //   });
    //   db.collection('jobs').doc(id).update({
    //     status: "select"  
    //   });
    //   this.cancelModal = false;
    }  
  },
  created() {
    
  }
}
</script>
<style scoped>
.centre {
  text-align: center;
}
</style>