<template>
  <div id="report-container" />
</template>
<script>
import { RotatingCard } from "@/components";
import { mapGetters, mapActions } from "vuex";
import * as pbi from "powerbi-client";

export default {
  components: {
    RotatingCard
  },
  name: "institution-reports",
  data() {
    return {
      cardRotating: {
        cardRotatingBg1: require("@/assets/img/examples/card-blog5.jpg"),
        cardRotatingBg2: require("@/assets/img/examples/card-blog6.jpg")
      }
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
    embedReport: function() {
      this.getReportConfig().then(reportLoadConfig => {
        let powerbi = new pbi.service.Service(
          pbi.factories.hpmFactory,
          pbi.factories.wpmpFactory,
          pbi.factories.routerFactory
        );

        var reportContainer = document.getElementById("report-container");

        var report = powerbi.embed(reportContainer, reportLoadConfig);

        // Clear any other loaded handler events
        report.off("loaded");

        // Clear any other rendered handler events
        report.off("rendered");

        report.on("error", function() {
          report.off("error");
        });
      });
    }
  },
  mounted: function() {
    this.embedReport();
  }
};
</script>
<style scoped>
div#report-container {
  height: calc(0.5625 * 61vw); /* 16:9 aspect ratio */
}

@media only screen and (max-width: 575px) {
  div#report-container {
    height: calc(0.5625 * 100vw); /* 16:9 aspect ratio */
  }
}
</style>
