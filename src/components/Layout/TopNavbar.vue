<template>
  <md-toolbar md-elevation="0" class="md-transparent" :class="{ 'md-toolbar-absolute md-white md-fixed-top': $route.meta.navbarAbsolute }">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-round md-simple md-toolbar-toggle" :class="{ toggled: $sidebar.showSidebar }" @click="toggleSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <md-list>
            <li class="md-list-item">
              <a class="md-list-item-router md-list-item-container md-button-clean dropdown">
                <div class="md-list-item-content">
                  <drop-down direction="down">
                    <md-button slot="title" class="md-button md-just-icon md-simple" data-toggle="dropdown">
                      <md-icon>person</md-icon>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <!-- Client: Settings -->
                      <li v-if="client"><router-link :to="{ name: 'settings', params: { id: alias } }">Settings</router-link></li>
                      <!-- Student: Settings -->
                      <li v-if="student"><router-link :to="{ name: 'settings', params: { id: alias } }">Settings</router-link></li>
                      <!-- Logout -->
                      <li><a @click="logout">Logout</a></li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import db from '@/firebase/init';
import firebase from 'firebase'
export default {
  data() {
    return {
      student: null,
      client: null
    }
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login'});
      });
    }
  },
  created() {
    let user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
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
