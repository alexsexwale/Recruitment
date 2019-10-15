<template>
  <div class="md-layout text-center">
    <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
      <login-card header-color="green">
        <h3 slot="title" class="title">Register</h3>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>email</md-icon>
          <label>Email</label>
          <md-input v-model="email" type="email"></md-input>
        </md-field>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>lock_outline</md-icon>
          <label>Password</label>
          <md-input v-model="password"></md-input>
        </md-field>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>lock_outline</md-icon>
          <label>Confirm password</label>
          <md-input v-model="confirmPassword"></md-input>
        </md-field>
        <!-- <md-checkbox v-model="boolean">I agree to the <a>terms and conditions</a>.</md-checkbox> -->
        <md-button slot="footer" class="md-simple md-success md-lg"><router-link to="/student-form">Register</router-link>
          
        </md-button>
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
      password: null,
      confirmPassword: null,
      boolean: false
    };
  }
};
</script>

<style></style>
