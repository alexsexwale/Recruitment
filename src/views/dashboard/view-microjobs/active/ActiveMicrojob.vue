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
          <router-link to="microjobs/edit"><md-icon>edit</md-icon></router-link>
          <md-tooltip md-direction="bottom">Edit</md-tooltip>
        </template>
        <template slot="third-button">
          <md-icon>close</md-icon>
          <md-tooltip md-direction="bottom">Remove</md-tooltip>
        </template>
        <h4 slot="title" class="title">
          Graphic Designer
        </h4>
        <div slot="description" class="card-description">
          Looking for a graphic designer to design a logo for a beverage company looking to rebrand. 
        </div>
        <template slot="footer">
          <div class="price">
            <i class="fas fa-money-bill-wave"></i> budget
            <h4 style="text-align:center;">R2500</h4>
          </div>
          <div class="price">
            <br><br>
            <i class="fas fa-calendar-week"></i> Deadline
            <h4 style="text-align:center;">18-Nov-2019</h4>
            <md-button class="md-success">View</md-button>
          </div>
          <div class="stats">
            <div class="price">
              <md-icon>place</md-icon> Location
              <h4 style="text-align:center;">Remote</h4>
            </div>
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
          Copywriter
        </h4>
        <div slot="description" class="card-description">
          Fancy your writing skills? We are looking for part-time short form writers 
          with great writing skills to publish education and career-related articles. Is that you?
        </div>
        <template slot="footer">
          <div class="price">
            <i class="fas fa-money-bill-wave"></i> budget
            <h4 style="text-align:center;">R1250</h4>
          </div>
          <div class="price">
            <br><br>
            <i class="fas fa-calendar-week"></i> Deadline
            <h4 style="text-align:center;">18-Nov-2019</h4>
            <md-button class="md-success">View</md-button>
          </div>
          <div class="stats">
            <div class="price">
              <md-icon>place</md-icon> Location
              <h4 style="text-align:center;">Remote</h4>
            </div>
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
          Data Entry Assistant
        </h4>
        <div slot="description" class="card-description">
          Looking for a blogger who will bring an authoritative understanding to topics related to 
          entertainment, tech, sports etc and yet still be able to write with the humor and levity 
          readers expect from a male lifestyle website.
        </div>
        <template slot="footer">
          <div class="price">
            <i class="fas fa-money-bill-wave"></i> budget
            <h4 style="text-align:center;">R1500</h4>
          </div>
          <div class="price">
            <br><br>
            <i class="fas fa-calendar-week"></i> Deadline
            <h4 style="text-align:center;">30-Nov-2019</h4>
            <md-button class="md-success">View</md-button>
          </div>
          <div class="stats">
            <div class="price">
              <md-icon>place</md-icon> Location
              <h4 style="text-align:center;">Remote</h4>
            </div>
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
          Blogger
        </h4>
        <div slot="description" class="card-description">
          Looking for a blogger who will bring an authoritative understanding 
          to topics related to entertainment, tech, sports etc and yet still be 
          able to write with the humor and levity readers expect from a male 
          lifestyle website.
        </div>
        <template slot="footer">
          <div class="price">
            <i class="fas fa-money-bill-wave"></i> budget
            <h4 style="text-align:center;">R4000</h4>
          </div>
          <div class="price">
            <br><br>
            <i class="fas fa-calendar-week"></i> Deadline
            <h4 style="text-align:center;">05-Dec-2019</h4>
            <md-button class="md-success">View</md-button>
          </div>
          <div class="stats">
            <div class="price">
              <md-icon>place</md-icon> Location
              <h4 style="text-align:center;">Remote</h4>
            </div>
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
          Content Writter
        </h4>
        <div slot="description" class="card-description">
          Focus of task is related to publishing feature articles focused on Fintech 
          throughout Africa, must be able to write clearly and conscicely.
        </div>
        <template slot="footer">
          <div class="price">
            <i class="fas fa-money-bill-wave"></i> budget
            <h4 style="text-align:center;">R1500</h4>
          </div>
          <div class="price">
            <br><br>
            <i class="fas fa-calendar-week"></i> Deadline
            <h4 style="text-align:center;">15-Nov-2019</h4>
            <md-button class="md-success">View</md-button>
          </div>
          <div class="stats">
            <div class="price">
              <md-icon>place</md-icon> Location
              <h4 style="text-align:center;">Remote</h4>
            </div>
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
          Transcriber
        </h4>
        <div slot="description" class="card-description">
          We are looking for students who can transcribe audio 
          content of radio and television interviews.
        </div>
        <template slot="footer">
          <div class="price">
            <i class="fas fa-money-bill-wave"></i> budget
            <h4 style="text-align:center;">R1800</h4>
          </div>
          <div class="price">
            <br><br>
            <i class="fas fa-calendar-week"></i> Deadline
            <h4 style="text-align:center;">23-Nov-2019</h4>
            <md-button class="md-success">View</md-button>
          </div>
          <div class="stats">
            <div class="price">
              <md-icon>place</md-icon> Location
              <h4 style="text-align:center;">Remote</h4>
            </div>
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
          Associate
        </h4>
        <div slot="description" class="card-description">
          Looking for associates to run door to door surveys in and around Cape Town. 
          Should be energetic, personable and dedicated.
        </div>
        <template slot="footer">
          <div class="price">
            <i class="fas fa-money-bill-wave"></i> budget
            <h4 style="text-align:center;">R6500</h4>
          </div>
          <div class="price">
            <br><br>
            <i class="fas fa-calendar-week"></i> Deadline
            <h4 style="text-align:center;">02-Dec-2019</h4>
            <md-button class="md-success">View</md-button>
          </div>
          <div class="stats">
            <div class="price">
              <md-icon>place</md-icon> Location
              <h4 style="text-align:center;">Cape Town</h4>
            </div>
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
          Graphic Designer
        </h4>
        <div slot="description" class="card-description">
           Graphic designing for our Menus and Promotions, occasional promotional videos, 
           design our Website for superior customer Experience, deliver high-quality, 
           on-brand graphics to support a superior customer experience.
        </div>
        <template slot="footer">
          <div class="price">
            <i class="fas fa-money-bill-wave"></i> budget
            <h4 style="text-align:center;">R5000</h4>
          </div>
          <div class="price">
            <br><br>
            <i class="fas fa-calendar-week"></i> Deadline
            <h4 style="text-align:center;">02-Dec-2019</h4>
            <md-button class="md-success">View</md-button>
          </div>
          <div class="stats">
            <div class="price">
              <md-icon>place</md-icon> Location
              <h4 style="text-align:center;">Pretoria</h4>
            </div>
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
          Book Keeping
        </h4>
        <div slot="description" class="card-description">
          Looking for an accounting student to do book keeping for a local retailer based in Johannesburg
        </div>
        <template slot="footer">
          <div class="price">
            <i class="fas fa-money-bill-wave"></i> budget
            <h4 style="text-align:center;">R2000</h4>
          </div>
          <div class="price">
            <br><br>
            <i class="fas fa-calendar-week"></i> Deadline
            <h4 style="text-align:center;">22-Nov-2019</h4>
            <md-button class="md-success">View</md-button>
          </div>
          <div class="stats">
            <div class="price">
              <md-icon>place</md-icon> Location
              <h4 style="text-align:center;">Braamfontein</h4>
            </div>
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
