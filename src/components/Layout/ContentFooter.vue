<template>
  <footer class="footer">
    <div class="container">
      <nav>
        <ul>
          <li>Contact us: 087 149 4394</li>
        </ul>
        <!-- <ul v-if="client">
          <li>
            <router-link :to="{ path: '/client/terms-and-conditions' }">Terms and Conditions</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/client/privacy-policy' }">Privacy Policy</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/client/faq' }">FAQ</router-link>
          </li>
        </ul>
        <ul v-if="student">
          <li>
            <router-link :to="{ path: '/student/terms-and-conditions' }">Terms and Conditions</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/student/privacy-policy' }">Privacy Policy</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/student/faq' }">FAQ</router-link>
          </li>
        </ul> -->
      </nav>
      <div class="copyright text-center">
        &copy; {{ new Date().getFullYear() }}
        Jobox (Pty) Ltd All rights reserved
      </div>
    </div>
  </footer>
</template>
<script>
import db from '@/firebase/init';
import firebase from 'firebase/app';
export default {
  data() {
    return {
      client: null,
      student: null
    }
  },
  created() {
    let user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let userPermission = doc.data().user;
        if(userPermission == "student") {
          this.student = true;
        }
        else {
          this.client = true;
        }
      })
    });
  }
};
</script>
<style></style>
