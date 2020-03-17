<template>
  <div class="content">
    <md-card class="padding">
      <Select v-if="select" />
      <Active v-if="active" />
      <Complete v-if="complete" />
      <Rate v-if="rate" />
    </md-card>
  </div>
</template>
<script>
import db from '@/firebase/init';
import Select from './micro/flow/select/Select.vue';
import Active from './micro/flow/active/Active.vue';
import Complete from './micro/flow/complete/Complete.vue';
import Rate from './micro/flow/rate/Rate.vue';

export default {
  components: {
    Select,
    Active,
    Complete,
    Rate
  },
  data() {
    return {
      job: {},
      select: false,
      active: false,
      complete: false,
      rate: false
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

      if(this.job.status == "rate")
        this.rate = true;
      else
        this.rate = false;
    }
  },
  created() {
    let jobs = db.collection('micros');
    jobs.where('jobId', '==', this.$route.params.id).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.job = doc.data();
        this.status();
      })
    })
    jobs.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.job = change.doc.data();
          this.status();
        }
      })
    })
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