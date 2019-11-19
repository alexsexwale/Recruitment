<template>
  <div class="md-layout text-center">
    <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
      <login-card header-color="green">
        <h3 slot="title" class="title">Login</h3>
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
        <md-button slot="footer" class="md-simple md-success md-lg">
          <router-link to="/client/dashboard">
          Login</router-link>
        </md-button>
      </login-card>
    </div>
    <!-- <modal v-if="smallAlertModal" @close="smallAlertModalHide">
    <template slot="header">
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="smallAlertModalHide">
        <md-icon>clear</md-icon>
      </md-button>
    </template>

    <template slot="body">
      <p>Are you sure you want to do this?</p>
    </template>

    <template slot="footer">
      <md-button class="md-simple" @click="smallAlertModalHide">Never Mind</md-button>
      <md-button class="md-success md-simple" >Yes</md-button>
    </template>
  </modal> -->
  </div>
</template>
<script>
import { LoginCard, Tabs, Modal } from "@/components";
export default {
  components: {
    LoginCard,
    Tabs,
    Modal
  },
  data() {
    return {
      firstname: null,
      email: null,
      password: null,
      smallAlertModal: false
    };
  }
};
</script>

<style></style>
