<template>
  <div class="wrapper"
    :class="[
      { 'nav-open': $sidebar.showSidebar },
      { rtl: $route.meta.rtlActive }
    ]" >
    <notifications></notifications>
    <side-bar
      :active-color="sidebarBackground"
      :background-image="sidebarBackgroundImage"
      :data-background-color="sidebarBackgroundColor">
      <user-menu></user-menu>
      <mobile-menu></mobile-menu>
      <template slot="links">
        <sidebar-item :link="{ name: 'Dashboard', icon: 'dashboard', path: '/student/dashboard' }"></sidebar-item>
        
        <sidebar-item :link="{ name: 'Apply For a Job', icon: 'create', path: '/student/apply-for-a-job' }"></sidebar-item>
        
        <sidebar-item :link="{ name: 'View Microjobs', icon: 'work_outline' }">
          <sidebar-item :link="{ name: 'Active Jobs', path: '/student/microjobs/active' }"></sidebar-item>
          <sidebar-item :link="{ name: 'Pending Jobs', path: '/student/microjobs/pending' }"></sidebar-item>
          <sidebar-item :link="{ name: 'Complete Jobs', path: '/student/microjobs/complete' }"></sidebar-item>
        </sidebar-item>

        <sidebar-item :link="{ name: 'Chat', icon: 'chat', path: '/calendar' }"></sidebar-item>

        <sidebar-item :link="{ name: 'Get Support', icon: 'contact_support', path: '/student/support' }"></sidebar-item>
        <sidebar-item :link="{ name: 'Get Feedback', icon: 'feedback', path: '/student/feedback' }"></sidebar-item>

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
// import FixedPlugin from "../../FixedPlugin.vue";
import UserMenu from "./Extra/UserMenu.vue";
import { ZoomCenterTransition } from "vue2-transitions";

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
      sidebarImg: true
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
