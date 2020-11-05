<template>
    <div class="md-layout">

    </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import db from '@/firebase/init';
import firebase from 'firebase/app';
import debounce from "debounce";
import moment from "moment";
export default {
    name: 'wits',
    components: {
      SlideYDownTransition
    },
    data() {
        return {
          user: null,
          student: null,
          graduates: null,
          faculty: null,
          degree: null,
          year: null,
          graduateStatus: null,
        }
    },
    methods: {
      debouncedUpdate: debounce(function() {
        this.updateAccount();
      }, 1500),
      validate() {
        return this.$validator.validateAll().then(res => {
          this.$emit("on-validated", res);
          return res;
        });
      }
    },
    watch: {

    },
    created() {
      let settings = db.collection('Settings').doc('Drop-down Lists');
      settings.get().then(doc => {
        this.graduates = doc.data().Graduates;
      });
    }
}
</script>