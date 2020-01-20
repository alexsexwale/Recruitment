<template>
  <div>
    <h5 class="info-text">
      Let us where your workplace located?
    </h5>
    <div class="md-layout">

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('addressLine1') && touched.addressLine1 },
            { 'md-form-group': true },
            { 'md-error': errors.has('addressLine1') }
          ]">
          <md-icon>school</md-icon>
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

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('addressLine2') && touched.addressLine2 },
            { 'md-form-group': true },
            { 'md-error': errors.has('addressLine2') }
          ]">
          <md-icon>school</md-icon>
          <label>Address Line 2</label>
          <md-input @change="addAddressLine2" v-model="addressLine2" data-vv-name="addressLine2" type="text" name="addressLine2" required v-validate="modelValidations.addressLine2">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('addressLine2')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('addressLine2') && touched.addressLine2">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('city') && touched.city },
            { 'md-form-group': true },
            { 'md-error': errors.has('city') }
          ]">
          <md-icon>school</md-icon>
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

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('province') && touched.province },
            { 'md-form-group': true },
            { 'md-error': errors.has('province') }
          ]">
          <md-icon>school</md-icon>
          <label>Province</label>
          <md-input @change="addProvince" v-model="province" data-vv-name="province" type="text" name="province" required v-validate="modelValidations.province">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('province')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('province') && touched.province">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('postalCode') && touched.postalCode },
            { 'md-form-group': true },
            { 'md-error': errors.has('postalCode') }
          ]">
          <md-icon>school</md-icon>
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
      // image: "",
      addressLine1: null,
      addressLine2: null,
      city: null,
      province: null,
      postalCode: null,
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
        addressLine2: {
          required: true
        },
        city: {
          required: true
        },
        province: {
          required: true
        },
        postalCode: {
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
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    addAddressLine1: function() {
      this.$emit("addressLine1", this.addressLine1);
    },
    addAddressLine2: function() {
      this.$emit("addressLine2", this.addressLine2);
    },
    addCity: function() {
      this.$emit("city", this.city);
    },
    addProvince: function() {
      this.$emit("province", this.province);
    },
    addPostalCode: function() {
      this.$emit("postalCode", this.postalCode);
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
  }
};
</script>
<style></style>
