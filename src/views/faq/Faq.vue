<template>
  <div class="md-layout-item md-size-100 transparant">
    <md-card>
      <md-card-content>
        <h2><center>General</center></h2> 
        <collapse
          :collapse="[
            'Who is Jobox?',
            'What is a Microjob',
            'What is holding payment in escrow',
            'Do I have to pay a monthly subscription?',
            'Who is Sage Pay',
            'How much do you take from every microjob that is done?',
            'Can I have both a student and a client account?',
            'How does my rating and reviewing system work?']"
          icon="keyboard_arrow_down"
          color-collapse="success">
            <template slot="md-collapse-pane-1">
              <p>Jobox is an online microjob platform that connects vetted and verified freelancers and clients to get things done more easily. Jobox improves the way you work by using a simple and secure platform to facilitate the entire process of working together, from project conception to final payment</p>
            </template>
            <template slot="md-collapse-pane-2">
              <p>A microjob is a temporary, task-type job of all types, this includes both remote and proximate (face-to-face) jobs</p>
            </template>
            <template slot="md-collapse-pane-3">
              <p>Once the client makes a payment, it is held in a virtual bank account hosted by Sage Pay. This money is not paid directly to the freelancer so we can still transfer it back to the client if the Microjob is not completed. Once the Microjob is completed, we then release the funds to the freelancer</p>
            </template>
            <template slot="md-collapse-pane-4">
              <p>No, Jobox is free to use for both Freelancers and Clients</p>
            </template>
            <template slot="md-collapse-pane-5">
              <p> <a href="https://sagepay.co.za/" target="_blank">Sage Pay</a> is our payment facilitator. Sage Pay is a leading payments provider to businesses of all sizes throughout South Africa. We form part of the UK based Sage Group plc, that combined has over 30 years of expertise. Sage has partnered with more than 6 million small and medium-sized businesses across 24 countries, providing quality accounting, payroll and payments services</p>
            </template>
            <template slot="md-collapse-pane-6">
              <p>We charge a 10% facilitation fee from every transaction that happens from the completion of a microjob</p>
            </template>
            <template slot="md-collapse-pane-7">
              <p>Yes, you can have both a freelancer and a client account using the same email address or if you want, you can create a new account with a different email address</p>
            </template>
            <template slot="md-collapse-pane-8">
              <p>At the completion of every microjob, both clients and freelancers are given an opportunity to rate each other</p>
              <p>The ratings and reviews are stored and are seen by the public</p>
            </template>
      </collapse>
      <h2><center>Freelancer</center></h2> 
        <collapse
          :collapse="[
            'What is a freelancer?',
            'How do I receive payment for the work I have done?',
            'Who rates and reviews me?',
            'What happens if a client was to cancel a Microjob before it’s over?',
            'How do I delete my account?']"
          icon="keyboard_arrow_down"
          color-collapse="success">
            <template slot="md-collapse-pane-1">
              <p>A freelancer is a self-employed person offering services, usually to multiple clients at a time.</p>
              <p>On Jobox, freelancers are those people that bid for jobs and do the work that is requested by the client</p>
            </template>
            <template slot="md-collapse-pane-2">
              <p>Firstly, you have to fill out your banking details on the account page. Once that is done, when the client clicks on the Microjob complete button, the money will be transferred to your account</p>
            </template>
            <template slot="md-collapse-pane-3">
              <p>The client rates and reviews you once the Microjob is completed</p>
            </template>
            <template slot="md-collapse-pane-4">
              <p>Please contact us at (contact@jobox.za) if this does happen</p>
            </template>
            <template slot="md-collapse-pane-5">
              <p>Please contact us at (contact@jobox.za) and we will assist you in this process</p>
            </template>
      </collapse>
      <h2><center>Client</center></h2> 
        <collapse
          :collapse="[
            'What is a client?',
            'Is the payment procedure safe?',
            'What kind of Microjobs can get done?',
            'Who rates and reviews me?',
            'What happens is if I want to cancel a Microjob before it’s completed?',
            'How do I delete my account?']"
          icon="keyboard_arrow_down"
          color-collapse="success">
            <template slot="md-collapse-pane-1">
              <p>It is the user which offers Microjobs for Freelancers to bid for or to apply to and buys a service from a Freelancers</p>
            </template>
            <template slot="md-collapse-pane-2">
              <p>Yes, we use Sage Pay which is a leading payments provider to businesses of all sizes throughout South Africa. They form part of the UK based Sage Group plc, that combined has over 30 years of expertise</p>
            </template>
            <template slot="md-collapse-pane-3">
              <p>Our platform currently only allows for a once of task or project (what we have dubbed a Microjob)</p>
              <p>Any Microjob that has a set fee which can be agreed upon by the freelancer and client before the Microjob begins, our platform can facilitate</p>
            </template>
            <template slot="md-collapse-pane-4">
              <p>The freelancer rates and reviews you once the Microjob is completed</p>
            </template>
            <template slot="md-collapse-pane-5">
              <p>Please contact us at (contact@jobox.za) before you do cancel the Microjob and we will assist you in this process</p>
            </template>
            <template slot="md-collapse-pane-6">
              <p>Please contact us at (contact@jobox.za) and we will assist you in this process</p>
            </template>
      </collapse>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
import {Collapse} from '@/components'
export default {
    name: 'faq',
    components: {
      Collapse
    }
}
</script>
<style lang="scss">
.transparant {
      opacity: 0.8;
}
</style>