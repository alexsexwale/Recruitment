<template>
  <form @submit.prevent="feedback" class="md-layout">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <div class="md-layout-item md-small-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>mail_outline</md-icon>
          </div>
          <h4 class="title">Give Feedback</h4>
        </md-card-header>

        <md-card-content>
            <h4>Pop us a message</h4>
          <md-field>
              <label for="select">What is your message about?</label>
                <md-select v-model="subject" name="subject">
                    <md-option v-for="(subject, index) in subjects" :key="index" :value="subject">{{subject}}</md-option>
                </md-select>
          </md-field>
          <md-field>
            <label>Tell us more</label>
            <md-textarea v-model="message" type="text"></md-textarea>
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
        <p class="black">{{error}}</p>
      </template>

      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-success" @click="modalHide">Got it</md-button>
        </div>
      </template>
    </modal>
    <!-- Modal: Success -->
    <modal v-if="successModal" @close="successModalHide">
      <template slot="header">
        <h4 class="modal-title black">Feedback Sent!</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="successModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">{{success}}</p>
      </template>

      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-success" @click="successModalHide">Got it</md-button>
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
      subject: null,
      message: null,
      modal: false,
      successModal: false,
      success: "We appreciate your feedback. We will continue to make improvements on the platform.",
      error: null,
      subjects:[],
      loading: true
    };
  },
  methods: {
    modalHide() {
      this.modal = false;
    },
    successModalHide() {
      this.successModal = false;
    },
    feedback() {
      this.loading = true;
      if(this.subject && this.message) {
        let user = firebase.auth().currentUser;
        let feedback = db.collection('feedback');
        feedback.add({
          userId: user.uid,
          created: moment(Date.now()).format('L'),
          subject: this.subject,
          message: this.message
        });
        this.subject = null;
        this.message = null;
        this.successModal = true;
        this.loading = false;
      } else {
        this.modal = true;
        this.error = "Please complete all fields before sending feedback.";
        this.loading = false;
      }
    }
  },
  created() {
    let settings = db.collection('Settings').doc('Drop-down Lists');
    settings.get().then(doc => {
      this.subjects = doc.data().FeedbackSubjects;
    });
    this.loading = false;
  }
};
</script>
<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}
</style>
