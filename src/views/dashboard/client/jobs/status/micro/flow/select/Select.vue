<template>
<div>
  <div v-if="pop" class="profile"></div>
  <div v-if="loading" class="background"></div>
  <div v-if="loading" class="text-center lds-circle"><div><img src="@/assets/img/logo.png"></div></div>
  <hr><h2 class="centre"><b>Select a Student</b></h2>
  <hr v-if="approved">
  <p class="centre" v-if="approved">You have selected a candidate, please be patient while we wait for them to respond</p>
  <hr v-if="approved">
  <br v-if="approved">
  <div class="md-layout" v-if="approved">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100" v-for="(applicant, index) in approvedApplicant" :key="index">
      <md-card class="md-card-profile">
        <div class="md-card-avatar">
          <img v-if="applicant.profile" class="img" :src="applicant.profile" />
          <img v-else class="img" :src="cardUserImage" />
        </div>
        <md-card-content>
          <br>
          <h6 class="category text-gray">{{ applicant.degree }}</h6>
          <md-button class="md-round md-info md-sm" @click="profile(applicant.alias)">{{ applicant.applicant }}</md-button>
          <p class="card-description">
            {{ applicant.bio }}
          </p>
          <md-button @click="cancelModal=true;" class="md-danger md-round">Withdraw Selection</md-button>
        </md-card-content>
      </md-card>
      <!-- Modal: Cancel -->
      <modal v-if="cancelModal" @close="cancelModalHide">
        <template slot="header">
          <h4 class="modal-title black">Whoa there! 🤚</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="cancelModalHide">
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
          <p class="black">You are about to withdraw the selection of the student. Are you sure you want to continue with this?</p>
        </template>

        <template slot="footer">
          <div style="text-align:center;">
            <md-button class="md-button md-danger" @click="cancelModalHide">No</md-button>
              &nbsp;&nbsp;&nbsp;
            <md-button class="md-button md-success" @click="cancel(applicant.id)">Yes</md-button>
          </div>
        </template>
      </modal>
    </div>
  </div>
  <hr v-if="available || !approved">
  <p v-if="approved" class="centre">Other students who have applied</p>
  <hr v-if="available || !approved">
  <br>
  <div class="md-layout" v-if="available">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" v-for="(applicant, index) in applicants" :key="index">
      <md-card class="md-card-profile">
        <div class="md-card-avatar">
          <img v-if="applicant.profile" class="img" :src="applicant.profile" />
          <img v-else class="img" :src="cardUserImage" />
        </div>
        <md-card-content>
          <br>
          <h6 class="category text-gray"> {{ applicant.degree }}</h6>
          <md-button class="md-round md-info md-sm" @click="profile(applicant.alias)">{{ applicant.applicant }}</md-button>
          <p class="card-description">
            {{ applicant.bio }}
          </p>
          <md-button @click="select(applicant.id)" class="md-round md-success md-button">Select</md-button>
        </md-card-content>
      </md-card>
      
      <!-- Modal: Cannot select -->
      <modal v-if="noSelectModal" @close="noSelectModalHide">
        <template slot="header">
          <h4 class="modal-title black">Cannot select {{ applicant.applicant }}</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="noSelectModalHide">
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
          <p class="black">You have already selected a student. You will have to decline the student you have approved in order to select {{ applicant.applicant }}</p>
        </template>

        <template slot="footer">
          <div class="centre">
            <md-button class="md-button md-success" @click="noSelectModalHide">Got it</md-button>
          </div>
        </template>
      </modal>
    </div>
  </div>
  <div v-if="!available && !approved">
    <br/><br/>
    <h2 class="black centre">{{ feedback }}</h2>
  </div>
  <!-- Modal:  -->
  <modal v-if="noPaymentModal" @close="noPaymentModalHide">
    <template slot="header">
      <h4 class="modal-title black">Payment has not been made</h4>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="noPaymentModalHide">
        <md-icon>clear</md-icon>
      </md-button>
    </template>

    <template slot="body">
      <p class="black">Please make the upfront payment before selecting a student.</p>
    </template>

    <template slot="footer">
      <div class="centre">
        <md-button class="md-button md-success" @click="noPaymentModalHide">Got it</md-button>
      </div>
    </template>
  </modal>
  <!-- View Profile:  -->
  <modal v-if="profileModal" @close="profileModalHide">
    <template slot="header">
      <div class="md-card-avatar avatar">
          <img class="img radius" :src="cardUserImage" />
      </div>
      
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="profileModalHide">
        <md-icon>clear</md-icon>
      </md-button>
    </template>

    <template slot="body">
      <h2 class="modal-title black"><b>{{ student.name + " " + student.surname }}</b></h2>
      <p v-if="!paid" class="red left">To view the entire candidates profile, please make an upfront payment</p>
      <p class="black left">
        {{ student.bio }}
      </p>
      <b class="large-font">Qualifications</b> <br>
      <p class="black left">
        <span v-if="student.studying === 'Yes'">The candidate is currently studying the following:</span>
        <span v-if="student.studying === 'No'">The candidate most recently completed the following:</span>
        <br><br>
        <b>Institution:</b> {{ student.institution }} <br>
        <b>Degree:</b> {{ student.degree }} <br>
        <b>Graduate Status:</b> {{ student.graduateStatus }} <br>
        <b>Year of Study:</b> {{ student.year }} <br>
      </p>
      
      <b class="large-font">Contact Information</b> <br>
      <p v-if="paid" class="black left">
        <b>Email Address:</b> {{ student.email || "**********" }} <br>
        <b>Phone Number:</b> {{student.phone || "**********" }} 
        <span v-if="student.personalWebsite"><br> <b>Website: </b> <a :href="student.personalWebsite" target="_blank">{{ student.personalWebsite }}</a></span>
      </p>
      <p v-else class="red">You have not made a payment</p>
      <b class="large-font">Certificates</b> <br>
      <p class="black" v-if="paid && (student.certificate1 || student.certificate2 || student.certificate3)">
        <md-button v-if="student.certificate1" class="md-round md-info md-sm" @click="certificate1"># 1</md-button> &nbsp;&nbsp;&nbsp;
        <md-button v-if="student.certificate2" class="md-round md-info md-sm" @click="certificate2"># 2</md-button> &nbsp;&nbsp;&nbsp;
        <md-button v-if="student.certificate3" class="md-round md-info md-sm" @click="certificate3"># 3</md-button>
      </p>
      <p class="red left" v-if="paid && !student.certificate1 && !student.certificate2 && !student.certificate3">The candidate has not uploaded any certificates</p>
      <p v-if="!paid" class="red">You have not made a payment</p>
      <b class="large-font">Resume</b> <br>
      <p class="black" v-if="paid">
        <md-button v-if="student.cv && student.cv !== ''" @click="cv" class="md-round md-info md-sm">CV</md-button> &nbsp;&nbsp;&nbsp;
        <md-button v-if="student.portfolio && student.portfolio !== ''" @click="portfolio" class="md-round md-info md-sm">Portfolio</md-button> &nbsp;&nbsp;&nbsp;
      </p>
      <p v-else class="red">You have not made a payment</p>
      <b class="large-font">Social Media Handles</b> <br>
      <p class="black" v-if="paid">
        <md-icon v-if="student.linkedIn && student.linkedIn !== ''"><i class="fab fa-linkedin" style="color:#0e76a8; cursor: pointer" @click="linkedin"></i></md-icon>	
        <span v-if="student.linkedIn && student.linkedIn !== ''">&nbsp;</span><span v-if="student.linkedIn && student.linkedIn !== ''">&nbsp;</span><span v-if="student.linkedIn && student.linkedIn !== ''">&nbsp;</span><span v-if="student.linkedIn && student.linkedIn !== ''">&nbsp;</span>
        <md-icon v-if="student.github && student.github !== ''"><i class="fab fa-github" style="color: #000; cursor: pointer" @click="github"></i></md-icon>
        <span v-if="student.github && student.github !== ''">&nbsp;</span><span v-if="student.github && student.github !== ''">&nbsp;</span><span v-if="student.github && student.github !== ''">&nbsp;</span><span v-if="student.github && student.github !== ''">&nbsp;</span>
        <md-icon v-if="student.facebook && student.facebook !== ''"><i class="fab fa-facebook" style="color:#3b5998; cursor: pointer" @click="facebook"></i></md-icon>
        <span v-if="student.facebook && student.facebook !== ''">&nbsp;</span><span v-if="student.facebook && student.facebook !== ''">&nbsp;</span><span v-if="student.facebook && student.facebook !== ''">&nbsp;</span><span v-if="student.facebook && student.facebook !== ''">&nbsp;</span>
        <md-icon v-if="student.twitter && student.twitter !== ''"><i class="fab fa-twitter" style="color:#00acee; cursor: pointer" @click="twitter"></i></md-icon>
        <span v-if="student.twitter && student.twitter !== ''">&nbsp;</span><span v-if="student.twitter && student.twitter !== ''">&nbsp;</span><span v-if="student.twitter && student.twitter !== ''">&nbsp;</span><span v-if="student.twitter && student.twitter !== ''">&nbsp;</span>
        <md-icon v-if="student.instagram && student.instagram !== ''"><i class="fab fa-instagram" style="color: #d6249f; cursor: pointer" @click="instagram"></i></md-icon>
      </p>
      <p v-else class="red">You have not made a payment</p>
    </template>

    <template slot="footer">
      <div class="centre">
        <md-button class="md-button md-success" @click="profileModalHide">Done</md-button>
      </div>
    </template>
  </modal>
