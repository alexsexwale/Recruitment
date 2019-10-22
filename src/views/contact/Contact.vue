<template>
<div>
    <div class="container">
        <div class="md-layout-item md-size-40 md-small-size-100">
        <h2 class="title">
            Pop us a message!
        </h2>
        <h5 class="description">
            Got questions? Want to tell us something? Looking for Advice?
        </h5>

        <h3 class="title">
            <md-icon style="color: white;">email</md-icon> Get in contact
        </h3>
        <h5 class="description">
            Having problems or just wanna say hi? <br/>
            Send us an email or contact us directly using the form!
        </h5>
        <p>contact@jobox.co.za</p>
        
        </div>
        <div class="md-layout-item md-size-40 md-small-size-100 ml-auto">
        <md-card class="md-card-contact">
            <md-card-header class="md-card-header-primary text-center">
            <h4 class="card-title">
                Contact Us
            </h4>
            </md-card-header>
            <md-card-content>
            <div class="md-layout">
                <div class="md-layout-item md-size-50 md-small-size-100">
                <md-field>
                    <label>First Name</label>
                    <md-input v-model="firstName" />
                </md-field>
                </div>
                <div class="md-layout-item md-size-50 md-small-size-100">
                <md-field>
                    <label>Last Name</label>
                    <md-input v-model="lastName" />
                </md-field>
                </div>
            </div>
            <md-field>
                <label>Email Adress</label>
                <md-input v-model="email" type="email"/>
            </md-field>

            <md-field>
                <label>Your Message</label>
                <md-textarea v-model="textarea" />
            </md-field>
            </md-card-content>
            <md-card-actions class="d-flex justify-content-between">
            <md-checkbox v-model="boolean">
                I'm not a robot
            </md-checkbox>
            <md-button class="md-primary">
                Send Message
            </md-button>
            </md-card-actions>
        </md-card>
        </div>
    </div>
    </div>
  
</template>

<script>
import { InfoAreas } from "@/components";
import Mixins from "@/plugins/basicMixins";

export default {
  components: {
    InfoAreas
  },
  data() {
    return {
      firstName: null,
      fullName: null,
      lastName: null,
      textarea: null,
      textarea1: null,
      email: null,
      email1: null,
      boolean: false
    };
  }
};
</script>

<style lang="scss" scoped>
.justify-content-between {
  justify-content: space-between !important;
}
.container {
}
</style>
