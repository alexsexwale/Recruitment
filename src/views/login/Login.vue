<template>
  <form @submit.prevent="login({email, password})" class="md-layout text-center">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"><div class="loading"></div></div></div>
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
        <h4 class="modal-title black">{{ header }}</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <p class="black">{{ body }}</p>
      </template>
      <template slot="footer">
        <div class="centre">
          <md-button class="md-button md-success" @click="modalHide">{{ footer }}</md-button>
        </div>
      </template>
    </modal>
  </form>
</template>
<script>
import { LoginCard, Modal } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
import { ValidationProvider, extend } from 'vee-validate';
import { mapGetters, mapActions } from "vuex";

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
          min: 6,
          regex:"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      header: "headerL",
      body: "bodyL",
      footer: "footerL",
      modal: 'modalL',
      loading: "loadingL",
    })
  },
  methods: {
    ...mapActions(["login", "modalHide"])
  },
  watch: {
    email() {
      this.touched.email = true;
    },
    password() {
      this.touched.password = true;
    }
  },
  created() {
    this.loading = false;
  }
};
</script>