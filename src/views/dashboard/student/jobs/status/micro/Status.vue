<template>
  <div class="content">
    <md-card class="padding">
      <Select v-if="select" />
      <Active v-if="active" />
      <Complete v-if="complete" />
      <Incomplete v-if="incomplete" />
      <Dissatisfied v-if="dissatisfied" />
      <Rate v-if="rate" />
      <Summary v-if="summary" />
    </md-card>
  </div>
</template>
<script>
import db from '@/firebase/init';
import Select from './flow/select/Select.vue';
import Active from './flow/active/Active.vue';
import Complete from './flow/complete/Complete.vue';
import Incomplete from './flow/incomplete/Incomplete.vue';
import Dissatisfied from './flow/dissatisfied/Dissatisfied.vue';
import Rate from './flow/rate/Rate.vue';
import Summary from './flow/summary/Summary.vue';

export default {
  components: {
    Select,
    Active,
    Complete,
    Incomplete,
    Dissatisfied,
    Rate,
    Summary
  },
  data() {
    return {
      job: {},
      select: false,
      active: false,
      complete: false,
      incomplete: false,
      dissatisfied: false,
      rate: false,
      summary: false
    }
  },
  methods: {
    status() {
      if(this.job.status == "select")
        this.select = true;
      else
        this.select = false;

      if(this.job.status == "active")
        this.active = true;
      else
        this.active = false;

      if(this.job.status == "complete")
        this.complete = true;
      else
        this.complete = false;

      if(this.job.status == "incomplete")
        this.incomplete = true;
      else
        this.incomplete = false;

      if(this.job.status == "dissatisfied")
        this.dissatisfied = true;
      else
        this.dissatisfied = false;

      if(this.job.status == "rate")
        this.rate = true;
      else
        this.rate = false;
      
      if(this.job.status == "summary")
        this.summary = true;
      else
        this.summary = false;
    }
  },
  created() {
    let jobs = db.collection('micros');
    jobs.where('jobId', '==', this.$route.params.id).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.job = doc.data();

        db.collection('users').where('userId', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if(this.job.clientAlias === doc.data().alias) {
              this.loading = false;
              this.job.email = doc.data().email;
              this.job.phone = doc.data().phone;
            }
            else {
              // To do: put 404 page
              this.$router.go(-1); 
            }
          });
        });
        this.status();
      });
    });
    jobs.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.job = change.doc.data();
          this.status();
        }
      });
    });
  }
};
</script>
<style scoped>
.padding {
  padding: 20px;
}
.centre {
    text-align: center;
}
.button {
  max-width: 88px;
}
.margin {
  margin: auto;
}
</style>