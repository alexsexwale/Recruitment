<template>
  <div class="content">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <hr><h2 class="centre">Work in Progress!</h2><hr>
    <p class="centre">You are currently working with the client</p>
    <hr>
    <h6 class="centre">Client Information</h6>
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
        <p style="text-align: center;">Call Jobox at: <b>087 149 4394</b></p>
        <p style="text-align: center;">Email Jobox at: <b><a style="color:blue" href="mailto:contact@jobox.co.za">contact@jobox.co.za</a></b></p>
      </div>
    </div>
    <div class="centre">
      <md-button @click="cancelModal=true;" class="md-danger" >
        Cancel Job
      </md-button>
        &nbsp;&nbsp;&nbsp;
      <md-button @click="complete" class="md-success">
        Job Completed
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
          <md-button class="md-button md-success" @click="studentCancelActive(client)">Yes</md-button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import db from '@/firebase/init';
import moment from "moment";
import { Modal } from "@/components";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Modal
  },
  data() {
    return {
      client: {},
      cancelModal: false,
      active: false,
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
    ...mapActions(["studentCancelActive"]),
    cancelModalHide() {
      this.cancelModal = false;
    },
    complete() {
      this.loading = true;
      let completeJob = db.collection('micros').doc(this.client.id);
      completeJob.update({
        status: "complete",
        complete: true,
        lastModified: moment(Date.now()).format('L')  
      });
      this.loading = false;
    }
  },
  created() {
    let job = db.collection('micros').doc(this.$route.params.id);
    job.get().then(doc => {
      this.client = doc.data();
      this.client.id = doc.id;
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