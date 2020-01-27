<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <user-card button-color="success"></user-card>
      </div>
    </div>
    <div style="text-align:center">
      <md-button class="md-danger">
        I'm not satisfied
      </md-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <md-button class="md-success">
        Confirm completion
      </md-button>
    </div>
  </div>
</template>
<script>
import UserCard from "./userCard/UserCard.vue";

export default {
  components: {
    UserCard
  },
  data() {
    return {
      
    };
  },
  methods: {

  },
};
</script>
<style></style>
