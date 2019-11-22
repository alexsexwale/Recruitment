<template>
  <div class="md-layout text-center">
    <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
      <login-card header-color="green">
        <h3 slot="title" class="title">Register</h3>
        <md-radio v-model="userRole" slot="inputs" value="student">Student</md-radio>
        <md-radio v-model="userRole" slot="inputs" value="client">Client</md-radio>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>face</md-icon>
          <label>First Name</label>
          <md-input v-model="name" type="text"></md-input>
        </md-field>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>person</md-icon>
          <label>Surname</label>
          <md-input v-model="surname" type="text"></md-input>
        </md-field>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>email</md-icon>
          <label>Email</label>
          <md-input v-model="email" type="email"></md-input>
        </md-field>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>lock_outline</md-icon>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
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
export default {
  components: {
    LoginCard
  },
  data() {
    return {
      name: null,
      surname: null,
      email: null,
      password: null,
      terms: false,
      userRole: false
    };
  }
};
</script>

<style></style>
