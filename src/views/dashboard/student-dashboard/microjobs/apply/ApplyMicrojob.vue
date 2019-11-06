<template>
  <div class="md-layout">
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
          <a href="#pablo">Graphic Designer</a>
        </h4>
        <div slot="description" class="card-description">
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to "Naviglio" where you can enjoy the main night life in
          Barcelona.
        </div>
        <template slot="footer">
          <div class="price">
            <h4>R1000/budget</h4>
          </div>
          <div class="stats">
            <p class="category">
              <md-icon>place</md-icon>
              Location, Remote
            </p>
          </div>
        </template>
      </product-card>
    </div>
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
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
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
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
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
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
  AnimatedNumber
} from "@/components";

export default {
  components: {
    StatsCard,
    ChartCard,
    AnimatedNumber,
    ProductCard
  },
  data() {
    return {
      product1: "/img/dashboard/client/card-1.jpg",
      product2: "/img/dashboard/client/card-1.jpg",
      product3: "/img/dashboard/client/card-1.jpg",
      seq2: 0
    };
  }
};
</script>
