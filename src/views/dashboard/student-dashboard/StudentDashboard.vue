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
    <div class="md-layout-item md-large-size-33 md-medium-size-50 md-small-size-100">
      <rotating-card card-class="md-card-background" layer-background
        :front-card-image="cardRotating.cardRotatingBg1"
        :back-card-image="cardRotating.cardRotatingBg1">
        <template slot="frontRotateCardContent">
          <h6 class="card-category">
            Full Background Card
          </h6>
          <h3 class="card-title">
            This Background Card Will Rotate on Hover
          </h3>
          <p class="card-description">
            Don't be scared of the truth because we need to restart the
            human foundation in truth And I love you like Kanye loves
            Kanye I love Rick Owens’ bed design but the back is...
          </p>
        </template>
        <template slot="backRotateCardContent">
          <h5 class="card-title">
            Manage Post
          </h5>
          <p class="card-description">
            As an Admin, you have shortcuts to edit, view or delete the
            posts.
          </p>

          <md-button href="javascript:void(0)" class="md-info md-just-icon md-round">
            <md-icon>subject</md-icon>
          </md-button>
          <md-button href="javascript:void(0)" class="md-success md-just-icon md-round">
            <md-icon>mode_edit</md-icon>
          </md-button>
          <md-button href="javascript:void(0)" class="md-danger md-just-icon md-round">
            <md-icon>delete</md-icon>
          </md-button>
        </template>
      </rotating-card>
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
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
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
import {
  StatsCard,
  ChartCard,
  ProductCard,
  RotatingCard,
  AnimatedNumber,
  GlobalSalesCard,
  GlobalSalesTable
} from "@/components";

export default {
  components: {
    StatsCard,
    ChartCard,
    RotatingCard,
    AnimatedNumber,
    ProductCard,
    GlobalSalesCard,
    GlobalSalesTable
  },
  data() {
    return {
      product1: "/img/dashboard/client/card-1.jpg",
      product2: "/img/dashboard/client/card-1.jpg",
      product3: "/img/dashboard/client/card-1.jpg",
      cardRotating: {
        cardRotatingBg1: require("@/assets/img/examples/card-blog5.jpg"),
        cardRotatingBg2: require("@/assets/img/examples/card-blog6.jpg")
      },
    };
  }
};
</script>
