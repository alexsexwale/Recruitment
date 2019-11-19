<template>
  <footer class="footer">
    <div class="container">
      <nav>
        <ul>
          <!-- <li>
            <router-link :to="{ path: '/contact' }">Contact Us</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/terms-and-conditions' }">Terms and Conditions</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/privacy-policy' }">Privacy Policy</router-link>
          </li> -->
          <li>
            <router-link :to="{ path: '/faq' }">FAQ</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright text-center">
        &copy; {{ new Date().getFullYear() }}
        Jobox (Pty) Ltd All rights reserved
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style></style>
