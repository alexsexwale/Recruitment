<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <user-card button-color="success"></user-card>
      </div>
    </div>
    <div style="text-align:center">
      <md-button class="md-danger">
        Cancel
      </md-button>
    </div>
  </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import UserCard from "./userCard/UserCard.vue";

export default {
  components: {
    SlideYDownTransition,
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
