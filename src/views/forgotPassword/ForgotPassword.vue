<template>
  <div class="md-layout text-center">
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
            <md-icon class="success" v-show="!errors.has('email') && touched.email">done</md-icon>
          </slide-y-down-transition>
        </md-field>
        <md-button slot="footer" class="md-success" style="color:#fff">
          Reset
        </md-button>
        <router-link to="/login" slot="hyperlink">
          Back to Login
        </router-link>
      </login-card>
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/components";
export default {
  components: {
    LoginCard
  },
  data() {
    return {
      email: null,
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
  watch: {
    email() {
      this.touched.email = true;
    }
  }
};
</script>

<style></style>
