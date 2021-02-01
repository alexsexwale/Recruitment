<template>
  <div>
    <div v-if="loading" class="background"></div>
    <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"><div class="loading"></div></div></div>
    <h5 class="info-text">
      Let's start with the basic information
    </h5>
    <div class="md-layout">
      <notifications></notifications>
      <div class="md-layout-item md-size-40 md-small-size-100">
        <div class="picture-container">
          <div class="picture">
            <div v-if="!image">
              <img :src="avatar" class="picture-src" title="" />
            </div>
            <div v-else>
              <img :src="image" />
            </div>
            <input type="file" @change="previewImage" title="Profile Picture" accept="image/*" />
          </div>
          <h6 class="description">Profile Picture</h6>
          <!-- <h6 class="description">Currently disabled</h6> -->
        </div>
      </div>
      <div class="md-layout-item md-size-60 mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('companyName') && touched.companyName },
            { 'md-form-group': true },
            { 'md-error': errors.has('companyName') }
          ]">
          <md-icon><i class="fas fa-building"></i></md-icon>
          <label>Company Name</label>
          <md-input @change="addCompanyName" v-model="companyName" data-vv-name="companyName" type="text" name="companyName" required v-validate="modelValidations.companyName">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('companyName')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('companyName') && touched.companyName">done</md-icon>
          </slide-y-down-transition>
        </md-field>

        <md-field :class="[
            { 'md-valid': !errors.has('companyWebsite') && touched.companyWebsite },
            { 'md-form-group': true },
            { 'md-error': errors.has('companyWebsite') }
          ]">
          <md-icon><i class="fas fa-globe"></i></md-icon>
          <label>Company Website</label>
          <md-input @change="addCompanyWebsite" v-model="companyWebsite" data-vv-name="companyWebsite" type="text" name="companyWebsite" v-validate="modelValidations.companyWebsite">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('companyWebsite')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('companyWebsite') && touched.companyWebsite">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('companyCategory') && touched.companyCategory },
            { 'md-form-group': true },
            { 'md-error': errors.has('companyCategory') }
          ]">
          <md-icon><i class="fas fa-sitemap"></i></md-icon>
          <label>Company Category</label>
          <md-select class="pad" @input="addCompanyCategory" v-model="companyCategory" data-vv-name="companyCategory" name="select" required v-validate="modelValidations.companyCategory">
            <md-option v-for="(companyCategory, index) in companyCategorys" :key="index" :value="companyCategory">{{companyCategory}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('companyCategory')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('companyCategory') && touched.companyCategory">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('companySize') && touched.companySize },
            { 'md-form-group': true },
            { 'md-error': errors.has('companySize') }
          ]">
          <md-icon><i class="fas fa-sitemap"></i></md-icon>
          <label>Company Size</label>
          <md-select class="pad" @input="addCompanySize" v-model="companySize" data-vv-name="companySize" name="select" required v-validate="modelValidations.companySize">
            <md-option v-for="(sizeType, index) in sizeTypes" :key="index" :value="sizeType">{{sizeType}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('companySize')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('companySize') && touched.companySize">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-autocomplete class="industry" @input="addIndustry" v-model="industry" :md-options="industries" data-vv-name="industry" name="industry" required v-validate="modelValidations.industry" 
          :class="[
              { 'md-valid': !errors.has('industry') && touched.industry },
              { 'md-form-group': true },
              { 'md-error': errors.has('industry') }
            ]">
          <!-- <md-icon><i class="fas fa-industry"></i></md-icon> -->
          <label style="margin-left: 35px;">Industry</label>
          <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('industry')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('industry') && touched.industry">done</md-icon>
          </slide-y-down-transition>
        </md-autocomplete>
      </div>

      <md-field :class="[
          { 'md-valid': !errors.has('aboutMe') && touched.aboutMe },
          { 'md-error': errors.has('aboutMe') }
        ]">
        <label>About Us</label>
        <md-textarea @change="addAboutMe" v-model="aboutMe" data-vv-name="aboutMe" type="text" name="aboutMe" required v-validate="modelValidations.aboutMe"></md-textarea>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('aboutMe')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('aboutMe') && touched.aboutMe">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>
    <modal v-if="modal" @close="modalHide">
      <template slot="header">
        <h4 class="modal-title black">{{ header }}</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="modalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <p class="black">{{ body }}</p>
      </template>
      <template slot="footer">
        <div class="centre">
          <!-- Modal: Verify Email and continue creating account -->
          <md-button class="md-button md-success" @click="modalHide">Got it</md-button>
        </div>
      </template>
    </modal> 
  </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import { Modal } from "@/components";