</div>
</template>
<script>
import db from '@/firebase/init';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { Modal } from "@/components";
import { debounce } from "debounce";
export default {
  components: {
    Modal
  },
  data() {
    return {
      applicants: [],
      approvedApplicant: [],
      available : false,
      approved: false,
      selected: false,
      cancelApplicant: false,
      approvedModal: false,
      cancelModal: false,
      noSelectModal: false,
      noPaymentModal: false,
      profileModal: false,
      student: {},
      paid: false,
      index: null,
      loading: true,
      pop: null,
      feedback: "Please be patient, students will start applying soon",
      cardUserImage: "/img/dashboard/client/card-1.jpg"
    };
  },
  methods: {
    approvedModalHide() {
      this.approvedModal = false;  
    },
    cancelModalHide() {
      this.cancelModal = false;  
    },
    noSelectModalHide() {
      this.noSelectModal = false;
    },
    noPaymentModalHide() {
      this.noPaymentModal = false;
    },
    profileModalHide() {
      this.pop = false;
      this.profileModal = false;
    },
    async reload() {
      location.reload();
    },
    linkedin() {
      window.open(this.student.linkedIn, '_blank');
    },
    github() {
      window.open(this.student.github, '_blank');
    },
    facebook() {
      window.open(this.student.facebook, '_blank');
    },
    twitter() {
      window.open(this.student.twitter, '_blank');
    },
    instagram() {
      window.open(this.student.instagram, '_blank');
    },
    certificate1() {
      window.open(this.student.certificate1, '_blank');
    },
    certificate2() {
      window.open(this.student.certificate2, '_blank');
    },
    certificate3() {
      window.open(this.student.certificate3, '_blank');
    },
    cv() {
      window.open(this.student.cv, '_blank');
    },
    portfolio() {
      window.open(this.student.portfolio, '_blank');
    },
    debouncedReload: debounce(function() {
      this.reload();
    }, 1500),
    profile(alias) {
      this.loading = true;
      db.collection('students').doc(alias).get().then(doc => {
        this.student = doc.data();
        this.cardUserImage = this.student.profile;
        db.collection('users').doc(alias).get().then(doc => {
          this.student.name = doc.data().name;
          this.student.surname = doc.data().surname;
          if(this.paid === true) {
            this.student.email = doc.data().email;
            this.student.phone = doc.data().phone;
          }
          this.profileModal = true;
          this.pop = true;
          this.loading = false;
        })
                
      });
    },
    select(id) {
      if(this.approved) {
        this.noSelectModal = true;
      }
      else if(this.paid === false) {
        this.noPaymentModal = true;
      }
      else {
        this.loading = true
        this.selected = true;
        let applicants = db.collection('applications').doc(id);
        applicants.update({
          approved: true
        });
        this.debouncedReload();
      }
    },
    cancel(id) { //decline
      this.loading = true;
      this.cancelApplicant = true;
      let applicants = db.collection('applications').doc(id);
      applicants.update({
        approved: false
      });
      this.cancelModal = false;
      this.debouncedReload();
    }
  },
  created() {
    let applicants = db.collection('applications');
    applicants.where('jobId', '==', this.$route.params.id).where('status', '==', 'applied').where('approved', '==', false).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.available = true;
        let applicant = doc.data();
        applicant.id = doc.id;
        db.collection('students').doc(applicant.alias).get().then(doc => {
          applicant.profile = doc.data().profile;
          this.applicants.push(applicant);
        });
      });
    });
    applicants.where('jobId', '==', this.$route.params.id).where('status', '==', 'applied').where('approved', '==', true).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.approved = true;
        let applicant = doc.data();
        applicant.id = doc.id;
        db.collection('students').doc(applicant.alias).get().then(doc => {
          applicant.profile = doc.data().profile;
          this.approvedApplicant.push(applicant);
        });
      });
    });
    applicants.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          let applicant = change.doc.data();
          if(this.selected) {
            this.available = false;
            this.approved = false;
            this.feedback = "Selecting " + applicant.applicant;
          }
          if(this.cancelApplicant) {
            this.available = false;
            this.approved = false;
            this.feedback = "Cancelling " + applicant.applicant;
          }
        }
      });
    });

    let payment = db.collection('payments');
    payment.where('jobId', '==', this.$route.params.id).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.paid = doc.data().inboundPayment;
      });
    });
    payment.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'modified') {
          this.paid = change.doc.data().inboundPayment;
        }
      });
    });

    this.loading = false;
  }   
}
</script>
<style scoped>
.centre {
  text-align: center;
  margin: auto;
}
/* Pop up modal */
.modal-container {
  margin: -100px auto;
}

.small-font {
  font-size: small;
}

.large-font {
  font-size: large;
}

.left {
  text-align: left;
}

.avatar {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.radius {
  border-radius: 100px;
}

.modal-mask {
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  top: -100px;
}

.profile {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-transition: opacity .15s ease;
  transition: opacity .15s ease;
}

.red {
  color: red;
  font-weight: bold;
}


</style>