<template>
  <form @submit.prevent="forgot" class="md-layout text-center">
    <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
      <login-card header-color="green">
        <h3 slot="title" class="title">Forgot Password</h3>
        <md-field class="md-form-group" slot="inputs"
          :class="[
              { 'md-valid': !errors.has('email') && touched.email },
              { 'md-form-group': true },
              { 'md-error': errors.has('email') }
            ]">
          <md-icon>email</md-icon>
          <label>Email</label>
          <md-input v-model="email" type="email" data-vv-name="email" name="email" required v-validate="modelValidations.email"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('email')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('email') && touched.password">done</md-icon>
          </slide-y-down-transition>
        </md-field>
        <button class="md-button md-success md-theme-default" slot="footer">
          <div class="md-ripple">
            <div class="md-button-content">
              Reset
            </div>
          </div>
        </button>
        <router-link to="/login" slot="hyperlink">
          Back to Login
        </router-link>
      </login-card>
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
        <p class="black">{{feedback}}</p>
      </template>
      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-success" @click="modalHide">Got it</md-button>
        </div>
      </template>
    </modal>
    <!-- Modal: Success Message -->
    <modal v-if="sentModal">
      <template slot="header">
        <h4 class="modal-title black">Email Sent!</h4>
      </template>
      <template slot="body">
        <p class="black">Go ahead and check your inbox to reset your password.</p>
      </template>
      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-success" @click="sent">Got it</md-button>
        </div>
      </template>
    </modal>
  </form>
</template>
<script>
import { LoginCard, Modal } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
import db from '@/firebase/init';
import firebase from "firebase/app";
export default {
  name: 'forgot-password',
  components: {
    LoginCard,
    Modal,
    SlideYDownTransition
  },
  data() {
    return {
      email: null,
      feedback: null,
      modal: false,
      sentModal: false,
      touched: {
        email: false
      },
      modelValidations: {
        email: {
          required: true,
          email: true
        }
      }
    };
  },
  methods: {
    modalHide() {
      this.modal = false;
    },
    sent() {
      this.$router.push({ name: 'login'});
    },
    forgot() {
      firebase.auth().sendPasswordResetEmail(this.email)
       .then(() =>{
        this.sentModal = true;
       })
       .catch(err => {
          // Handle Errors here.
          this.modal = true;
          this.feedback = err.message;
      });

    }
  },
  watch: {
    email() {
      this.touched.email = true;
    }
  }
};
</script>

<style>
.modal-container {
  max-width: 400px;
  z-index: 3;
}
.black {
  color: #000000;
}
</style>
