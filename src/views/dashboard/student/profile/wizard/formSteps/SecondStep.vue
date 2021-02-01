<template>
  <div>
    <h5 class="info-text">
      Tell us about your studies
    </h5>
    <div class="md-layout">

      <div class="md-layout-item  ml-auto mt-4 md-small-size-100">
        <md-field :class="[
            { 'md-valid': !errors.has('institution') && touched.institution },
            { 'md-form-group': true },
            { 'md-error': errors.has('institution') }
          ]">
          <md-icon>school</md-icon>
          <label>Institution</label>
          <md-select class="pad" @input="addInstitution" v-model="institution" data-vv-name="institution" type="text" name="institution" required v-validate="modelValidations.institution">
            <md-option v-for="(institution, index) in institutions" :key="index" :value="institution">{{institution}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('institution')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('institution') && touched.institution">done</md-icon>
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
import 'firebase/auth';
import 'firebase/firestore';
import debounce from "debounce";
import moment from "moment";
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
      student: null,
      institution: null,
      institutions: [],
      touched: {
        institution: false
      },
      modelValidations: {
        institution: {
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
    debouncedUpdate: debounce(function() {
      this.updateAccount();
    }, 300),
    updateAccount() {
      this.student.get().then(doc => {
        if(doc.exists) {
          if(this.institutions) {
            this.student.update({
              institution: this.institution
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
    addInstitution: function() {
      this.$emit("institution", this.institution);
      this.debouncedUpdate();
    }
  },
  watch: {
    institution() {
      this.touched.institution = true;
    }
  },
  created() {
    let settings = db.collection('Settings').doc('Drop-down Lists');
    settings.get().then(doc => { 
      this.institutions = doc.data().Institutions;
    });

    this.user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', this.user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.student = db.collection('students').doc(doc.id);
        this.student.get().then(doc => {
          if(doc.exists) {
            this.institution = doc.data().institution;
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
