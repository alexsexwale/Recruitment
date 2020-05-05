<template>
  <div class="wizard-container">
    <form @submit.prevent="createAccount">
      <!--        You can switch " data-color="primary" "  with one of the next bright colors: "green", "orange", "red", "blue"       -->
      <md-card class="md-card-wizard active" data-color="green">
        <md-card-header>
          <slot name="header">
            <h3 class="card-title">{{ title }}</h3>
            <h3 class="description">{{ subTitle }}</h3>
          </slot>
        </md-card-header>
        <div class="wizard-navigation">
          <ul class="nav nav-pills" role="tablist">
            <li v-for="(tab, index) in tabs" :key="tab.title" role="tab" :tabindex="tab.checked ? 0 : ''" :id="`step-${tab.tabId}`" :aria-controls="tab.tabId" :aria-disabled="tab.active" :aria-selected="tab.active" :ref="`tab-${index}`" class="nav-item wizard-tab-link" :style="linkWidth">
              <a class="nav-link" @click="navigateToTab(index)"
                :class="[
                  { 'disabled-wizard-link': !tab.checked },
                  { active: tab.active },
                  { checked: tab.checked }
                ]" data-toggle="tab">
                <tab-item-content :tab="tab"></tab-item-content>
              </a>
            </li>
          </ul>
          <div class="moving-tab" :class="{ 'error-link': activeTab.hasError }" v-if="activeTab" style="transition: transform 0.5s cubic-bezier(0.29, 1.42, 0.79, 1); width: 100%;" :style="movingTabStyles">
            <tab-item-content :tab="activeTab" :moving-tab="true"></tab-item-content>
          </div>
        </div>

        <md-card-content>
          <div class="tab-content">
            <slot :activeIndex="activeTabIndex" :activeTab="activeTab"> </slot>
          </div>
        </md-card-content>

        <md-card-actions md-alignment="space-between">
          <slot name="footer" :next-tab="nextTab" :prev-tab="prevTab">
            <div>
              <md-button v-if="activeTabIndex > 0" @click.native="prevTab" class="btn-previous">
                <div class="pc-view">{{ prevButtonText }}</div>
                <div class="mobi-view"><i class="fas fa-arrow-left"></i></div>
              </md-button>
            </div>

            <div>
              <md-button v-if="activeTabIndex < tabCount - 1" @click.native="nextTab" class="btn-next md-success">
                <div class="pc-view">{{ nextButtonText }}</div>
                <div class="mobi-view"><i class="fas fa-arrow-right"></i></div>
              </md-button>
              <button v-else class="md-button md-success md-theme-default" slot="footer">
                <div class="md-ripple">
                  <div class="md-button-content">
                    <div class="pc-view">{{ finishButtonText }}</div>
                    <div class="mobi-view"><i class="fa fa-check"></i></div>
                  </div>
                </div>
              </button>
            </div>
          </slot>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>
<script>
import { throttle } from "./throttle";
import db from '@/firebase/init';
import firebase, { storage } from 'firebase/app';
import moment from "moment";

