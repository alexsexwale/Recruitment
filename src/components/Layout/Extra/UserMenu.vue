<template>
  <div class="user">
    <div class="photo">
      <img v-if="!user.profile" :src="avatar" alt="avatar" />
      <img v-if="user.profile" :src="user.profile" alt="avatar" />
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
              <!-- Client: My Profile -->
              <!-- <li> 
                <router-link :to="{ name: 'client-profile', params: { id: alias } }">
                  <span class="sidebar-mini">MP</span>
                  <span class="sidebar-normal">My Profile</span>
                </router-link>
              </li> -->
              <li> <!-- Client: Edit Profile -->
                <router-link :to="{ name: 'edit-client-profile', params: { id: alias } }">
                  <span class="sidebar-mini"><i class="fas fa-user-edit"></i></span>
                  <span class="sidebar-normal">Edit Profile</span>
                </router-link>
              </li>
            </slot>
            <!-- Student: User Menu -->
            <slot v-if="student">
              <!-- Student: My Profile -->
              <!-- <li>
                <router-link :to="{ name: 'student-profile', params: { id: alias } }">
                  <span class="sidebar-mini">MP</span>
                  <span class="sidebar-normal">My Profile</span>
                </router-link>
              </li> -->
              <li> <!-- Student: Edit Profile -->
                <router-link :to="{ name: 'edit-student-profile', params: { id: alias } }">
                  <span class="sidebar-mini"><i class="fas fa-user-edit"></i></span>
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
    avatar: {
      type: String,
      default: "/img/default-avatar.png"
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
      user: {},
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
    let clients = db.collection('clients');
    let students = db.collection('students');
    let ref = db.collection('users');
    ref.where('userId', '==', user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.name = doc.data().name;
        this.surname = doc.data().surname;
        this.username = this.name + " " + this.surname;
        this.alias = doc.data().alias;
        let userPermission = doc.data().user;
        let student = students.doc(this.alias);
        if(userPermission == "student") {
          this.student = true;
          student.get().then(student => {
            this.user = student.data();
            if(this.user.profile === null) {
              this.user.profile = this.avatar;
            }
          });
        }
        else {
          this.client = true;
          let client = clients.doc(this.alias);
          client.get().then(client => {
            this.user = client.data(); 
            if(this.user.profile === null) {
              this.user.profile = this.avatar;
            }
          });
        }
      });
    });
    
    clients.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.user.profile = this.avatar;
        }
      });
    });

    students.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.user.profile = this.avatar;
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
