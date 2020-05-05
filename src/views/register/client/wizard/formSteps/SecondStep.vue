<template>
  <div>
    <h5 class="info-text">
      Let us know where your workplace is located?
    </h5>
    <div class="md-layout">
      <notifications></notifications>
      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('addressLine1') && touched.addressLine1 },
            { 'md-form-group': true },
            { 'md-error': errors.has('addressLine1') }
          ]">
          <md-icon><i class="fas fa-map-pin"></i></md-icon>
          <label>Address Line 1</label>
          <md-input @change="addAddressLine1" v-model="addressLine1" data-vv-name="addressLine1" type="text" name="addressLine1" required v-validate="modelValidations.addressLine1">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('email')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('email') && touched.email">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('addressLine2') && touched.addressLine2 },
            { 'md-form-group': true },
            { 'md-error': errors.has('addressLine2') }
          ]">
          <md-icon><i class="fas fa-map-pin"></i></md-icon>
          <label>Address Line 2</label>
          <md-input @change="addAddressLine2" v-model="addressLine2" data-vv-name="addressLine2" type="text" name="addressLine2">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('addressLine2')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('addressLine2') && touched.addressLine2">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('city') && touched.city },
            { 'md-form-group': true },
            { 'md-error': errors.has('city') }
          ]">
          <md-icon><i class="fas fa-city"></i></md-icon>
          <label>City</label>
          <md-input @change="addCity" v-model="city" data-vv-name="city" type="text" name="city" required v-validate="modelValidations.city">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('city')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('city') && touched.city">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('province') && touched.province },
            { 'md-form-group': true },
            { 'md-error': errors.has('province') }
          ]">
          <md-icon><i class="fas fa-map-marked-alt"></i></md-icon>
          <label for="select">Province</label>
          <md-select class="pad" @input="addProvince" v-model="province" data-vv-name="province" type="text" name="province" required v-validate="modelValidations.province">
            <md-option v-for="(province, index) in provinces" :key="index" :value="province">{{province}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('province')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('province') && touched.province">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('postalCode') && touched.postalCode },
            { 'md-form-group': true },
            { 'md-error': errors.has('postalCode') }
          ]">
          <md-icon><i class="fas fa-mail-bulk"></i></md-icon>
          <label>Postal Code</label>
          <md-input @change="addPostalCode" v-model="postalCode" data-vv-name="postalCode" type="number" name="postalCode" required v-validate="modelValidations.postalCode">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('postalCode')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('postalCode') && touched.postalCode">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>
    </div>
  </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import db from '@/firebase/init';
import firebase from 'firebase/app';
import debounce from "debounce";
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
      user: null,
      client: null,
      addressLine1: null,
      addressLine2: null,
      city: null,
      province: null,
      postalCode: null,
      provinces:[],
      touched: {
        addressLine1: false,
        addressLine2: false,
        city: false,
        province: false,
        postalCode: false
      },
      modelValidations: {
        addressLine1: {
          required: true
        },
        city: {
          required: true
        },
        province: {
          required: true
        },
        postalCode: {
          required: true,
          min: 4
        }
      }
    };
  },
  methods: {
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
          if(this.addressLine1) {
            this.client.update({
              addressLine1: this.addressLine1
            });
          }
          if(this.addressLine2) {
            this.client.update({
              addressLine2: this.addressLine2
            });
          }
          if(this.city) {
            this.client.update({
              city: this.city
            });
          }
          if(this.province) {
            this.client.update({
              province_state: this.province
            });
          }
          if(this.postalCode) {
            this.client.update({
              postalCode_zipCode: this.postalCode
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
    addAddressLine1: function() {
      this.$emit("addressLine1", this.addressLine1);
      this.debouncedUpdate();
    },
    addAddressLine2: function() {
      this.$emit("addressLine2", this.addressLine2);
      this.debouncedUpdate();
    },
    addCity: function() {
      this.$emit("city", this.city);
      this.debouncedUpdate();
    },
    addProvince: function() {
      this.$emit("province", this.province);
      this.debouncedUpdate();
    },
    addPostalCode: function() {
      this.$emit("postalCode", this.postalCode);
      this.debouncedUpdate();
    }
  },
  watch: {
    addressLine1() {
      this.touched.addressLine1 = true;
    },
    addressLine2() {
      this.touched.addressLine2 = true;
    },
    city() {
      this.touched.city = true;
    },
    province() {
      this.touched.province = true;
    },
    postalCode() {
      this.touched.postalCode = true;
    }
  },
  created() {
    let settings = db.collection('Settings').doc('Drop-down Lists');
    settings.get().then(doc => {
      this.provinces = doc.data().Provinces;
    });

    this.user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', this.user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.client = db.collection('clients').doc(doc.id);
        this.client.get().then(doc => {
          if(doc.exists) {
            this.addressLine1 = doc.data().addressLine1;
            this.addressLine2 = doc.data().addressLine2;
            this.city = doc.data().city;
            this.province = doc.data().province_state;
            this.postalCode = doc.data().postalCode_zipCode;
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
</style>