export default {
  name: "simple-wizard",
  props: {
    startIndex: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: "Title"
    },
    subTitle: {
      type: String,
      default: "Subtitle"
    },
    prevButtonText: {
      type: String,
      default: "Previous"
    },
    nextButtonText: {
      type: String,
      default: "Next"
    },
    finishButtonText: {
      type: String,
      default: "Finish"
    },
    vertical: {
      type: Boolean
    },
    file: {
      required: true
    },
    firstName: {
      required: true
    },
    lastName: {
      required: true
    },
    companyName: {
      required: true
    },
    companyWebsite: {
      required: true
    },
    vat: {
      required: true
    },
    companySize: {
      required: true
    },
    industry: {
      required: true
    },
    aboutMe: {
      required: true
    },
    addressLine1: {
      required: true
    },
    addressLine2: {
      required: true
    },
    city: {
      required: true
    },
    province: {
      required: true
    },
    postalCode: {
      required: true
    },
    email: {}
  },
  components: {
    TabItemContent: {
      props: ["tab", "movingTab"],
      render(h) {
        return h("span", [this.tab.$slots.label || this.tab.label]);
      }
    }
  },
  provide() {
    return {
      addTab: this.addTab,
      removeTab: this.removeTab
    };
  },
  data() {
    return {
      tabs: [],
      activeTabIndex: 0,
      tabLinkWidth: 0,
      tabLinkHeight: 50,
      user: null,
      emailVerified: null,
      feedback: null,
      profile: null,
      alias: null
    };
  },
  computed: {
    tabCount() {
      return this.tabs.length;
    },
    linkWidth() {
      let width = 100;
      if (this.tabCount > 0) {
        width = 100 / this.tabCount;
      }
      if (this.vertical) {
        width = 100;
      }
      return { width: `${width}%` };
    },
    activeTab() {
      return this.tabs[this.activeTabIndex];
    },
    movingTabStyles() {
      let translateXValue =
        this.activeTabIndex == 0
          ? this.tabLinkWidth * this.activeTabIndex - 8
          : this.activeTabIndex == this.tabCount - 1
          ? this.tabLinkWidth * this.activeTabIndex + 8
          : this.tabLinkWidth * this.activeTabIndex;

      let translateYValue = 0;
      if (this.vertical) {
        translateYValue = this.tabLinkHeight * this.activeTabIndex;
        translateXValue = 0;
      }
      let styles = {
        transform: `translate3d(${translateXValue}px, ${translateYValue}px, 0px)`
      };
      if (this.tabLinkWidth !== 0) {
        styles.width = `${this.tabLinkWidth}px`;
      }
      return styles;
    }
  },
  methods: {
    addFeedback: function() {
      this.$emit("feedback", this.feedback);
    },
    addEmailVerified: function() {
      this.$emit("emailVerified", this.emailVerified);
    },
    createAccount() {
      this.user.reload().then(() => {
        this.emailVerified = this.user.emailVerified;
        this.addEmailVerified();
      });

      if(this.user.emailVerified) {
        let clients = db.collection('clients').doc(this.alias);
        clients.get().then(doc => {
          if(doc.exists) {
            if(this.companyName) {
              clients.update({
                companyName: this.companyName
              });
              this.modal = true;
            }
            if(this.companyWebsite) {
              clients.update({
                website: this.companyWebsite
              });
              this.modal = true;
            }
            if(this.vat) {
              clients.update({
                vat: this.vat
              });
            }
            if(this.companySize) {
              clients.update({
                companySize: this.companySize
              });
            }
            if(this.industry) {
              clients.update({
                industry: this.industry
              });
            }
            if(this.aboutMe) {
              clients.update({
                bio: this.aboutMe
              });
              this.modal = true;
            }
            if(this.addressLine1) {
              clients.update({
                addressLine1: this.addressLine1
              });
            }
            if(this.addressLine2) {
              clients.update({
                addressLine2: this.addressLine2
              });
            }
            if(this.city) {
              clients.update({
                city: this.city
              });
            }
            if(this.province) {
              clients.update({
                province_state: this.province
              });
            }
            if(this.postalCode) {
              clients.update({
                postalCode_zipCode: this.postalCode
              });
            }
            clients.update({
              accountCreated: true
            });
          }
          else {
            //upload profile picture
            //let storageRef = firebase.storage().ref('profiles/' + this.file.name);
            // let uploadTask = storageRef.put(this.file).then(snapshot => {
            //   // Handle successful uploads on complete
            //   uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
            //     this.profile = downloadUrl;
            //   });
            // });

            clients.set({
              userId: this.user.uid,
              created: moment(Date.now()).format('L'),
              lastModified: null,
              companyName: this.companyName,
              website: this.companyWebsite,
              vat: this.vat,
              companySize: this.companySize,
              industry: this.industry,
              bio: this.aboutMe,
              addressLine1: this.addressLine1,
              addressLine2: this.addressLine2,
              city: this.city,
              province_state: this.province,
              postalCode_zipCode: this.postalCode,
              country: "South Africa",
              profilePicture: this.profile,
              accountCreated: true
            });
          }
          this.$router.push({ name: "client-profile", params: { id: this.alias } });
        });
        
      } else {
        this.feedback = "You have not verified that " + this.email + " is your email address."
        this.addFeedback();
      }
    },
    addTab(tab) {
      const index = this.$slots.default.indexOf(tab.$vnode);
      let tabTitle = tab.title || "";
      tab.tabId = `${tabTitle.replace(/ /g, "")}${index}`;
      if (!this.activeTab && index === 0) {
        tab.active = true;
        tab.checked = true;
      }
      if (this.activeTab === tab.name) {
        tab.active = true;
        tab.checked = true;
      }
      this.tabs.splice(index, 0, tab);
    },
    removeTab(tab) {
      const tabs = this.tabs;
      const index = tabs.indexOf(tab);
      if (index > -1) {
        tabs.splice(index, 1);
      }
    },
    validate(tab) {
      let tabToValidate = tab || this.activeTab;
      let beforeChange = tabToValidate.beforeChange;
      if (beforeChange) {
        return Promise.resolve(beforeChange())
          .then(res => {
            this.activeTab.hasError = res ? false : true;
            return res;
          })
          .catch(() => {
            this.activeTab.hasError = true;
          });
      } else {
        return Promise.resolve(true);
      }
    },
    async nextTab() {
      if(!this.user.emailVerified){
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
        this.addEmailVerified();
      }
      let isValid = await this.validate();
      if (isValid && this.activeTabIndex < this.tabCount - 1) {
        this.activeTabIndex++;
      }
      return isValid;
    },
    prevTab() {
      if(!this.user.emailVerified){
        this.user.reload();
        this.emailVerified = this.user.emailVerified;
        this.addEmailVerified();
      }
      this.activeTabIndex--;
    },
    async navigateToTab(index) {
      if (this.tabs[index].checked) {
        // recursively validate each tab
        if (index > this.activeTabIndex) {
          let valid = await this.nextTab();
          if (valid) {
            this.navigateToTab(index);
          }
        } else {
          this.activeTabIndex = index;
        }
      }
    },
    onResize() {
      let tabLinks = document.getElementsByClassName("wizard-tab-link");
      if (tabLinks.length > 0 && this.tabCount > 0) {
        let { clientWidth, clientHeight } = tabLinks[0];
        this.tabLinkWidth = clientWidth;
        this.tabLinkHeight = clientHeight;
      }
    }
  },
  mounted() {
    this.activeTabIndex = this.startIndex;
    this.$nextTick(() => {
      this.tabs[this.activeTabIndex].active = true;
      this.tabs[this.activeTabIndex].checked = true;
      this.onResize();
    });
    window.addEventListener("resize", () => {
        throttle(this.onResize, 40);
      },
      false
    );
  },
  watch: {
    activeTabIndex(newValue, oldValue) {
      if (newValue !== oldValue) {
        let oldTab = this.tabs[oldValue];
        let newTab = this.tabs[newValue];
        oldTab.active = false;
        newTab.active = true;

        if (!newTab.checked) {
          newTab.checked = true;
        }
        this.$emit("tab-change", oldTab, newTab);
        this.$emit("update:startIndex", newValue);
      }
    }
  },
  created() {
    this.user = firebase.auth().currentUser;
    let users = db.collection('users');
    users.where('userId', '==', this.user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.alias = doc.id;
      });
    });
  }
};
</script>
<style scoped lang="scss">
/* Tab content animation */
.tab-content {
  display: flex; // to avoid horizontal scroll when animating
  .tab-pane {
    display: block;
    animation: fadeIn 0.5s;
    width: 100%;
  }
}

/**
    Extra niceties. Display error tabs and disable navigation unvisited tabs
   */
.wizard-navigation .nav-link {
  &.active,
  &.checked {
    cursor: pointer;
  }
}

.disabled-wizard-link {
  cursor: not-allowed;
}

@media only screen and (max-width: 768px) {
  .pc-view {
    display: none;
  }
}

@media only screen and (min-width: 768px) {
  .mobi-view {
    display: none;
  }
}
</style>
