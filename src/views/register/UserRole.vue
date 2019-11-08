<template>
  <div class="md-layout text-center">
    <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
      <login-card header-color="green">
        <h3 slot="title" class="title">User Role</h3>
        <h4 slot="inputs">Are you a </h4>
        <md-field class="md-form-group" slot="inputs">
          <router-link to="/register/client"><md-button class="md-success md-lg">Client</md-button></router-link>&nbsp;&nbsp;&nbsp;&nbsp;<h4>or</h4>&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link to="/register/student"><md-button class="md-success md-lg">Student</md-button></router-link>
        </md-field>
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

<style lang="scss" scoped>
.md-field:after, .md-field:before {
    display: none;
}
</style>
