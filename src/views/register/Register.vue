<template>
  <div class="md-layout text-center">
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
          <label>Surname</label>
          <md-input v-model="lastName" type="text" data-vv-name="lastName" name="lastName" required v-validate="modelValidations.lastName"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('lastName')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('lastName') && touched.lastName">done</md-icon>
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

        <md-checkbox v-model="terms" slot="inputs">I agree to the <a>terms and conditions</a>.</md-checkbox>
        <md-button slot="footer" class="md-success">
          <router-link to="/register/select-user-role" style="color:#fff">Register</router-link>
        </md-button>
      </login-card>
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
export default {
  components: {
    LoginCard,
    SlideYDownTransition
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      terms: false,
      userRole: false,
      touched: {
        firstName: false,
        lastName: false,
        email: false,
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

<style></style>
