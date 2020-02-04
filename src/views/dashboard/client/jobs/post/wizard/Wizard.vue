<template>
  <div class="wizard-container">
    <form @submit.prevent="createJob">
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
            <li
              v-for="(tab, index) in tabs"
              :key="tab.title"
              role="tab"
              :tabindex="tab.checked ? 0 : ''"
              :id="`step-${tab.tabId}`"
              :aria-controls="tab.tabId"
              :aria-disabled="tab.active"
              :aria-selected="tab.active"
              :ref="`tab-${index}`"
              class="nav-item wizard-tab-link"
              :style="linkWidth">
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
                {{ prevButtonText }}
              </md-button>
            </div>

            <div>
              <md-button v-if="activeTabIndex < tabCount - 1" @click.native="nextTab" class="btn-next md-success">
                {{ nextButtonText }}
              </md-button>
              <button v-else class="md-button md-success md-theme-default" slot="footer">
                <div class="md-ripple">
                  <div class="md-button-content">
                    {{finishButtonText}}
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
import slugify from "slugify";
import { Modal } from "@/components";

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
    name: {
      required: true
    },
    description: {
      required: true
    },
    skills: {
      required: true
    },
    location: {},
    deadline: {},
    budget: {
      required: true
    }
  },
  components: {
    TabItemContent: {
      props: ["tab", "movingTab"],
      render(h) {
        return h("span", [this.tab.$slots.label || this.tab.label]);
      }
    },
    Modal
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
      slug: null,
      user: null,
      feedback: null,
      client: {}
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
    createJob() {
      this.user = firebase.auth().currentUser;
      let ref = db.collection('clients');
      ref.where('userId', '==', this.user.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.client = doc.data();
          this.slug = slugify(this.name + " " + Date.now(), {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          if(!this.location)
            this.location = "remote";
          let skills = db.collection('skills').doc(this.slug);
          let job = db.collection('jobs').doc(this.slug);
          job.set({
            jobId: this.slug,
            clientId: this.user.uid,
            companyName: this.client.companyName,
            clientName: this.user.displayName,
            studentId: null,
            created: moment(Date.now()).format('L'),
            lastModified: null,
            name: this.name,
            description: this.description,
            location: this.location,
            deadline: moment(this.deadline).format('L'),
            budget: this.budget,
            jobType: "microjob",
            status: "select",
            paid: false
          });
          skills.set({
            jobId: this.slug,
            skills: this.skills,
            lastModified: null
          });
        })
      })
      .then(() => {
        this.$router.push({ name: "pending-jobs" });
      })
      .catch(err => {
        this.feedback = err.message;
        console.log(this.feedback);
      })
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
      let isValid = await this.validate();
      if (isValid && this.activeTabIndex < this.tabCount - 1) {
        this.activeTabIndex++;
      }
      return isValid;
    },
    prevTab() {
      this.activeTabIndex--;
      window.scrollTo(0, 0);
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
    window.addEventListener(
      "resize",
      () => {
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
</style>
