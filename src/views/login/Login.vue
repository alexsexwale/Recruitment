<template>
  <div class="md-layout text-center">
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
          <md-input v-model="password" data-vv-name="password" name="password" required v-validate="modelValidations.password"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('password')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('password') && touched.password">done</md-icon>
          </slide-y-down-transition>
        </md-field>
        <md-button slot="footer" class="md-success">
          <router-link to="/client/dashboard" style="color:#fff">
          Let's go</router-link>
        </md-button>
        <router-link to="/forgot-password" slot="hyperlink">
          Forgot Your Password?
        </router-link>
      </login-card>
    </div>
  </div>
</template>
<script>
import { LoginCard, Tabs } from "@/components";
export default {
  components: {
    LoginCard,
    Tabs
  },
  data() {
    return {
      email: null,
      password: null,
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

<style></style>
