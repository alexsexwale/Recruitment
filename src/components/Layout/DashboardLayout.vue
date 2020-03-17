<template>
  <div class="wrapper"
    :class="[
      { 'nav-open': $sidebar.showSidebar }
    ]" >
    <notifications></notifications>
    <side-bar :active-color="sidebarBackground" :background-image="sidebarBackgroundImage" :data-background-color="sidebarBackgroundColor">
      <user-menu></user-menu>
      <mobile-menu></mobile-menu>
      <template slot="links">
        <!-- Begin: client side navbar -->
        <sidebar-item v-if="client" :link="{ name: 'My Profile', icon: 'person', path: '/client/profile/' + alias }"></sidebar-item>
        <sidebar-item v-if="client" :link="{ name: 'Post a Job', icon: 'create', path: '/client/jobs/post' }"></sidebar-item>
        <sidebar-item v-if="client" :link="{ name: 'View Jobs', icon: 'work_outline' }">
          <sidebar-item :link="{ name: 'Active Jobs', path: '/client/jobs/active' }"></sidebar-item>
          <sidebar-item :link="{ name: 'Pending Jobs', path: '/client/jobs/pending' }"></sidebar-item>
          <sidebar-item :link="{ name: 'Complete Jobs', path: '/client/jobs/complete' }"></sidebar-item>
        </sidebar-item>
        <sidebar-item v-if="client" :link="{ name: 'Get Support', icon: 'contact_support', path: '/client/support' }"></sidebar-item>
        <sidebar-item v-if="client" :link="{ name: 'Give Feedback', icon: 'feedback', path: '/client/feedback' }"></sidebar-item>
        <!-- End: client side navbar -->

        <!-- Begin: student side navbar -->
        <sidebar-item v-if="student" :link="{ name: 'My Profile', icon: 'person', path: '/student/profile/' + alias }"></sidebar-item>
        <sidebar-item v-if="student" :link="{ name: 'Apply For a Job', icon: 'create', path: '/student/apply-for-job' }"></sidebar-item>
        <sidebar-item v-if="student" :link="{ name: 'View Jobs', icon: 'work_outline' }">
          <sidebar-item :link="{ name: 'Active Jobs', path: '/student/jobs/active' }"></sidebar-item>
          <sidebar-item :link="{ name: 'Applied Jobs', path: '/student/jobs/applied' }"></sidebar-item>
          <sidebar-item :link="{ name: 'Complete Jobs', path: '/student/jobs/complete' }"></sidebar-item>
        </sidebar-item>
        <sidebar-item v-if="student" :link="{ name: 'Get Support', icon: 'contact_support', path: '/student/support' }"></sidebar-item>
        <sidebar-item v-if="student" :link="{ name: 'Give Feedback', icon: 'feedback', path: '/student/feedback' }"></sidebar-item>
        <!-- End: student side navbar -->
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <div :class="{ content: !$route.meta.hideContent }" @click="toggleSidebar">
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import MobileMenu from "./Extra/MobileMenu.vue";
import UserMenu from "./Extra/UserMenu.vue";
import { ZoomCenterTransition } from "vue2-transitions";
import db from '@/firebase/init';
import firebase from 'firebase';

export default {
  components: {
    TopNavbar,
    ContentFooter,
    MobileMenu,
    // FixedPlugin,
    UserMenu,
    ZoomCenterTransition
  },
  data() {
    return {
      sidebarBackgroundColor: "black",
      sidebarBackground: "green",
      sidebarBackgroundImage: "./img/sidebar-2.jpg",
      sidebarMini: true,
      sidebarImg: true,
      student: null,
      client: null,
      alias: null
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
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
      })
    });
  },
  mounted() {
    let docClasses = document.body.classList;
    let isWindows = navigator.platform.startsWith("Win");
    if (isWindows) {
      // if we are on windows OS we activate the perfectScrollbar function
      initScrollbar("sidebar");
      initScrollbar("sidebar-wrapper");
      initScrollbar("main-panel");

      docClasses.add("perfect-scrollbar-on");
    } else {
      docClasses.add("perfect-scrollbar-off");
    }
  },
  watch: {
    sidebarMini() {
      this.minimizeSidebar();
    }
  }
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}
.main-panel .zoomIn {
  animation-name: zoomIn95;
}
@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}
.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
