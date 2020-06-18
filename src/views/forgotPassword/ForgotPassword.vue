<template>
  <form @submit.prevent="forgot({ email })" class="md-layout text-center">
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
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
        <button class="md-button md-success md-theme-default" slot="footer">
          <div class="md-ripple">
            <div class="md-button-content">
              Reset
            </div>
          </div>
        </button>
        <router-link to="/login" slot="hyperlink">
          Back to Login
        </router-link>
      </login-card>
    </div>

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
        <md-button v-if="success" class="md-button md-success" @click="sent">{{ footer }}</md-button>
        <md-button v-if="error" class="md-button md-success" @click="modalHide">{{ footer }}</md-button>
      </template>
    </modal>
  </form>
</template>
<script>
import { LoginCard, Modal } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "forgot-password",
  components: {
    LoginCard,
    Modal,
    SlideYDownTransition
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
  computed: {
    ...mapGetters({
      header: "headerFP",
      body: "bodyFP",
      footer: "footerFP",
      modal: "modalFP",
      loading: "loadingFP",
      success: "successFP",
      error: "errorFP"
    })
  },
  methods: {
    ...mapActions(["forgot", "sent", "modalHide"])
  },
  watch: {
    email() {
      this.touched.email = true;
    }
  }
};
</script>
