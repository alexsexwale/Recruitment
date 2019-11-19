<template>
  <div class="full-page" :class="{ 'nav-open': $sidebar.showSidebar }">
    <md-toolbar md-elevation="0" class="md-transparent md-toolbar-absolute">
      <div class="md-toolbar-row md-offset">
        <div class="md-toolbar-section-start">
          <h3 class="md-title">{{ $route.name }}</h3>
        </div>
        <div class="md-toolbar-section-end">
          <md-button class="md-just-icon md-simple md-round md-toolbar-toggle" :class="{ toggled: $sidebar.showSidebar }" @click="toggleSidebar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </md-button>

          <div class="md-collapse" :class="{ 'off-canvas-sidebar': responsive }">
            <md-list>
              <!-- <md-list-item @click="linkClick">
                <router-link :to="{ path: '/partner' }"><md-icon>person_add</md-icon> Become a partner</router-link>
              </md-list-item> -->
              <!-- <md-list-item @click="linkClick">
                <router-link :to="{ path: '/contact' }"><md-icon>phone</md-icon> Contact</router-link>
              </md-list-item> -->
              <md-list-item @click="linkClick">
                <router-link :to="{ path: '/login' }"><md-icon>fingerprint</md-icon> Login</router-link>
              </md-list-item>
              <md-list-item @click="linkClick"> 
                <router-link :to="{ path: '/register' }"><md-icon>person_add</md-icon> Register</router-link>
              </md-list-item>
            </md-list>
          </div>
        </div>
      </div>
    </md-toolbar>
    <div class="wrapper wrapper-full-page" @click="toggleSidebarPage">
      <div class="page-header header-filter" :class="setPageClass" filter-color="black" :style="setBgImage">
        <div class="container md-offset">
          <zoom-center-transition :duration="pageTransitionDuration" mode="out-in">
            <router-view></router-view>
          </zoom-center-transition>
        </div>
        <footer class="footer">
          <div class="container md-offset">
            <nav>
              <ul>
                <!-- <li><router-link :to="{ path: '/terms-and-conditions' }">Terms and Conditions</router-link></li>
                <li><router-link :to="{ path: '/privacy-policy' }">Privacy Policy</router-link></li> -->
                <li><router-link :to="{ path: '/faq' }">FAQ</router-link></li>
              </ul>
            </nav>
            <div class="copyright text-center">
              &copy; Jobox {{ new Date().getFullYear() }}
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { ZoomCenterTransition } from "vue2-transitions";

export default {
  components: {
    ZoomCenterTransition
  },
  props: {
    backgroundColor: {
      type: String,
      default: "black"
    }
  },
  inject: {
    autoClose: {
      default: true
    }
  },
  data() {
    return {
      responsive: false,
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 300,
      year: new Date().getFullYear()
    };
  },
  computed: {
    setBgImage() {
      let images = {
        Pricing: "./img/bg-pricing.jpg",
        Login: "./img/login/Login.jpeg",
        ForgotPassword: "./img/forgotPassword/Forgot_Password.jpeg",
        Register: "./img/register/Sign_Up.jpeg",
        UserRole: "./img/register/Sign_Up.jpeg",
        StudentForm: "../img/register/student/Wizard_Form_Student.jpeg",
        ClientForm: "../img/register/client/Wizard_Form_Client.jpg",
        Contact: "./img/contact/Contact.jpeg",
        Faq: "./img/contact/Contact.jpeg",
        Lock: "./img/lock.jpg"
      };
      return {
        backgroundImage: `url(${images[this.$route.name]})`
      };
    },
    setPageClass() {
      return `${this.$route.name}-page`.toLowerCase();
    }
  },
  methods: {
    toggleSidebarPage() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    linkClick() {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleNavbar() {
      document.body.classList.toggle("nav-open");
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      document.body.classList.remove("nav-open");
      this.showMenu = false;
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    }
  },
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    this.closeMenu();
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  beforeRouteUpdate(to, from, next) {
    // Close the mobile menu first then transition to next page
    if (this.showMenu) {
      this.closeMenu();
      setTimeout(() => {
        next();
      }, this.menuTransitionDuration);
    } else {
      next();
    }
  }
};
</script>
<style lang="scss" scoped>
$scaleSize: 0.1;
$zoomOutStart: 0.7;
$zoomOutEnd: 0.46;
@keyframes zoomIn8 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  100% {
    opacity: 1;
  }
}
.wrapper-full-page .zoomIn {
  animation-name: zoomIn8;
}
@keyframes zoomOut8 {
  from {
    opacity: 1;
    transform: scale3d($zoomOutStart, $zoomOutStart, $zoomOutStart);
  }
  to {
    opacity: 0;
    transform: scale3d($zoomOutEnd, $zoomOutEnd, $zoomOutEnd);
  }
}
.wrapper-full-page .zoomOut {
  animation-name: zoomOut8;
}
</style>
