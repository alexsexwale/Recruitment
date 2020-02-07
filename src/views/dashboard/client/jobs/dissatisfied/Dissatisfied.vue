<template>
  <form @submit.prevent="dissatified" class="md-layout">
    <div class="md-layout-item md-small-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>mail_outline</md-icon>
          </div>
          <h4 class="title">Dissatified</h4>
        </md-card-header>

        <md-card-content>
          <h4>We are sad to hear that you are dissatified with the job. We will be able to reach out within in 24 hours after completing the form below.</h4>
          <md-field>
              <label for="select">Let us know what your issue is?</label>
                <md-select v-model="reason" name="select">
                    <md-option value="Reason 1">Reason 1</md-option>
                    <md-option value="Reason 2">Reason 2</md-option>
                    <md-option value="Reason 3">Reason 3</md-option>
                    <md-option value="Reason 4">Reason 4</md-option>
                </md-select>
          </md-field>
          <md-field>
            <label>Please give a full description as to why you are dissatified</label>
            <md-textarea v-model="description" type="text"></md-textarea>
          </md-field>
        </md-card-content>

        <md-card-actions md-alignment="left">
          <button class="md-button md-success md-theme-default">
            <div class="md-ripple">
              <div class="md-button-content">
                Submit
              </div>
            </div>
          </button>
        </md-card-actions>
      </md-card>
    </div>
    <!-- Modal: Error handling -->
    <modal v-if="modal" @close="modalHide">
      <template slot="header">
        <h4 class="modal-title black">Oops!</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">Please complete all fields so that we examine the problem before we contact you.</p>
      </template>

      <template slot="footer">
        <div class="centre">
          <md-button class="md-button md-success" @click="modalHide">Got it</md-button>
        </div>
      </template>
    </modal>
    <!-- Modal: Success -->
    <modal v-if="successModal" @close="successModalHide">
      <template slot="header">
        <h4 class="modal-title black">Help is on its way!</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="successModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">We appreciate you taking the time to complete the form. As promised we will reach out to you at our earliest convenience.</p>
      </template>

      <template slot="footer">
        <div class="centre">
          <md-button class="md-button md-success" @click="post">Got it</md-button>
        </div>
      </template>
    </modal>
  </form>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase/app";
import moment from "moment";
import { Modal } from "@/components";
export default {
  components: { Modal },
  data() {
    return {
      reason: null,
      description: null,
      modal: false,
      successModal: false,
      error: null
    };
  },
  methods: {
    modalHide() {
      this.modal = false;
    },
    successModalHide() {
      this.successModal = false;
    },
    dissatified() {
      if(this.reason && this.description) {
        let user = firebase.auth().currentUser;
        let dissatified = db.collection('dissatified');
        dissatified.add({
          userId: user.uid,
          jobId: this.$route.params.id,
          created: moment(Date.now()).format('L'),
          reason: this.reason,
          description: this.description
        })
        this.reason = null;
        this.description = null;
        this.successModal = true;
      }
      else {
        this.modal = true;
      }
    },
    post() {
      this.$router.push({ name: 'client-dashboard' });
    }
  }
}
</script>
<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}
.centre {
  text-align: center;  
}
</style>
