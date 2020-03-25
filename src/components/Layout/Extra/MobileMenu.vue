<template>
  <ul class="nav nav-mobile-menu">
    <li>
      <a @click="logout" class="dropdown-toggle" data-toggle="dropdown">
        <i class="material-icons">reply_all</i>
        <p>Logout</p>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$router.push({ name: 'login' });
    }
  }
};
</script>
