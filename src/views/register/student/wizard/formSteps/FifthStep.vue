<template>
  <div>
    <h5 class="info-text">
      What are your banking details, so that we can pay you for each job?
    </h5>
    <p class="info-text">Jobs will be paid directly to your bank account through the platform.</p>
      <div class="md-layout">
      <notifications></notifications>
      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('accountName') && touched.accountName },
            { 'md-form-group': true },
            { 'md-error': errors.has('accountName') }
          ]">
          <md-icon><i class="fas fa-address-card"></i></md-icon>
          <label>Account Holder</label>
          <md-input @change="addAccountName" v-model="accountName" data-vv-name="accountName" type="text" name="accountName" required v-validate="modelValidations.accountName">
          </md-input>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('accountName')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('accountName') && touched.email">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('accountNumber') && touched.accountNumber },
            { 'md-form-group': true },
            { 'md-error': errors.has('accountNumber') }
          ]">
          <md-icon><i class="fas fa-wallet"></i></md-icon>
          <label>Account Number</label>
          <md-input @change="addAccountNumber" v-model="accountNumber" data-vv-name="accountNumber" type="number" name="accountNumber" required v-validate="modelValidations.accountNumber">
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
          <md-icon><i class="fas fa-piggy-bank"></i></md-icon>
          <label>Account Type</label>
          <md-select class="pad" @input="addAccountType" v-model="accountType" data-vv-name="accountType" type="text" name="accountType" required v-validate="modelValidations.accountType">
            <md-option v-for="(accountType, index) in accountTypes" :key="index" :value="accountType">{{accountType}}</md-option>
          </md-select>
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
          <md-icon><i class="fas fa-university"></i></md-icon>
          <label>Bank Name</label>
          <md-select class="pad" @input="addBankName" v-model="bankName" data-vv-name="bankName" type="text" name="bankName" required v-validate="modelValidations.bankName">
            <md-option v-for="(bankName, index) in bankNames" :key="index" :value="bankName">{{bankName}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('bankName')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('bankName') && touched.bankName">done</md-icon>
          </slide-y-down-transition>
        </md-field>
      </div>

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :md-counter="false" :class="[
            { 'md-valid': !errors.has('branchCode') && touched.branchCode },
            { 'md-form-group': true },
            { 'md-error': errors.has('branchCode') }
          ]">
          <md-icon><i class="fas fa-stamp"></i></md-icon>
          <label>Branch Code</label>
          <md-input @change="addBranchCode" v-model="branchCode" data-vv-name="branchCode" type="number" name="branchCode" required v-validate="modelValidations.branchCode" maxlength="6" :readonly="branchCode">
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
import db from '@/firebase/init';
import firebase from 'firebase/app';
import debounce from "debounce";
import moment from "moment";
export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      user: null,
      student: null,
      accountName: null,
      accountNumber: null,
      accountType: null,
      bankName: null,
      branchCode: null,
      accountTypes: [],
      bankNames: [],
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
          required: true,
          min: 4,
          max: 11
        },
        accountType: {
          required: true
        },
        bankName: {
          required: true
        },
        branchCode: {
          required: true,
          min: 6,
          max: 6
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
    debouncedUpdate: debounce(function() {
      this.updateAccount();
    }, 1500),
    updateAccount() {
      this.student.get().then(async doc => {
        if(doc.exists) {
          if(this.accountName) {
            this.student.update({
              accountName: this.accountName,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.accountNumber) {
            this.student.update({
              accountNumber: this.accountNumber,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.accountType) {
            this.student.update({
              accountType: this.accountType,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.bankName) {
            let banks = db.collection('Settings').doc('Banks');
            let branches = banks.collection('Branches').doc(this.bankName);

            await branches.get().then(doc => {
              console.log(doc.exists)
              if(doc.exists)
                this.branchCode = doc.data().BranchCode;
              else
                this.branchCode = null;
            });

            this.student.update({
              bankName: this.bankName,
              branchCode: this.branchCode,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.branchCode) {
            this.student.update({
              branchCode: this.branchCode,
              lastModified: moment(Date.now()).format('L')
            });
          }
        }
      });
      this.$notify(
      {
        message: 'Your data has been automatically saved!',
        icon: 'add_alert',
        horizontalAlign: 'center',
        verticalAlign: 'top',
        type: 'success'
      });
    },
    addAccountName: function() {
      this.$emit("accountName", this.accountName);
      this.debouncedUpdate();
    },
    addAccountNumber: function() {
      this.$emit("accountNumber", this.accountNumber);
      this.debouncedUpdate();
    },
    addAccountType: function() {
      this.$emit("accountType", this.accountType);
      this.debouncedUpdate();
    },
    addBankName: function() {
      this.$emit("bankName", this.bankName);
      this.debouncedUpdate();
    },
    addBranchCode: function() {
      this.$emit("branchCode", this.branchCode);
      this.debouncedUpdate();
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
  },
  created() {
    this.user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', this.user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let settings = db.collection('Settings').doc('Drop-down Lists');
        settings.get().then(doc => {
          this.accountTypes = doc.data().AccountTypes;
          this.bankNames = doc.data().Banks;
        });
        this.student = db.collection('students').doc(doc.id);
        this.student.get().then(doc => {
          if(doc.exists) {
            this.accountName = doc.data().accountName;
            this.accountNumber = doc.data().accountNumber;
            this.accountType = doc.data().accountType;
            this.bankName = doc.data().bankName;
            this.branchCode = doc.data().branchCode;
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
