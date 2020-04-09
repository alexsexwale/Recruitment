<template>
  <div class="content">
    <hr>
      <h2 class="centre">Currently Active</h2>
    <hr>
    <br>
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <img class="img" :src="cardUserImage" />
          </div>
          <md-card-content>
          <h6 class="category text-gray">{{ client.companyName }}</h6>
          <h4><router-link class="card-title" :to="{ name: 'view-client-profile', params: {id: client.clientAlias}}"><a>{{ client.clientName }}</a></router-link></h4>
          <p class="card-description">
            {{ client.description }}
          </p>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div class="centre">
      <md-button @click="cancelModal=true;" class="md-danger" >
        Cancel
      </md-button>
        &nbsp;&nbsp;&nbsp;
      <md-button @click="complete" class="md-success">
        Complete
      </md-button>
    </div>

    <!-- Modal: Cancel -->
    <modal v-if="cancelModal" @close="cancelModalHide">
      <template slot="header">
        <h4 class="modal-title black">Cancel job</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="cancelModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">Are you you sure you want to cancel the job?</p>
      </template>

      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-danger" @click="cancelModalHide">Cancel</md-button>
            &nbsp;&nbsp;&nbsp;
          <md-button class="md-button md-success" @click="cancel">Yes</md-button>
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
      client: {},
      cancelModal: false,
      active: false
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
    complete() {
      let completeJob = db.collection('micros').doc(this.client.id);
      completeJob.update({
        status: "complete",
        complete: true,
        lastModified: moment(Date.now()).format('L')  
      });
    },
    cancel() {

    }
  },
  created() {
    let job = db.collection('micros').doc(this.$route.params.id);
    job.get().then(doc => {
      this.client = doc.data();
      this.client.id = doc.id;
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