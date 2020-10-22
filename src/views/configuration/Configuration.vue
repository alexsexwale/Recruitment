<template>
       <!-- Email Verified -->
    <div v-if="mode == 'verifyEmail'" class="md-layout text-center">
      <div v-if="loading" class="background"></div>
      <div v-if="loading" class="lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
      <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
        <login-card header-color="green">
          <h3 slot="title" class="title">Email Verified</h3>
          <h4 slot="inputs" class="black">{{ feedback }}</h4> 
          <md-button slot="footer" class="md-button md-success" @click="account">Continue</md-button>
        </login-card>
      </div>
    </div>
    <!-- Reset Password -->
    <form v-else-if="mode == 'resetPassword'" @submit.prevent="reset" class="md-layout text-center">
      <div v-if="loading" class="background"></div>
      <div v-if="loading" class="lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
      <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
        <login-card header-color="green">
          <h3 slot="title" class="title">Reset Password</h3>
          <md-field class="md-form-group" slot="inputs"
            :class="[
                { 'md-valid': !errors.has('password') && touched.password },
                { 'md-form-group': true },
                { 'md-error': errors.has('password') }
              ]">
            <md-icon>lock_outline</md-icon>
            <label>Password</label>
            <md-input v-model="password" data-vv-name="password" name="password" type="password" required v-validate="modelValidations.password"></md-input>
            <slide-y-down-transition>
              <md-icon class="error" v-show="errors.has('password')">close</md-icon>
            </slide-y-down-transition>
            <slide-y-down-transition>
              <md-icon class="success" v-show="!errors.has('password') && touched.password">done</md-icon>
            </slide-y-down-transition>
          </md-field>
          <button class="md-button md-success md-theme-default" slot="footer">
            <div class="md-ripple">
              <div class="md-button-content">
                Save
              </div>
            </div>
          </button>
        </login-card>
      </div>
      <!-- Modal: Error handling -->
      <modal v-if="modal" @close="modalHide">
        <template slot="header">
          <h4 class="modal-title black">Whoa there! ✋</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <p class="black">{{feedback}}</p>
        </template>
        <template slot="footer">
          <div style="text-align:center;">
            <md-button class="md-button md-success" @click="proceed">Got it</md-button>
          </div>
        </template>
      </modal>
      <!-- Modal: Success Message -->
      <modal v-if="resetModal">
        <template slot="header">
          <h4 class="modal-title black">Password Reset!</h4>
        </template>
        <template slot="body">
          <p class="black">Your password has been reset.</p>
        </template>
        <template slot="footer">
          <div style="text-align:center;">
            <md-button class="md-button md-success" @click="proceed">Got it</md-button>
          </div>
        </template>
      </modal>
    </form>
    <!-- Empty Card -->
    <div v-else class="md-layout text-center">
      <div v-if="loading" class="background"></div>
      <div v-if="loading" class="lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
      <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
        <login-card header-color="green">
          <h3 slot="title" class="title">Configuration</h3>
          <h4 slot="inputs" class="black">Theres is no information to display.</h4>
          <md-button slot="footer" class="md-button md-success" @click="proceed">Continue</md-button>
        </login-card>
      </div>
    </div>
</template>
<script>
import { LoginCard, Modal } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
import db from '@/firebase/init';
import firebase from "firebase/app";
export default {
  name: 'reset-password',
  components: {
    LoginCard,
    Modal,
    SlideYDownTransition
  },
  data() {
    return {
      clientAccount: false,
      studentAccount: false,
      user: null,
      password: null,
      mode: null,
      code: null,
      feedback: null,
      modal: false,
      resetModal: false,
      loading: true,
      touched: {
        password: false
      },
      modelValidations: {
        password: {
          required: true,
          min: 6
        }
      }
    };
  },
  methods: {
    modalHide() {
      this.modal = false;
    },
    proceed() {
      this.$router.push({ name: 'Login'});
    },
    reset() {
      this.loading = true;
      firebase.auth().confirmPasswordReset(this.code, this.password)
       .then(() => {
         this.loading = false;
        this.resetModal = true;
       })
       .catch(err => {
          // Handle Errors here.
          this.loading = false;
          this.modal = true;
          this.feedback = err.message;
      });
    },
    verifyEmail() {
      this.loading = true;
      firebase.auth().applyActionCode(this.code)
      .then(() => {
        this.loading = false;
        var user = firebase.auth().currentUser;
        if(user) {
          this.feedback = "Your email account has been Verified.";
        }
        else {
          this.feedback = "Your email account has been Verified. Login to continue creating your account.";
        }
      })
      .catch(err => {
        this.loading = false;
        this.feedback = err.message;
      });
    },
    account() {
      this.loading = true;
      var user = firebase.auth().currentUser;
      if(user) {
        db.collection('users').where('userId', '==', user.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if(doc.data().user === "client") {
              this.$router.push({ name: "create-client-account" });
            }
            else {
              this.$router.push({ name: "create-student-account" });
            }
          });
        });
      }
      else {
        this.$router.push({ name: "Login" });
      }
      
      this.loading = false;
    }
  },
  watch: {
    password() {
      this.touched.password = true;
    }
  },
  created() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    this.mode = url.searchParams.get("mode");
    this.code = url.searchParams.get("oobCode");
    if(this.mode === 'verifyEmail') { this.verifyEmail(); }
    if(this.mode !== 'verifyEmail' && this.mode !== 'resetPassword' ) { this.proceed(); }
    this.loading = false;
  }
};
</script>