<template>
  <form @submit.prevent="createAccount" class="md-layout text-center">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
      <login-card header-color="green">
        <h3 slot="title" class="title">Register</h3>
        <md-radio v-model="userRole" slot="inputs" value="student">Student</md-radio>
        <md-radio v-model="userRole" slot="inputs" value="client">Client</md-radio>
        
        <md-field slot="inputs"
          :class="[
            { 'md-valid': !errors.has('firstName') && touched.firstName },
            { 'md-form-group': true },
            { 'md-error': errors.has('firstName') }
          ]">
          <md-icon>face</md-icon>
          <label>First Name</label>
          <md-input v-model="firstName" type="text" data-vv-name="firstName" name="firstName" required v-validate="modelValidations.firstName"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('firstName')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('firstName') && touched.firstName">done</md-icon>
          </slide-y-down-transition>
        </md-field>
        
        <md-field slot="inputs" :class="[
            { 'md-valid': !errors.has('lastName') && touched.lastName },
            { 'md-form-group': true },
            { 'md-error': errors.has('lastName') }
          ]">
          <md-icon>person</md-icon>
          <label>Last Name</label>
          <md-input v-model="lastName" type="text" data-vv-name="lastName" name="lastName" required v-validate="modelValidations.lastName"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('lastName')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('lastName') && touched.lastName">done</md-icon>
          </slide-y-down-transition>
        </md-field>

        <md-field slot="inputs" :class="[
            { 'md-valid': !errors.has('phoneNumber') && touched.phoneNumber },
            { 'md-form-group': true },
            { 'md-error': errors.has('phoneNumber') }
          ]">
          <md-icon>phone</md-icon>
          <label>Phone Number</label>
          <md-input v-model="phoneNumber" type="text" data-vv-name="phoneNumber" name="phoneNumber" required v-validate="modelValidations.phoneNumber"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('phoneNumber')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('phoneNumber') && touched.email">done</md-icon>
          </slide-y-down-transition>
        </md-field>

        <md-field slot="inputs" :class="[
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

        <md-field slot="inputs" :class="[
            { 'md-valid': !errors.has('password') && touched.password },
            { 'md-form-group': true },
            { 'md-error': errors.has('password') }
          ]">
          <md-icon>lock_outline</md-icon>
          <label>Password</label>
          <md-input v-model="password" type="password" data-vv-name="password" name="password" required v-validate="modelValidations.password"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('password')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('password') && touched.password">done</md-icon>
          </slide-y-down-transition>
        </md-field>

        <md-checkbox v-model="terms" slot="inputs">I agree to the <a @click="termsAndCondition">terms and conditions</a>.</md-checkbox>
        
        <button class="md-button md-success md-theme-default" slot="footer">
          <div class="md-ripple">
            <div class="md-button-content">
              Register
            </div>
          </div>
        </button>
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
        <div class="centre">
          <md-button class="md-button md-success" @click="modalHide">Got it</md-button>
        </div>
      </template>
    </modal>
    <!-- Modal: Verify Email and continue creating account -->
    <modal v-if="successModal">
      <template slot="header">
        <h4 class="modal-title black">Verify Email!</h4>
      </template>

      <template slot="body">
        <p class="black">You have been successfully registered.</p>
        <p class="black">Check your inbox and verify your email</p>
      </template>

      <template slot="footer">
        <div class="centre">
          <md-button class="md-button md-success" @click="proceed">Got it</md-button>
        </div>
      </template>
    </modal>
    
  </form>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase/app";
import moment from "moment";
import slugify from "slugify";
import { LoginCard, Modal } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
export default {
  components: {
    LoginCard,
    Modal,
    SlideYDownTransition
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      password: null,
      terms: false,
      userRole: null,
      modal: false,
      successModal: false,
      feedback: null,
      slug: null,
      loading: false,
      touched: {
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        password: false,
        terms: false,
        userRole: false
      },
      modelValidations: {
        firstName: {
          required: true
        },
        lastName: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        phoneNumber: {
          required: true,
          min: 10,
          max: 10,
        },
        password: {
          required: true,
          min: 6
        },
        terms: {
          required: true
        },
        userRole: {
          required: true
        }
      }
    };
  },
  methods: {
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit("on-validated", res);
        return res;
      });
    },
    modalHide() {
      this.modal = false;
    },
    random() {
      let rand1 = Math.floor(Math.random() * 10).toString(); let rand2 = Math.floor(Math.random() * 10).toString();
      let rand3 = Math.floor(Math.random() * 10).toString(); let rand4 = Math.floor(Math.random() * 10).toString();
      return rand1 + rand2 + rand3 + rand4;
    },
    createAccount() {
      this.loading = true;
      if(!this.terms) {
        this.loading = false;
        this.modal = true;
        this.feedback = "Please agree to the terms and conditions";
      }
      else if(this.userRole && this.firstName && this.lastName && this.email && this.password) {
        this.slug = slugify(this.firstName + " " + this.lastName + " " + this.random(), {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
      let users = db.collection('users').doc(this.slug);
      users.get().then(doc => {
        if(doc.exists) {
          this.loading = false;
          this.modal = true;
          this.feedback = "This account already exists";
        }
        else {
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            users.set({
              userId: cred.user.uid,
              created: moment(Date.now()).format('L'),
              lastModified: null,
              name: this.firstName,
              surname: this.lastName,
              phone: this.phoneNumber,
              email: this.email,
              user: this.userRole,
              terms_and_conditions: this.terms,
              alias: this.slug
            });
            cred.user.updateProfile({
              displayName: this.firstName + " " + this.lastName
            })
            .catch(err => {
              this.loading = false;
              this.modal = true;
              this.feedback = err.message;
            })
          })
          .then(() => {
            this.feedback = null;
            let user = firebase.auth().currentUser;
            user.sendEmailVerification().then(() => {
              this.loading = false;
              this.successModal = true;
            }).catch(err => {
              // An error happened.
              this.loading = false;
              this.modal = true;
              this.feedback = err.message;
            });
          })
          .catch(err => {
            this.loading = false;
            this.modal = true;
            this.feedback = err.message;
          })
        }
      });
      
      } else {
        this.loading = false;
        this.modal = true;
        this.feedback = "Please select whether you are a student or a client.";
      }
    },
    proceed() {
      if(this.userRole == "student") {
        this.$router.push({ name: "create-student-account" });
      } 
      else {
        this.$router.push({ name: "create-client-account" });
      }
    },
    termsAndCondition() {
      let terms = this.$router.resolve({ name: "terms-and-conditions" });
      window.open(terms.href, "_blank");
    }
  },
  watch: {
    firstName() {
      this.touched.firstName = true;
    },
    lastName() {
      this.touched.lastName = true;
    },
    email() {
      this.touched.email = true;
    },
    phoneNumber() {
      this.touched.phoneNumber = true;
    },
    password() {
      this.touched.password = true;
    },
    terms() {
      this.touched.terms = true;
    },
    userRole() {
      this.touched.terms = true;
    }
  }
};
</script>
