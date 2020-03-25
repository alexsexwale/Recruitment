<template>
  <div>
    <h5 class="info-text">
      What are your banking details
    </h5>
    <div class="md-layout">

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('accountName') && touched.accountName },
            { 'md-form-group': true },
            { 'md-error': errors.has('accountName') }
          ]">
          <md-icon>school</md-icon>
          <label>Account Holder</label>
          <md-input @change="addAccountName" v-model="accountName" data-vv-name="accountName" type="text" name="accountName" required v-validate="modelValidations.accountName">
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
            { 'md-valid': !errors.has('accountNumber') && touched.accountNumber },
            { 'md-form-group': true },
            { 'md-error': errors.has('accountNumber') }
          ]">
          <md-icon>school</md-icon>
          <label>Account Number</label>
          <md-input @change="addAccountNumber" v-model="accountNumber" data-vv-name="accountNumber" type="text" name="accountNumber" required v-validate="modelValidations.accountNumber">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('accountNumber')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('accountNumber') && touched.accountNumber">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('accountType') && touched.accountType },
            { 'md-form-group': true },
            { 'md-error': errors.has('accountType') }
          ]">
          <md-icon>school</md-icon>
          <label>Account Type</label>
          <md-input @change="addAccountType" v-model="accountType" data-vv-name="accountType" type="text" name="accountType" required v-validate="modelValidations.accountType">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('accountType')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('accountType') && touched.accountType">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('bankName') && touched.bankName },
            { 'md-form-group': true },
            { 'md-error': errors.has('bankName') }
          ]">
          <md-icon>school</md-icon>
          <label>Bank Name</label>
          <md-input @change="addBankName" v-model="bankName" data-vv-name="bankName" type="text" name="bankName" required v-validate="modelValidations.bankName">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('bankName')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('bankName') && touched.bankName">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('branchCode') && touched.branchCode },
            { 'md-form-group': true },
            { 'md-error': errors.has('branchCode') }
          ]">
          <md-icon>school</md-icon>
          <label>Branch Code</label>
          <md-input @change="addBranchCode" v-model="branchCode" data-vv-name="branchCode" type="text" name="branchCode" required v-validate="modelValidations.branchCode">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('branchCode')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('branchCode') && touched.branchCode">done</md-icon>
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
  data() {
    return {
      accountName: null,
      accountNumber: null,
      accountType: null,
      bankName: null,
      branchCode: null,
      touched: {
        accountName: false,
        accountNumber: false,
        accountType: false,
        bankName: false,
        branchCode: false
      },
      modelValidations: {
        accountName: {
          required: true
        },
        accountNumber: {
          required: true
        },
        accountType: {
          required: true
        },
        bankName: {
          required: true
        },
        branchCode: {
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
    addAccountName: function() {
      this.$emit("accountName", this.accountName);
    },
    addAccountNumber: function() {
      this.$emit("accountNumber", this.accountNumber);
    },
    addAccountType: function() {
      this.$emit("accountType", this.accountType);
    },
    addBankName: function() {
      this.$emit("bankName", this.bankName);
    },
    addBranchCode: function() {
      this.$emit("branchCode", this.branchCode);
    }
  },
  watch: {
    accountName() {
      this.touched.accountName = true;
    },
    accountNumber() {
      this.touched.accountNumber = true;
    },
    accountType() {
      this.touched.accountType = true;
    },
    bankName() {
      this.touched.bankName = true;
    },
    branchCode() {
      this.touched.branchCode = true;
    }
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
