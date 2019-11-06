<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="blue">
        <template slot="header">
          <div class="card-icon">
            <i class="fas fa-coins"></i>
          </div>
          <p class="category">Revenue Made Last Month</p>
          <h3 class="title">R<animated-number :value="2000"></animated-number></h3>
        </template>

        <template slot="footer">
          <div class="stats"><md-icon>date_range</md-icon> June</div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="rose">
        <template slot="header">
          <div class="card-icon">
            <i class="fas fa-coins"></i>
          </div>
          <p class="category">Revenue Made This Month</p>
          <h3 class="title">R<animated-number :value="5000"></animated-number></h3>
        </template>

        <template slot="footer">
          <div class="stats"><md-icon>date_range</md-icon> July</div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="green">
        <template slot="header">
          <div class="card-icon">
            <i class="fas fa-business-time"></i>
          </div>
          <p class="category">Jobs Completed Last Month</p>
          <h3 class="title"><animated-number :value="20"></animated-number></h3>
        </template>

        <template slot="footer">
          <div class="stats"><div class="stats"><md-icon>date_range</md-icon> June</div></div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="warning">
        <template slot="header">
          <div class="card-icon">
            <i class="fas fa-briefcase"></i>
          </div>
          <p class="category">Jobs Completed This Month</p>
          <h3 class="title">
            <animated-number :value="2"></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <div class="stats"><md-icon>date_range</md-icon> July</div>
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
      <chart-card
        header-animation="true"
        :chart-data="emailsSubscriptionChart.data"
        :chart-options="emailsSubscriptionChart.options"
        :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
        chart-type="Bar"
        chart-inside-header
        background-color="rose"
      >
        <md-icon slot="fixed-button">build</md-icon>
        <md-button class="md-simple md-info md-just-icon" slot="first-button">
          <md-icon>refresh</md-icon>
          <md-tooltip md-direction="bottom">Refresh</md-tooltip>
        </md-button>
        <md-button class="md-simple md-just-icon" slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Change Date</md-tooltip>
        </md-button>

        <template slot="content">
          <h4 class="title">Website Views</h4>
          <p class="category">
            Last Campaign Performance
          </p>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>access_time</md-icon>
            updated <animated-number :value="10"></animated-number> days ago
          </div>
        </template>
      </chart-card>
    </div>
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
      <chart-card
        :chart-data="dailySalesChart.data"
        :chart-options="dailySalesChart.options"
        chart-type="Line"
        chart-inside-header
        background-color="green"
      >
        <md-button class="md-simple md-info md-just-icon" slot="first-button">
          <md-icon>refresh</md-icon>
          <md-tooltip md-direction="bottom">Refresh</md-tooltip>
        </md-button>
        <md-button class="md-simple md-just-icon" slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Change Date</md-tooltip>
        </md-button>

        <template slot="content">
          <h4 class="title">Daily Sales</h4>
          <p class="category">
            <span class="text-success"
              ><i class="fas fa-long-arrow-alt-up"></i>
              <animated-number :value="55"></animated-number>%
            </span>
            increase in today sales.
          </p>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>access_time</md-icon>
            updated <animated-number :value="4"></animated-number> minutes ago
          </div>
        </template>
      </chart-card>
    </div>
    <h3 class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">Recent Projects</h3>
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
      <product-card header-animation="true">
        <img class="img" slot="imageHeader" :src="product1" />
        <md-icon slot="fixed-button">build</md-icon>
        <template slot="first-button">
          <md-icon>art_track</md-icon>
          <md-tooltip md-direction="bottom">View</md-tooltip>
        </template>
        <template slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Edit</md-tooltip>
        </template>
        <template slot="third-button">
          <md-icon>close</md-icon>
          <md-tooltip md-direction="bottom">Remove</md-tooltip>
        </template>
        <h4 slot="title" class="title">
          <a href="#pablo">Cozy 5 Stars Apartment</a>
        </h4>
        <div slot="description" class="card-description">
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to "Naviglio" where you can enjoy the main night life in
          Barcelona.
        </div>
        <template slot="footer">
          <div class="price">
            <h4>$899/night</h4>
          </div>
          <div class="stats">
            <p class="category">
              <md-icon>place</md-icon>
              Barcelona, Spain
            </p>
          </div>
        </template>
      </product-card>
    </div>
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
    >
      <product-card header-animation="true">
        <img class="img" slot="imageHeader" :src="product2" />
        <md-icon slot="fixed-button">build</md-icon>
        <template slot="first-button">
          <md-icon>art_track</md-icon>
          <md-tooltip md-direction="bottom">View</md-tooltip>
        </template>
        <template slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Edit</md-tooltip>
        </template>
        <template slot="third-button">
          <md-icon>close</md-icon>
          <md-tooltip md-direction="bottom">Remove</md-tooltip>
        </template>
        <h4 slot="title" class="title">
          <a href="#pablo">Office Studio</a>
        </h4>
        <div slot="description" class="card-description">
          The place is close to Metro Station and bus stop just 2 min by walk
          and near to "Naviglio" where you can enjoy the night life in London,
          UK.
        </div>
        <template slot="footer">
          <div class="price">
            <h4>$1.119/night</h4>
          </div>
          <div class="stats">
            <p class="category">
              <md-icon>place</md-icon>
              London, UK
            </p>
          </div>
        </template>
      </product-card>
    </div>
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
    >
      <product-card header-animation="true">
        <img class="img" slot="imageHeader" :src="product3" />
        <md-icon slot="fixed-button">build</md-icon>
        <template slot="first-button">
          <md-icon>art_track</md-icon>
          <md-tooltip md-direction="bottom">View</md-tooltip>
        </template>
        <template slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Edit</md-tooltip>
        </template>
        <template slot="third-button">
          <md-icon>close</md-icon>
          <md-tooltip md-direction="bottom">Remove</md-tooltip>
        </template>
        <h4 slot="title" class="title">
          <a href="#pablo">Beautiful Castle</a>
        </h4>
        <div slot="description" class="card-description">
          The place is close to Metro Station and bus stop just 2 min by walk
          and near to "Naviglio" where you can enjoy the main night life in
          Milan.
        </div>
        <template slot="footer">
          <div class="price">
            <h4>$459/night</h4>
          </div>
          <div class="stats">
            <p class="category">
              <md-icon>place</md-icon>
              Milan, Italy
            </p>
          </div>
        </template>
      </product-card>
    </div>
  </div>
</template>

<script>
import AsyncWorldMap from "@/components/WorldMap/AsyncWorldMap.vue";
import {
  StatsCard,
  ChartCard,
  ProductCard,
  AnimatedNumber,
  GlobalSalesCard,
  GlobalSalesTable
} from "@/components";

export default {
  components: {
    StatsCard,
    ChartCard,
    AnimatedNumber,
    ProductCard,
    GlobalSalesCard,
    GlobalSalesTable,
    AsyncWorldMap
  },
  data() {
    return {
      product1: "../img/dashboard/client/card-1.jpg",
      product2: "../img/dashboard/client/card-1.jpg",
      product3: "../img/dashboard/client/card-1.jpg",
      seq2: 0,
      mapData: {
        AU: 760,
        BR: 550,
        CA: 120,
        DE: 1300,
        FR: 540,
        GB: 690,
        GE: 200,
        IN: 200,
        RO: 600,
        RU: 300,
        US: 2920
      },
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]]
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De"
          ],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      }
    };
  }
};
</script>
