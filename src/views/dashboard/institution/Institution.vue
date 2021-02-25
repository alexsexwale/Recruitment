<!-- TO-DO: The Layout of the page can be improved -->
<template>
  <div>
    <nav-tabs-card>
      <!-- TO-DO: Maybe a drop down or something similar to the setting button? -->
      <md-button
        slot="reports"
        v-for="page in reportPages"
        :key="page.Name"
        @click="pageNav(page.Name)"
        >{{ page.displayName }}</md-button
      >
    </nav-tabs-card>
    <div id="report-container" />
  </div>
</template>
<script>
import { ReportMenu } from "@/components";
import { mapGetters, mapActions } from "vuex";
import * as pbi from "powerbi-client";

export default {
  components: {
    ReportMenu
  },
  name: "institution-reports",
  data() {
    return {
      reportPages: [],
      report: null,
      selectedPage: null
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
    pageNav: async function(reportSection) {
      console.log(reportSection);
      let page = this.report.page(reportSection);
      await page.setActive();
      await this.report.setPage(reportSection);
    }
  },
  mounted: async function() {
    let reportConfig = await this.embedReport();
    this.report = reportConfig.report;
    reportConfig.pages.forEach(element => {
      this.reportPages.push(element);
    });
  }
};
</script>
<style scoped>
/* Find the perfect size for report */
div#report-container {
  height: calc(0.5625 * 65vw); /* 16:9 aspect ratio */
}

@media only screen and (max-width: 575px) {
  div#report-container {
    height: calc(0.5625 * 100vw); /* 16:9 aspect ratio */
  }
}
</style>
