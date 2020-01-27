<template>
  <div class="content">
    <hr/>
    <p class="centre">Your application has been sent!</p>
    <p class="centre">We will let you know when the client has made their decision.</p>
    <hr/>
    <h6 class="centre">Client Information</h6>
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100">
        <user-card button-color="success"></user-card>
      </div>
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
<style scoped>
  .centre {
    text-align: center;
    font-weight: bold;
  }
</style>
