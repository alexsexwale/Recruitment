<template>
    <div class="md-layout">
      <md-card>
        <md-card-content>
          <collapse :collapse="['Profile', 'Email Notifications', 'Account Settings']" icon="keyboard_arrow_down" color-collapse="success">
            <template slot="md-collapse-pane-1">
              <md-card-content>
                <h3 class="card-category card-category-social" style="text-align:center;">
                  <i class="fas fa-user"></i> Profile
                </h3>
              </md-card-content>
            </template>
            <template slot="md-collapse-pane-2">
              <md-card-content>
                  <h3 class="card-category card-category-social" style="text-align:center;">
                    <i class="fas fa-envelope"></i> Email Notifications
                  </h3>
                </md-card-content>
            </template>
            <template slot="md-collapse-pane-3">
              <md-card-content>
                  <h3 class="card-category card-category-social" style="text-align:center;">
                    <i class="fas fa-cog"></i> Account Settings
                  </h3>
                  <md-button class="md-button md-success" >I would like to change my password <i class="fas fa-chevron-right"></i></md-button>
                  <br>
                  <md-button class="md-button md-success">I would like to change my email <i class="fas fa-chevron-right"></i></md-button>
                  <br>
                  <md-button class="md-button md-success" @click="deleteModal">I would like to delete my account <i class="fas fa-chevron-right"></i></md-button>
                </md-card-content>
            </template>
          </collapse>
        </md-card-content>
      </md-card>
      <modal v-if="modal" @close="modalHide">
        <template slot="header">
            <h4 class="modal-title black">Delete Account</h4>
            <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
            <md-icon>clear</md-icon>
            </md-button>
        </template>
        <template slot="body">
            <p>Are you sure you want to delete your account?</p>
        </template>
        <template slot="footer">
        <div class="centre">
          <md-button class="md-button md-danger" @click="cancel">Cancel</md-button>
            &nbsp;&nbsp;
            <md-button class="md-button md-warning" @click="deleteAccount">Delete Account</md-button>
        </div>
      </template>
      </modal>
    </div>
</template>
<script>
import { Modal } from "@/components";
import { IconCheckbox, Collapse } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
export default {
  components: {
    IconCheckbox,
    Collapse,
    Modal,
    SlideYDownTransition
  },
  data() {
    return {
      user: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      password: null,
      confirmPassword: null,
      modal: false,
      deleteAccount: false,

      message: null,
      touched: {
        firstName: false  
      },
      modelValidations: {
        firstName: {
          required: true
        },  
      }
    }  
  },
  methods: {
    deleteModal() {
      this.modal = true;
    },
    updatePasswordModal() {
      this.modal = true;
    },
    deleteAccount() {
      this.user.delete().then(() => {
        // User deleted.
        this.$router.push({ name: "login" });
      }).catch(error => {
        // An error happened.
      });
    },
    updatePassword() {
      this.user.updatePassword(this.password).then(() => {
        // Update successful.
        this.message = "Your password was successfully updated.";
      }).catch(error => {
        // An error happened.
      });
    },
    updateEmail() {
      this.user.updateEmail(this.email).then(() => {
        // Update successful.
        this.message = "Your email was successfully updated to " + this.email + " .";
      }).catch(error => {
          // An error happened.
      });
    },
    cancel() {
      this.modal = false;  
    },
    modalHide() {
      this.modal = false;    
    }
  },
  watch: {
    firstName() {
      this.touched.firstName = true;
    }  
  },
  created() {
    this.user = firebase.auth().currentUser;
  }
    
}
</script>
<style scoped>
.card-padding {
  padding: 25px;
}
.centre {
    text-align: center;
}
</style>