import db from '@/firebase/init';
import firebase from 'firebase/app';
import moment from "moment";
import debounce from "debounce";
export default {
  components: {
    SlideYDownTransition,
    Modal
  },
  props: {
    avatar: {
      type: String,
      default: "./img/default-avatar.png"
    }
  },
  data() {
    return {
      alias: null,
      file: null,
      image:"",
      loading: null,
      modal: false,
      header: "",
      body: "",
      user: null,
      client: null,
      companyName: null,
      companyWebsite: null,
      vat: null,
      companySize: null,
      companyCategory: null,
      aboutMe: null,
      sizeTypes: [],
      industry: null,
      industries: [],
      companyCategorys: [],
      touched: {
        companyName: false,
        companyWebsite: false,
        vat: false,
        companySize: false,
        industry: false,
        aboutMe: false
      },
      modelValidations: {
        companyName: {
          required: true
        },
        companyWebsite: {
          required: true
        },
        vat: {
          required: true,
          min: 10,
          max: 10
        },
        companySize: {
          required: true
        },
        industry: {
          required: true
        },
        aboutMe: {
          required: true
        }
      }
    };
  },
  methods: {
    previewImage(event) {
      var file = event.target.files[0];
      if(!file) {
        
      }
      else if(file.size < 2 * 1024 * 1024) { // less than 2MB
        this.fileUpload(file);
      }
      else {
        this.modal = true;
        this.header = "Whoa there! ✋";
        this.body = "You cannot exceed the file limit of 2MB";
      }
    },
    fileUpload(data) {
      this.loading = true;
      const storageRef = firebase.storage().ref().child('users/clients/' + this.alias + '/profile/' + data.name).put(data);
      storageRef.on(`state_changed`, snapshot => {
      }, error => {
        console.log(error.message);
      }, () => {
        storageRef.snapshot.ref.getDownloadURL().then(url => {
          this.image = url;
          this.updateAccount();
          this.loading = false;
        });
      });
    },
    modalHide() {
      this.modal = false;
    },
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit("on-validated", res);
        return res;
      });
    },
    debouncedUpdate: debounce(function() {
      this.updateAccount();
    }, 1500),
    updateAccount() {
      this.client.get().then(doc => {
        if(doc.exists) {
          if(this.companyName) {
            this.client.update({
              companyName: this.companyName,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.companyWebsite) {
            this.client.update({
              website: this.companyWebsite,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.phoneNumber) {
            this.client.update({
              phoneNumber: this.phoneNumber,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.vat) {
            this.client.update({
              vat: this.vat,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.companyCategory) {
            this.client.update({
              companyCategory: this.companyCategory,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.companySize) {
            this.client.update({
              companySize: this.companySize,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.industry) {
            this.client.update({
              industry: this.industry,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.aboutMe) {
            this.client.update({
              bio: this.aboutMe,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.image) {
            this.client.update({
              profile: this.image,
              lastModified: moment(Date.now()).format('L')
            });
          }
        }
        if(doc.exists === false) {
          this.client.set({
            userId: this.user.uid,
            created: moment(Date.now()).format('L'),
            lastModified: moment(Date.now()).format('L'),
            companyName: this.companyName,
            website: this.companyWebsite,
            vat: this.vat,
            companySize: this.companySize,
            companyCategory: this.companyCategory,
            industry: this.industry,
            bio: this.aboutMe,
            addressLine1: null,
            city: null,
            province_state: null,
            postalCode_zipCode: null,
            country: "South Africa",
            profilePicture: null,
            accountCreated: false,
            profile: this.image
          });
          if(this.image) {
            this.client.update({
              profile: this.image,
              lastModified: moment(Date.now()).format('L')
            });
          }
        }
        this.$notify(
        {
          message: 'Your data has been automatically saved!',
          icon: 'add_alert',
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: 'success'
        });
      });
    },
    addCompanyName: function() {
      this.$emit("companyName", this.companyName);
      this.debouncedUpdate();
    },
    addCompanyWebsite: function() {
      this.$emit("companyWebsite", this.companyWebsite);
      this.debouncedUpdate();
    },
    addVat: function() {
      this.$emit("vat", this.vat);
      this.debouncedUpdate();
    },
    addCompanySize: function() {
      this.$emit("companySize", this.companySize);
      this.debouncedUpdate();
    },
    addCompanyCategory: function() {
      this.$emit("companySize", this.companyCategory);
      this.debouncedUpdate();
    },
    addIndustry: function() {
      this.$emit("industry", this.industry);
      this.debouncedUpdate();
    },
    addAboutMe: function() {
      this.$emit("aboutMe", this.aboutMe);
      this.debouncedUpdate();
    }
  },
  watch: {
    companyName() {
      this.touched.companyName = true;
    },
    companyWebsite() {
      this.touched.companyWebsite = true;
    },
    vat() {
      this.touched.vat = true;
    },
    companySize() {
      this.touched.companySize = true;
    },
    industry() {
      this.touched.industry = true;
    },
    aboutMe() {
      this.touched.aboutMe = true;
    }
  },
  created() {
    let settings = db.collection('Settings').doc('Drop-down Lists');
    settings.get().then(doc => {
      this.industries = doc.data().Industries;
      this.sizeTypes = doc.data().CompanySizes;
      this.companyCategorys = doc.data().CompanyCategory;
    });

    this.user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', this.user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.alias = doc.id;
        this.client = db.collection('clients').doc(doc.id);
        this.client.get().then(doc => {
          if(doc.exists) {
            this.companyName = doc.data().companyName;
            this.companyWebsite = doc.data().website;
            this.vat = doc.data().vat;
            this.companySize = doc.data().companySize;
            this.companyCategory = doc.data().companyCategory;
            this.industry = doc.data().industry;
            this.aboutMe = doc.data().bio;
            this.image = doc.data().profile;
          }
        })
        .catch(err => {
          console.log(err.message);
        });
      });
    });
  }
};
</script>
<style scoped>
@media only screen and (max-width: 768px) {
  .md-field label {
    font-size: 11px;
  }
}
.industry {
  padding-left: 35px;
}
</style>
