<template>
  <div>
    <div
      id="report-container"
      class="md-layout md-gutter md-alignment-top-center"
    />
    <!--report-menu>
    <ul>
      <li
          slot="reports"
          class="page-item"
          v-for="page in reportPages"
          :key="page.Name"
        >
          <a class="page-link" @click="selectPage(page)">{{ page.displayName }}</a>
        </li>

      </ul>
    </report-menu-->
    <div class="md-layout md-gutter md-alignment-top-center">
      <ul class="pagination">
        <li
          class="page-item prev-page"
          :class="{ disabled: disableButton == 0 }"
        >
          <a class="page-link" aria-label="Previous" @click="prevPage">
            <i class="fas fa-angle-double-left"></i>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in reportPages"
          :key="page.Name"
          :class="{ active: selectedPage === page }"
        >
          <a class="page-link" @click="selectPage(page)">{{
            page.order + 1
          }}</a>
          <md-tooltip md-direction="bottom">{{ page.displayName }}</md-tooltip>
        </li>
        <li
          class="page-item page-pre next-page"
          :class="{ disabled: disableButton === 1 }"
        >
          <a class="page-link" aria-label="Next" @click="nextPage">
            <i class="fas fa-angle-double-right"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import * as pbi from "powerbi-client";

export default {
  name: "institution-reports",
  data() {
    return {
      reportPages: [],
      report: null,
      selectedPage: null,
      pageFilters: null,
      disableButton: 2
    };
  },
  computed: {
    ...mapGetters({
      header: "headerL",
      body: "bodyL",
      footer: "footerL",
      modal: "modalL",
      loading: "loadingL"
    })
  },
  methods: {
    ...mapActions(["getReportConfig"]),
    embedReport: async function() {
      return this.getReportConfig().then(async reportConfig => {
        //TO-DO: Maybe all this code can be executed as an action?
        const pages = reportConfig.reportPages;
        const reportLoadConfig = reportConfig.reportConfig;
        const powerbi = new pbi.service.Service(
          pbi.factories.hpmFactory,
          pbi.factories.wpmpFactory,
          pbi.factories.routerFactory
        );

        const reportContainer = document.getElementById("report-container");

        const report = powerbi.embed(reportContainer, reportLoadConfig);

        // Clear any other loaded handler events
        report.off("loaded");

        // Clear any other rendered handler events
        report.off("rendered");

        report.on("error", function() {
          report.off("error");
        });

        return { report, pages };
      });
    },
    selectPage: async function(page) {
      this.selectedPage = page;

      await this.report.page(page.Name).setActive();
      await this.report.setPage(page.Name);
    },
    nextPage: async function() {
      let index = this.reportPages.indexOf(this.selectedPage);
      let pageName = this.reportPages[index + 1].Name;
      let page = this.reportPages[index + 1];

      this.selectedPage = page;

      await this.report.page(pageName).setActive();
      await this.report.setPage(pageName);
    },
    prevPage: async function() {
      let index = this.reportPages.indexOf(this.selectedPage);
      let pageName = this.reportPages[index - 1].Name;
      let page = this.reportPages[index - 1];

      this.selectedPage = page;

      await this.report.page(pageName).setActive();
      await this.report.setPage(pageName);
    }
  },
  mounted: async function() {
    let reportConfig = await this.embedReport();

    this.report = reportConfig.report;

    reportConfig.pages.forEach(element => {
      this.reportPages.push(element);
      if (element.order === 1) this.selectedPage = element;
    });
  },
  watch: {
    selectedPage: async function() {
      if (this.reportPages.indexOf(this.selectedPage) == 0)
        this.disableButton = 0;
      else if (
        this.reportPages.indexOf(this.selectedPage) ==
        this.reportPages.length - 1
      )
        this.disableButton = 1;
      else this.disableButton = 2;
    }
  }
};
</script>
<style scoped>
/* Find the perfect size for report */
div#report-container {
  height: calc(0.5625 * 95vw);
}

@media only screen and (max-width: 575px) {
  div#report-container {
    height: calc(0.5625 * 100vw); 
  }
}
</style>
