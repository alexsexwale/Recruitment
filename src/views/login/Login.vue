<template>
  <form @submit.prevent="login" class="md-layout text-center">
    <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
      <login-card header-color="green">
        <h3 slot="title" class="title">Login</h3>
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
            <md-icon class="success" v-show="!errors.has('email') && touched.email">done</md-icon>
          </slide-y-down-transition>
        </md-field>
        
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

        <!-- <md-checkbox v-model="remember" slot="inputs">Keep me logged in</md-checkbox> -->
        
        <button class="md-button md-success md-theme-default" slot="footer">
          <div class="md-ripple">
            <div class="md-button-content">
              Let's go
            </div>
          </div>
        </button>
        <router-link to="/forgot-password" slot="hyperlink">
          Forgot Password?
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
  </form>
</template>
<script>
import { LoginCard, Modal } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
import db from '@/firebase/init';
import firebase from "firebase/app";
export default {
  name: 'login',
  components: {
    LoginCard,
    Modal,
    SlideYDownTransition
  },
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      modal: false,
      remember: null,
      alias: null,
      touched: {
        email: false,
        password: false
      },
      modelValidations: {
        email: {
          required: true,
          email: true
        },
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
    login() {
      let ref = db.collection('users');
      if(this.email && this.password) {
        let auth = firebase.auth();
        auth.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          let userId = auth.currentUser.uid;
            ref.where('userId', '==', userId).get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                this.alias = doc.data().alias;
                if(doc.data().user == "client") {
                  let client = db.collection('clients').doc(this.alias);
                  client.get().then(doc => {
                    if(doc.exists) {
                      this.$router.push({ name: 'client-profile', params: {id: this.alias} });
                    }
                    else {
                      this.$router.push({ name: 'create-client-account' });
                    }
                  });
                }
                else {
                  let student = db.collection('students').doc(this.alias);
                  student.get().then(doc => {
                    if(doc.exists) {
                      this.$router.push({ name: 'student-profile', params: {id: this.alias} });
                    }
                    else {
                      this.$router.push({ name: 'create-student-account' });
                    }
                  });
                }
              });
            })
            .catch(err => {
              this.modal = true;
              this.feedback = err.message
          });
        })
        .catch(err => {
          this.modal = true;
          this.feedback = err.message
        });
      } 
      else {
        this.modal = true;
        this.feedback = 'Please select whether you are a student or a client.'
      }
    }
  },
  watch: {
    email() {
      this.touched.email = true;
    },
    password() {
      this.touched.password = true;
    }
  }
};
</script>

<style>
/* Pop up modal */
.modal-container {
  max-width: 400px;
  z-index: 3;
}
/* color */
.black {
  color: #000000;
}
/* success/error icon */
.md-field .success.md-icon, .md-field .error.md-icon {
  position: inherit;
}
</style>
