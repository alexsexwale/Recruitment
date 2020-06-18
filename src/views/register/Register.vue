<template>
  <form @submit.prevent="register({ role, firstName, lastName, phoneNumber, email, password, terms })" class="md-layout text-center">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
    <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
      <login-card header-color="green">
        <h3 slot="title" class="title">Register</h3>
        <md-radio v-model="role" slot="inputs" value="student">Student</md-radio>
        <md-radio v-model="role" slot="inputs" value="client">Client</md-radio>
        
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
    
    <modal v-if="modal" @close="modalHide">
      <template slot="header">
        <h4 class="modal-title black">{{ header }}</h4>
        <md-button v-if="error" class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <p class="black">{{ body }}</p>
      </template>
      <template slot="footer">
        <div class="centre">
          <!-- Modal: Verify Email and continue creating account -->
          <md-button v-if="success" class="md-button md-success" @click="proceed">{{ footer }}</md-button>
          <!-- Modal: Error handling -->
          <md-button v-if="error" class="md-button md-success" @click="modalHide">{{ footer }}</md-button>
        </div>
      </template>
    </modal>
  </form>
</template>
<script>
import { LoginCard, Modal } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
import { mapGetters, mapActions } from "vuex";
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
      role: null,
      feedback: null,
      touched: {
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        password: false,
        terms: false
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
          min: 6,
          regex:"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"
        },
        terms: {
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
    ...mapActions(["register", "proceed", "termsAndCondition", "modalHide"])
  },
  computed: {
    ...mapGetters({
      header: "headerR",
      body: "bodyR",
      footer: "footerR",
      modal: "modalR",
      loading: "loadingR",
      success: "successR",
      error: "errorR"
    })
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
    }
  }
};
</script>