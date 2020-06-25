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
            <!-- Client: User Menu -->
            <slot v-if="client">
              <li> <!-- Client: My Profile -->
                <router-link :to="{ name: 'client-profile', params: { id: alias } }">
                  <span class="sidebar-mini">MP</span>
                  <span class="sidebar-normal">My Profile</span>
                </router-link>
              </li>
              <li> <!-- Client: Edit Profile -->
                <router-link :to="{ name: 'edit-client-profile', params: { id: alias } }">
                  <span class="sidebar-mini">EP</span>
                  <span class="sidebar-normal">Edit Profile</span>
                </router-link>
              </li>
            </slot>
            <!-- Student: User Menu -->
            <slot v-if="student">
              <li> <!-- Student: My Profile -->
                <router-link :to="{ name: 'student-profile', params: { id: alias } }">
                  <span class="sidebar-mini">MP</span>
                  <span class="sidebar-normal">My Profile</span>
                </router-link>
              </li>
              <li> <!-- Student: Edit Profile -->
                <router-link :to="{ name: 'edit-student-profile', params: { id: alias } }">
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
      default: "/img/dashboard/client/card-1.jpg"
    }
  },
  data() {
    return {
      isClosed: true,
      name: null,
      surname: null,
      username: null,
      student: null,
      client: null,
      alias: null
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
        this.alias = doc.data().alias;
        let userPermission = doc.data().user;
        if(userPermission == "student") {
          this.student = true;
        }
        else {
          this.client = true;
        }
      });
    });
  }
};
</script>
<style>
.collapsed {
  transition: opacity 1s;
}
</style>
