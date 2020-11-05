<template>
  <div class="wizard-container">
    <form @submit.prevent="createAccount">
      <div v-if="loading" class="background"></div>
      <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
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
import firebase from 'firebase/app';
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
    dob: {
      required: true
    },
    gender: {
      required: true
    },
    race: {
      required: true
    },
    bio: {
      required: true
    },
    institution: {
      required: true
    },
    campus: {
      required: true
    },
    studentNo: {
      required: true
    },
    faculty: {
      required: true
    },
    degree: {
      required: true
    },
    year: {
      required: true
    },
    graduateStatus: {
      required: true
    },
    accountName: {
      required: true
    },
    accountNumber: {
      required: true
    },
    accountNumber: {
      required: true
    },
    accountType: {
      required: true
    },
    bankName: {
      required: true
    },
    branchCode: {
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
      alias: null,
      loading: true
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
      this.loading = true;
      this.user.reload().then(() => {
        this.emailVerified = this.user.emailVerified;
        this.addEmailVerified();
      });

      if(this.user.emailVerified) {
        let students = db.collection('students').doc(this.alias);
        students.get().then(doc => {
          if(doc.exists) {
            if(this.dateOfBirth) {
              students.update({
                dateOfBirth: moment(this.dob).format('L'),
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.gender) {
              students.update({
                gender: this.gender,
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.race) {
              students.update({
                race: this.race,
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.bio) {
              students.update({
                bio: this.bio,
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.institution) {
              students.update({
                institution: this.institution,
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.campus) {
              students.update({
                campus: this.campus,
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.studentNo) {
              students.update({
                studentNo: this.studentNo,
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.faculty) {
              students.update({
                faculty: this.faculty,
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.degree) {
              students.update({
                degree: this.degree,
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.year) {
              students.update({
                year: this.year,
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.graduateStatus) {
              students.update({
                graduateStatus: this.graduateStatus,
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.accountName) {
              students.update({
                accountName: this.accountName,
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.accountNumber) {
              students.update({
                accountNumber: this.accountNumber.toString(),
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.accountType) {
              students.update({
                accountType: this.accountType,
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.bankName) {
              students.update({
                bankName: this.bankName,
                lastModified: moment(Date.now()).format('L')
              });
            }
            if(this.branchCode) {
              students.update({
                branchCode: this.branchCode.toString(),
                lastModified: moment(Date.now()).format('L')
              });
            }
            students.update({
              accountCreated: true,
              lastModified: moment(Date.now()).format('L')
            });
          }
          else {
            students.set({
              userId: this.user.uid,
              created: moment(Date.now()).format('L'),
              lastModified: moment(Date.now()).format('L'),
              dateOfBirth: moment(this.dob).format('L'),
              gender: this.gender,
              race: this.race,
              bio: this.bio,
              institution: this.institution,
              institutionType: "University",
              campus: this.campus,
              studentNo: this.studentNo,
              faculty: this.faculty,
              degree: this.degree,
              year: this.year,
              graduateStatus: this.graduateStatus,
              accountName: this.accountName,
              accountNumber: this.accountNumber.toString(),
              accountType: this.accountType,
              bankName: this.bankName,
              branchCode: this.branchCode.toString(),
              accountCreated: true,
              portfolio: null,
              linkedIn: null,
              facebook: null,
              twitter: null,
              instagram: null
            });
          }
          db.collection('vetted').doc(this.alias).set({
            userId: this.user.uid,
            created: moment(Date.now()).format('L'),
            lastModified: moment(Date.now()).format('L'),
            blogWriter: false,
            brandStrategy: false,
            copywriter: false,
            dataEntry: false,
            graphicDesigner: false,
            photographer: false,
            promoter: false,
            salesperson: false,
            socialMediaManager: false,
            translater: false,
            videoEditor: false,
            webDeveloper: false,
            itTechnician: false,
            databaseAdministrator: false,
            pythonDeveloper: false,
            jsDeveloper: false,
            angularDeveloper: false,
            vueDeveloper: false,
            reactDevloper: false,
            sqlDeveloper: false
          });
          this.$router.push({ name: "apply" });
          this.loading = false;
        });
      } else {
        this.feedback = "You have not verified that " + this.email + " is your email address."
        this.loading = false;
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
    let ref = db.collection('users');
    ref.where('userId', '==', this.user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.alias = doc.id;
      });
    });
    this.loading = false;
  }
};
</script>
<style lang="scss">
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
