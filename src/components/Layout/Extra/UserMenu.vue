<template>
  <div class="user">
    <div class="photo">
      <img :src="avatar" alt="avatar" />
    </div>
    <div class="user-info">
      <a data-toggle="collapse" :aria-expanded="!isClosed" @click.stop="toggleMenu" @click.capture="clicked">
        <span>
          {{ username }}
          <b class="caret"></b>
        </span>
      </a>

      <collapse-transition>
        <div v-show="!isClosed">
          <ul class="nav">
            <slot>
              <li v-if="client">
                <router-link to="/client/edit-profile">
                  <span class="sidebar-mini">EP</span>
                  <span class="sidebar-normal">Edit Profile</span>
                </router-link>
              </li>
              <li v-if="student">
                <router-link to="/student/edit-profile">
                  <span class="sidebar-mini">EP</span>
                  <span class="sidebar-normal">Edit Profile</span>
                </router-link>
              </li>
            </slot>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </div>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import db from '@/firebase/init';
import firebase from 'firebase';

export default {
  components: {
    CollapseTransition
  },
  props: {
    title: {
      type: String,
      default: "Lesedi Nkosi"
    },
    avatar: {
      type: String,
      default: "../img/dashboard/profile/client.png"
    }
  },
  data() {
    return {
      isClosed: true,
      name: null,
      surname: null,
      username: null,
      student: null,
      client: null
    };
  },
  methods: {
    clicked: function(e) {
      e.preventDefault();
    },
    toggleMenu: function() {
      this.isClosed = !this.isClosed;
    }
  },
  created() {
    let user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.name = doc.data().name;
        this.surname = doc.data().surname;
        this.username = this.name + " " + this.surname;
        let userPermission = doc.data().user;
        if(userPermission == "student") {
          this.student = true;
        }
        else {
          this.client = true;
        }
      })
    })
  }
};
</script>
<style>
.collapsed {
  transition: opacity 1s;
}
</style>
