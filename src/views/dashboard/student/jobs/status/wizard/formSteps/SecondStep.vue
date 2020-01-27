<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <user-card button-color="success"></user-card>
      </div>
    </div>
    <div class="centre">
      <md-button @click="modal=true;" class="md-danger" >
        Decline
      </md-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <md-button @click="accept" class="md-success">
        Accept
      </md-button>
    </div>

    <!-- Modal: Decline -->
    <modal v-if="modal" @close="modalHide">
      <template slot="header">
        <h4 class="modal-title black">Decline job</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p class="black">Are you you sure you want to decline the job?</p>
      </template>

      <template slot="footer">
        <div style="text-align:center;">
          <md-button class="md-button md-danger" @click="modalHide">Cancel</md-button>
            &nbsp;&nbsp;&nbsp;
          <md-button class="md-button md-success" @click="decline">Yes</md-button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import UserCard from "./userCard/UserCard.vue";
import { Modal } from "@/components";
export default {
  components: {
    UserCard,
    Modal
  },
  data() {
    return {
      modal: false
    };
  },
  methods: {
    modalHide() {
      this.modal = false;
    },
    decline() {

    },
    accept() {

    }
  }
};
</script>
<style scoped>
.centre {
  text-align: center;
}
</style>
