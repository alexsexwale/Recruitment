<template>
    <div>
        <center><img src="@/assets/img/Unsuccessful Payment.png" alt="" height="200" width="200"></center>
        <h1 class="black" style="text-align:center">Your payment was unsuccessful.</h1>
        <h2 class="black" style="text-align:center">Click below to view the job status</h2>
        <center><md-button class="md-success" @click="status">back to status</md-button></center>
        <p style="text-align: center;">Call us at: <b>087 149 4394</b></p>
        <p style="text-align: center;">Email us at: <b><a style="color:blue" href="mailto:contact@jobox.co.za">contact@jobox.co.za</a></b></p>
    </div>
</template>
<script>
import firebase from 'firebase/app';
import db from '@/firebase/init';
import 'firebase/auth';
import 'firebase/firestore';
export default {
    methods: {
        status() {
          this.$router.push({ name: 'client-micro-status', params: {id: this.$route.params.id} });
        } 
    }
}
</script>