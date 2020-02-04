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
import Select from './flow/select/Select.vue';
import Active from './flow/active/Active.vue';
import Complete from './flow/complete/Complete.vue';
import Rate from './flow/rate/Rate.vue';

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
      if(this.job.status == "active")
        this.active = true;
      if(this.job.status == "complete")
        this.complete = true;
      if(this.job.status == "rate")
        this.rate = true;
    }
  },
  created() {
    let jobs = db.collection('jobs');
    jobs.where('jobId', '==', this.$route.params.id).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.job = doc.data();
        this.status();
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