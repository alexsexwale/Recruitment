<template>
  <div>
    <h5 class="info-text">
      Let's start with the basic information (with validation)
    </h5>
    <div class="md-layout">
      <!-- <div class="md-layout-item md-size-40 md-small-size-100">
        <div class="picture-container">
          <div class="picture">
            <div v-if="!image">
              <img :src="avatar" class="picture-src" title="" />
            </div>
            <div v-else>
              <img :src="image" />
            </div>
            <input type="file" @change="onFileChange" />
          </div>
          <h6 class="description">Profile Picture</h6>
        </div>
      </div> -->
      <div class="md-layout-item md-size-60 mt-4 md-small-size-100">
        <md-field
          :class="[
            { 'md-valid': !errors.has('firstName') && touched.firstName },
            { 'md-form-group': true },
            { 'md-error': errors.has('firstName') }
          ]">
          <md-icon>face</md-icon>
          <label>First Name</label>
          <md-input @change="addFirstName" v-model="firstName" data-vv-name="firstName" type="text" name="firstName" required v-validate="modelValidations.firstName"></md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('firstName')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('firstName') && touched.firstName">done</md-icon>
          </slide-y-down-transition>
        </md-field>

        <md-field :class="[
            { 'md-valid': !errors.has('lastName') && touched.lastName },
            { 'md-form-group': true },
            { 'md-error': errors.has('lastName') }
          ]">
          <md-icon>record_voice_over</md-icon>
          <label>Last Name</label>
          <md-input @change="addLastName" v-model="lastName" data-vv-name="lastName" type="text" name="lastName" required v-validate="modelValidations.lastName">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('lastName')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('lastName') && touched.lastName">done</md-icon>
          </slide-y-down-transition>
        </md-field>
        <md-field :class="[
            { 'md-valid': !errors.has('phoneNumber') && touched.phoneNumber },
            { 'md-form-group': true },
            { 'md-error': errors.has('phoneNumber') }
          ]">
          <md-icon>phone</md-icon>
          <label>Phone Number</label>
          <md-input @change="addPhoneNumber" v-model="phoneNumber" data-vv-name="phoneNumber" type="text" name="phoneNumber" required v-validate="modelValidations.phoneNumber">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('phoneNumber')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('phoneNumber') && touched.phoneNumber">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('companyName') && touched.companyName },
            { 'md-form-group': true },
            { 'md-error': errors.has('companyName') }
          ]">
          <md-icon>email</md-icon>
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
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('companyWebsite') && touched.companyWebsite },
            { 'md-form-group': true },
            { 'md-error': errors.has('companyWebsite') }
          ]">
          <md-icon>http</md-icon>
          <label>Company Website</label>
          <md-input @change="addCompanyWebsite" v-model="companyWebsite" data-vv-name="companyWebsite" type="text" name="companyWebsite" required v-validate="modelValidations.companyWebsite">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('companyWebsite')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('companyWebsite') && touched.companyWebsite">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('vat') && touched.vat },
            { 'md-form-group': true },
            { 'md-error': errors.has('vat') }
          ]">
          <md-icon>email</md-icon>
          <label>VAT No.</label>
          <md-input @change="addVat" v-model="vat" data-vv-name="vat" type="text" name="vat" required v-validate="modelValidations.vat">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('vat')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('vat') && touched.vat">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
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
          <label v-if="companyName == null || companyName == ''">About Me</label>
          <label v-else>About Us</label>
          <md-textarea @change="addAboutMe" v-model="aboutMe" data-vv-name="aboutMe" type="text" name="aboutMe" required v-validate="modelValidations.aboutMe"></md-textarea>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('aboutMe')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('aboutMe') && touched.aboutMe">done</md-icon>
          </slide-y-down-transition>
        </md-field>
    </div>
  </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import db from '@/firebase/init';
import firebase, { storage } from 'firebase/app';
export default {
  components: {
    SlideYDownTransition
  },
  props: {
    avatar: {
      type: String,
      default: "./img/default-avatar.png"
    }
  },
  data() {
    return {
      image: null,
      firstName: null,
      lastName: null,
      companyName: null,
      companyWebsite: null,
      phoneNumber: null,
      vat: null,
      companySize: null,
      sizeTypes: [],
      industry: null,
      aboutMe: null,
      industries: [],
      touched: {
        firstName: false,
        lastName: false,
        companyName: false,
        companyWebsite: false,
        phoneNumber: false,
        vat: false,
        companySize: false,
        industry: false,
        aboutMe: false
      },
      modelValidations: {
        firstName: {
          required: true
        },
        lastName: {
          required: true
        },
        companyName: {
          required: true
        },
        companyWebsite: {
          required: true
        },
        phoneNumber: {
          required: true,
          min: 10,
          max: 10
        },
        vat: {
          required: true
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
    handlePreview(file) {
      this.model.imageUrl = URL.createObjectURL(file.raw);
    },
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit("on-validated", res);
        return res;
      });
    },
    onFileChange(e) {
      let file = e.target.files[0];
      let storageRef = firebase.storage().ref('profile/' + file.name);
      this.image = storageRef;
      this.$emit("image", this.image);
      //storageRef.put(file);

      // var files = e.target.files || e.dataTransfer.files;
      // if (!files.length) return;
      // this.createImage(files[0]);
    },
    // createImage(file) {
    //   var reader = new FileReader();
    //   var vm = this;

    //   reader.onload = e => {
    //     vm.image = e.target.result;
    //   };
    //   reader.readAsDataURL(file);
    // },
    addFirstName: function() {
      this.$emit("firstName", this.firstName);
    },
    addLastName: function() {
      this.$emit("lastName", this.lastName);
    },
    addCompanyName: function() {
      this.$emit("companyName", this.companyName);
    },
    addCompanyWebsite: function() {
      this.$emit("companyWebsite", this.companyWebsite);
    },
    addPhoneNumber: function() {
      this.$emit("phoneNumber", this.phoneNumber);
    },
    addVat: function() {
      this.$emit("vat", this.vat);
    },
    addCompanySize: function() {
      this.$emit("companySize", this.companySize);
    },
    addIndustry: function() {
      this.$emit("industry", this.industry);
    },
    addAboutMe: function() {
      this.$emit("aboutMe", this.aboutMe);
    }
  },
  watch: {
    firstName() {
      this.touched.firstName = true;
    },
    lastName() {
      this.touched.lastName = true;
    },
    companyName() {
      this.touched.companyName = true;
    },
    companyWebsite() {
      this.touched.companyWebsite = true;
    },
    phoneNumber() {
      this.touched.phoneNumber = true;
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
    let user = firebase.auth().currentUser;
    let client = db.collection('clients');
    let clientUser = db.collection('users');
    clientUser.where('userId', '==', user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.firstName = doc.data().name;
        this.lastName = doc.data().surname;
        this.phoneNumber = doc.data().phone;
      });
    });

    client.where('userId', '==', user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.companyName = doc.data().companyName;
        this.companyWebsite = doc.data().website;
        this.vat = doc.data().vat;
        this.companySize = doc.data().companySize;
        this.industry = doc.data().industry;
        this.aboutMe = doc.data().bio;
      });
    });

    let settings = db.collection('Settings').doc('Drop-down Lists');
    settings.get().then(doc => {
      this.industries = doc.data().Industries;
      this.sizeTypes = doc.data().CompanySizes;
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
