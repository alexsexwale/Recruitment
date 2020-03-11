<template>
  <md-toolbar md-elevation="0" class="md-transparent" :class="{ 'md-toolbar-absolute md-white md-fixed-top': $route.meta.navbarAbsolute }">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
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
                      <li><router-link to="/client/edit-profile">My Profile</router-link></li>
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
import firebase from 'firebase'
export default {
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    logout() {
      firebase.auth().signOut().then(() => {
          this.$router.push({ name: 'Login'})
      })
    }
  },

};
</script>
