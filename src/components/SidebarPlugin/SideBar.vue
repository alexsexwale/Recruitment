<template>
  <div class="sidebar"
    :data-color="activeColor"
    :data-image="backgroundImage"
    :data-background-color="backgroundColor"
    :style="sidebarStyle">
    <div class="logo">
      <router-link v-if="profile.user == 'client'" :to="{ name: 'client-profile', params: {id: profile.alias}}" class="simple-text logo-mini">
        <div class="logo-img">
          <img :src="logo" />
        </div>
      </router-link>
      <router-link v-if="profile.user == 'student'"  :to="{ name: 'student-profile', params: {id: profile.alias}}" class="simple-text logo-mini">
        <div class="logo-img">
          <img :src="logo" />
        </div>
      </router-link>
      
      <router-link v-if="profile.user == 'client'" :to="{ name: 'client-profile', params: {id: profile.alias}}" class="simple-text logo-normal">
        <template>{{ title }}</template>
      </router-link>
      <router-link v-if="profile.user == 'student'"  :to="{ name: 'student-profile', params: {id: profile.alias}}" class="simple-text logo-normal">
        <template>{{ title }}</template>
      </router-link>
      <div class="navbar-minimize">
        <md-button id="minimizeSidebar" class="md-round md-just-icon md-transparent" @click="minimizeSidebar">
          <i class="material-icons text_align-center visible-on-sidebar-regular">more_vert</i>
          <i class="material-icons design_bullet-list-67 visible-on-sidebar-mini">view_list</i>
        </md-button>
      </div>
    </div>
    <div class="sidebar-wrapper" ref="sidebarScrollArea">
      <slot></slot>
      <md-list class="nav">
        <slot name="links">
          <sidebar-item v-for="(link, index) in sidebarLinks" :key="link.name + index" :link="link">
            <sidebar-item v-for="(subLink, index) in link.children" :key="subLink.name + index" :link="subLink">
            </sidebar-item>
          </sidebar-item>
        </slot>
      </md-list>
    </div>
  </div>
</template>
<script>
import db from '@/firebase/init';
import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage';
export default {
  name: "sidebar",
  props: {
    title: {
      type: String,
      default: "Jobox"
    },
    activeColor: {
      type: String,
      default: "green",
      validator: value => {
        let acceptedValues = [
          "",
          "purple",
          "azure",
          "green",
          "orange",
          "danger",
          "rose"
        ];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    backgroundImage: {
      type: String,
      default: "/img/sidebar-2.jpg"
    },
    backgroundColor: {
      type: String,
      default: "black",
      validator: value => {
        let acceptedValues = ["", "black", "white", "red"];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    logo: {
      type: String,
      default: "/img/logo-box.png"
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  methods: {
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    }
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`
      };
    }
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
  data() {
    return {
      profile: []
    }
  },
  created() {
    let user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.profile = doc.data();
      })
    });
  },
};
</script>
<style>
.logo-img {
  background: transparent !important;
}

@media (min-width: 992px) {
  .navbar-search-form-mobile,
  .nav-mobile-menu {
    display: none;
  }
}
</style>
