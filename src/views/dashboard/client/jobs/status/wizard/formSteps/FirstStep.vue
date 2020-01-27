<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item mt-4 md-small-size-100">
        <user-card button-color="success"></user-card>
      </div>
      <div class="md-layout-item mt-4 md-small-size-100">
        <user-card button-color="success"></user-card>
      </div>
    </div>
  </div>
</template>
<script>
import UserCard from "./userCard/UserCard.vue";
import db from '@/firebase/init';
import firebase from 'firebase/app';
export default {
  components: {
    UserCard
  },
  data() {
    return {
      
    };
  },
  created() {
    
  }
};
</script>
<style>

</style>
