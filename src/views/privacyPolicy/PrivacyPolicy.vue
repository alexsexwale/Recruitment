<template>
  <div class="md-layout-item md-size-100 transparant">
    <md-card>
      <md-card-content>
        <collapse
          :collapse="[
            'OVERVIEW',
            'SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION AND WHAT INFORMATION DO WE STORE?',
            'SECTION 2 - CONSENT',
            'SECTION 3 - DISCLOSURE',
            'SECTION 4 - SECURITY',
            'SECTION 5 - THIRD-PARTY SERVICES',
            'SECTION 6 - SECURITY',
            'SECTION 7 - AGE OF CONSENT',
            'SECTION 8 - CHANGES TO THIS PRIVACY POLICY',
            'QUESTIONS AND CONTACT INFORMATION']"
          icon="keyboard_arrow_down"
          color-collapse="success">
            <template slot="md-collapse-pane-1">
              <p>By using the Jobox and accepting the **Terms and Conditions** you also agree to this Privacy Policy. If you do not agree to this Privacy Policy, you must not use the Jobox. The terms "We," "Us," "Our," or "Jobox" includes Jobox Pty Ltd and our affiliates.</p>
            </template>
            <template slot="md-collapse-pane-2">
              <p>When you visit our site or use our Services on our site and you create a Profile, we store the personal information you give us such as:</p>
              <ol type="I">
                  <li>name, and contact information, such as email address, cellphone number, telephone number, physical address, and (depending on the service used) sometimes financial information, such as bank account numbers;</li>
                  <li>transactional information based on your activities on the sites, billing and other information you provide to complete a Microjob;</li>
                  <li>personal information you provide to us through correspondence, chats, shared by you from other social applications, services or websites;</li>
                  <li>additional personal information we ask you to submit to authenticate yourself if we believe you are violating site policies (for example, we may ask you to send us an ID to answer additional questions online to help verify your identity);</li>
                  <li>information from your interaction with our sites, services, content and advertising, including, but not limited to, device ID, device type, location, geo-location information, computer and connection information, statistics on page views, traffic to and from the sites, ad data, IP address and standard web log information.</li>
              </ol>
              <p>When you browse our site, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.</p>
              <p>We also collect  Non-Personal Information. We may collect non-personal information as you use Jobox. When you use the site, third-party service providers (e.g. Google Analytics), and partners may receive and record non-personal information from cookies, server logs, and similar technology from your browser or mobile device, including your IP address.</p>
              <p>Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.</p>
            </template>
            <template slot="md-collapse-pane-3">
              <h4>How do you get my consent?</h4>
              <p>When you accept the Terms and Conditions, you accept this Privacy Policy as well.</p>
              <p>Furthermore, when you provide us with personal information to sign up to Jobox, create a profile, complete a transaction, verify your bank details, post/accept/bid for a Microjob, we imply that you consent to our collecting it and using it for that specific reason only.</p>
              <p>If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent or provide you with an opportunity to say no.</p>
              <h4>How do I withdraw my consent?</h4>
              <p>If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at any time, by contacting us at **contact@jobox.co.za**</p>
              <p>You may also delete your Profile if you no longer want to have one and this will also withdraw your consent.</p>
            </template>
            <template slot="md-collapse-pane-4">
              <p>We may disclose your personal information if we are required by law to do so or if you violate our Terms and Agreements.</p>
            </template>
            <template slot="md-collapse-pane-5">
              <p>Our site is hosted on Firebase.</p>
              <p>Your data is stored through our data storage, databases. We store your data on a secure server behind a firewall.</p>
              <h4>Payment:</h4>
              <p>We use an escrow payment system. When you sign up as a Freelancer we store you banking account details (such as account number and branch code). The information that you give us gets stored on our secure server.</p>
              <p>We store the banking details.</p>
              <p>We upload a CSV to sage to get the outbound payment, microjob details, name and banking details. Sage also has an email address. We upload it encrypted, they don’t save anything but it goes through.</p>
              <p>Inbound<br>When the client clicks pay, they get taken to a payment Gateway (a new tab and looks different from the Website, it will be something created by Sage, it’s an API) people will choose EFT or enter their things directly, those instructions get generated and sent to a Sage bank account, it is also simultaneously transferred to our account and is reflected/shown in our virtual Sage account.</p>
              <p>Outbound<br>The money that is in the virtual account we upload a CSV file that tells Sage who to pay and how much to pay from our virtual account, we store the Freelancers banking details in order to generate that CSV file. We then send it to Sage (done through an encrypted service like you would with online banking). Once we have paid the 90% to our freelancer we then take a 10% and put it in our account.</p>
            </template>
            <template slot="md-collapse-pane-6">
              <p>In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.</p>
              <p>However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.</p>
              <p>For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.</p>
              <p>Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.</p>
              <h4>Links</h4>
              <p>When you click on the links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.</p>
            </template>
            <template slot="md-collapse-pane-7">
              <p>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</p>
              <p>If you provide us with your banking account information, the information is encrypted using secure socket layer technology (SSL) and stored with a AES-256 encryption.  Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.</p>
              <h4>COOKIES</h4>
              <p>Here is a list of cookies that we use. We’ve listed them here so you that you can choose if you want to opt-out of cookies or not.</p>
            </template>
            <template slot="md-collapse-pane-8">
              <p>By agreeing to these Terms and Conditions, you represent that you are at least the age of majority in the Republic of South Africa or that you are the age of majority and you have given us your consent to allow any of your minor dependents to use this Website.</p>
            </template>
            <template slot="md-collapse-pane-9">
              <p>We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.</p>
              <p>If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.</p>
            </template>
            <template slot="md-collapse-pane-10">
              <p>If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact us at contact@jobox.co.za</p>
            </template>
      </collapse>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
import {Collapse} from '@/components'
export default {
    name: 'privacy-policy',
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