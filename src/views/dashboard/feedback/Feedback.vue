<template>
  <form @submit.prevent="feedback({subject, message})" class="md-layout">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <div class="md-layout-item md-small-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>mail_outline</md-icon>
          </div>
          <h4 class="title">Give Us Feedback</h4>
        </md-card-header>
        <md-card-content>
            <h4>Pop us a message</h4>
          <md-field>
            <label for="select">What would you like to discuss?</label>
              <md-select required v-model="subject" name="subject">
                  <md-option v-for="(subject, index) in subjects" :key="index" :value="subject">{{subject}}</md-option>
              </md-select>
          </md-field>
          <md-field>
            <label>Tell us more</label>
            <md-textarea required v-model="message" type="text"></md-textarea>
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
    <!-- Modal -->
    <modal v-if="modal" @close="modalHide">
      <template slot="header">
        <h4 v-if="success" class="modal-title black">Feedback Sent! 🎉</h4>
        <h4 v-if="error" class="modal-title black">Whoa there! ✋</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <p v-if="success" class="black">We appreciate your feedback. Keep telling your friends about us</p>
        <p v-if="error" class="black">Please let us know what you would like to discuss before you send us your feedback.</p>
      </template>
      <template slot="footer">
        <div style="text-align:center;">
          <md-button v-if="success" class="md-button md-success" @click="submit">Great!</md-button>
          <md-button v-if="error" class="md-button md-success" @click="modalHide">Got it</md-button>
        </div>
      </template>
    </modal>
  </form>
</template>
<script>
import db from "@/firebase/init";
import 'firebase/auth';
import 'firebase/firestore';
import { Modal } from "@/components";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { Modal },
  data() {
    return {
      subjects:[],
      subject: "",
      message: ""
    };
  },
  computed: {
    ...mapGetters({
      modal: 'modalFeedback',
      loading: "loadingFeedback",
      success: "successFeedback",
      error: "errorFeedback"
    })
  },
  methods: {
    ...mapActions(["feedback", "modalHide"]),
    
    submit() {
      this.message = "";
      this.modalHide();
    }
  },
  created() {
    let settings = db.collection('Settings').doc('Drop-down Lists');
    settings.get().then(doc => {
      this.subjects = doc.data().FeedbackSubjects;
    });
  }
};
</script>
<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}
</style>