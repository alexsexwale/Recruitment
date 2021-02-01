<template>
  <div class="md-layout">
    <!-- Faculties -->
    <div class="md-layout-item ml-auto mt-4 md-small-size-100">
      <md-field :class="[
          { 'md-valid': !errors.has('faculty') && touched.faculty },
          { 'md-form-group': true },
          { 'md-error': errors.has('faculty') }
        ]">
        <md-icon>school</md-icon>
        <label>Faculty</label>
        <md-select class="pad" @input="addFaculty" v-model="faculty" data-vv-name="faculty" type="text" name="faculty" required v-validate="modelValidations.faculty">
          <md-option v-for="(faculty, index) in faculties" :key="index" :value="faculty">{{ faculty }}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('faculty')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('faculty') && touched.faculty">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate or Postgraduate -->
    <div class="md-layout-item ml-auto mt-4 md-small-size-100">
      <md-field :class="[
        { 'md-valid': !errors.has('graduateStatus') && touched.graduateStatus },
        { 'md-form-group': true },
        { 'md-error': errors.has('graduateStatus') }
        ]">
        <md-icon>school</md-icon>
        <label>Undergraduate/Postgraduate</label>
        <md-select class="pad" @input="addGraduateStatus" v-model="graduateStatus" data-vv-name="graduateStatus" type="text" name="graduateStatus" required v-validate="modelValidations.graduateStatus">
          <md-option v-for="(graduate, index) in graduates" :key="index" :value="graduate">{{graduate}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('graduateStatus')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('graduateStatus') && touched.graduateStatus">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- University of Pretoria - Undergraduate Year of Study -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="graduateStatus==='Undergraduate'">
      <md-field :class="[
          { 'md-valid': !errors.has('year') && touched.year },
          { 'md-form-group': true },
          { 'md-error': errors.has('year') }
          ]">
          <md-icon>school</md-icon>
          <label>Year of Study?</label>
          <md-select class="pad" @input="addYear" v-model="year" data-vv-name="year" type="text" name="year" required v-validate="modelValidations.year">
            <md-option v-for="(year, index) in undergraduateYears" :key="index" :value="year">{{year}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('year')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('year') && touched.year">done</md-icon>
          </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Year of Study -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="graduateStatus === 'Postgraduate'">
      <md-field :class="[
          { 'md-valid': !errors.has('year') && touched.year },
          { 'md-form-group': true },
          { 'md-error': errors.has('year') }
          ]">
          <md-icon>school</md-icon>
          <label>Year of Study?</label>
          <md-select class="pad" @input="addYear" v-model="year" data-vv-name="year" type="text" name="year" required v-validate="modelValidations.year">
            <md-option v-for="(year, index) in postgraduateYears" :key="index" :value="year">{{year}}</md-option>
          </md-select>
          <slide-y-down-transition>
            <md-icon class="error" v-show="errors.has('year')">close</md-icon>
          </slide-y-down-transition>
          <slide-y-down-transition>
            <md-icon class="success" v-show="!errors.has('year') && touched.year">done</md-icon>
          </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate Economic and Management Sciences Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Economic and Management Sciences' 
       && graduateStatus === 'Undergraduate' && (year === '1st Year' || year === '2nd Year' || year === '3rd Year' || year === '4th Year' || year === '5th Year' )">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in economicsAndManagementScienceUndergraduateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Economic and Management Sciences Postgraduate Diplomas -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Economic and Management Sciences' && graduateStatus === 'Postgraduate' && year === 'Postgraduate Diploma/Certificates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Diploma/Higher Certificate</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in economicsAndManagementSciencesPostgraduateDiplomas" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Economic and Management Sciences Honours Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Economic and Management Sciences' && graduateStatus === 'Postgraduate' && year === 'Honours' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in economicsAndManagementSciencesHonoursDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Economic and Management Sciences Masters Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Economic and Management Sciences' && graduateStatus === 'Postgraduate' && year === 'Masters' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in economicsAndManagementSciencesMastersDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Economic and Management Sciences Doctorates Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Economic and Management Sciences' && graduateStatus === 'Postgraduate' && year === 'Doctorates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in economicsAndManagementSciencesDoctoratesDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate Education Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Education' 
       && graduateStatus === 'Undergraduate' && (year === '1st Year' || year === '2nd Year' || year === '3rd Year' || year === '4th Year' || year === '5th Year' )">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree/Diploma/Higher Certificate</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in educationUndergraduateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Education Postgraduate Diplomas -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Education' && graduateStatus === 'Postgraduate' && year === 'Postgraduate Diploma/Certificates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Diploma/Higher Certificate</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in educationPostgraduateDiplomas" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Education Honours Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Education' && graduateStatus === 'Postgraduate' && year === 'Honours' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in educationHonoursDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Education Masters Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Education' && graduateStatus === 'Postgraduate' && year === 'Masters' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in educationMastersDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Education Doctorates Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Education' && graduateStatus === 'Postgraduate' && year === 'Doctorates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in educationDoctoratesDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate Engineering Built Environment and IT Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Engineering, Built Environment & IT' 
       && graduateStatus === 'Undergraduate' && (year === '1st Year' || year === '2nd Year' || year === '3rd Year' || year === '4th Year' || year === '5th Year' )">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in engineeringBuiltEnvironmentAndITUndergraduateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Engineering Built Environment and IT Honours Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Engineering, Built Environment & IT' && graduateStatus === 'Postgraduate' && year === 'Honours' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in engineeringBuiltEnvironmentAndITHonoursDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Engineering Built Environment and IT Masters Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Engineering, Built Environment & IT' && graduateStatus === 'Postgraduate' && year === 'Masters' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in engineeringBuiltEnvironmentAndITMastersDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Engineering Built Environment and IT Doctorates Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Engineering, Built Environment & IT' && graduateStatus === 'Postgraduate' && year === 'Doctorates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in engineeringBuiltEnvironmentAndITDoctoratesDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate Health Sciences Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Health Sciences' 
       && graduateStatus === 'Undergraduate' && (year === '1st Year' || year === '2nd Year' || year === '3rd Year' || year === '4th Year' || year === '5th Year' )">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in healthSciencesUndergraduateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Health Sciences Postgraduate Diplomas -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Health Sciences' && graduateStatus === 'Postgraduate' && year === 'Postgraduate Diploma/Certificates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Diploma/Higher Certificate</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in healthSciencesPostgraduateDiplomas" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Health Sciences Honours Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Health Sciences' && graduateStatus === 'Postgraduate' && year === 'Honours' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in healthSciencesHonoursDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Health Sciences Masters Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Health Sciences' && graduateStatus === 'Postgraduate' && year === 'Masters' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in healthSciencesMastersDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Health Sciences Doctorates Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Health Sciences' && graduateStatus === 'Postgraduate' && year === 'Doctorates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in healthSciencesDoctoratesDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate Humanities Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Humanities' 
       && graduateStatus === 'Undergraduate' && (year === '1st Year' || year === '2nd Year' || year === '3rd Year' || year === '4th Year' || year === '5th Year' )">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in humanitiesUndergraduateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Humanities Honours Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Humanities' && graduateStatus === 'Postgraduate' && year === 'Honours' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in humanitiesHonoursDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Humanities Masters Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Humanities' && graduateStatus === 'Postgraduate' && year === 'Masters' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in humanitiesMastersDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Humanities Doctorates Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Humanities' && graduateStatus === 'Postgraduate' && year === 'Doctorates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in humanitiesDoctoratesDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate Law Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Law' 
       && graduateStatus === 'Undergraduate' && (year === '1st Year' || year === '2nd Year' || year === '3rd Year' || year === '4th Year' || year === '5th Year' )">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in lawUndergraduateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Law Masters Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Law' && graduateStatus === 'Postgraduate' && year === 'Masters' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in lawMastersDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Law Doctorates Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Law' && graduateStatus === 'Postgraduate' && year === 'Doctorates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in lawDoctoratesDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate Natural and Agricultural Sciences Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Natural and Agricultural Sciences' 
       && graduateStatus === 'Undergraduate' && (year === '1st Year' || year === '2nd Year' || year === '3rd Year' || year === '4th Year' || year === '5th Year' )">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in naturalAndAgriculturalSciencesUndergraduateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Natural and Agricultural Sciences Honours Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Natural and Agricultural Sciences' && graduateStatus === 'Postgraduate' && year === 'Honours' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in naturalAndAgriculturalSciencesHonoursDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Natural and Agricultural Sciences Masters Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Natural and Agricultural Sciences' && graduateStatus === 'Postgraduate' && year === 'Masters' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in naturalAndAgriculturalSciencesMastersDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Natural and Agricultural Sciences Doctorates Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Natural and Agricultural Sciences' && graduateStatus === 'Postgraduate' && year === 'Doctorates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in naturalAndAgriculturalSciencesDoctoratesDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate Theology and Religion Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Theology and Religion' 
       && graduateStatus === 'Undergraduate' && (year === '1st Year' || year === '2nd Year' || year === '3rd Year' || year === '4th Year' || year === '5th Year' )">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in theologyAndReligionUndergraduateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Theology and Religion Honours Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Theology and Religion' && graduateStatus === 'Postgraduate' && year === 'Honours' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in theologyAndReligionHonoursDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Theology and Religion Masters Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Theology and Religion' && graduateStatus === 'Postgraduate' && year === 'Masters' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in theologyAndReligionMastersDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Theology and Religion Doctorates Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Theology and Religion' && graduateStatus === 'Postgraduate' && year === 'Doctorates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in theologyAndReligionDoctoratesDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate Veterinary Services Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Veterinary Services' 
       && graduateStatus === 'Undergraduate' && (year === '1st Year' || year === '2nd Year' || year === '3rd Year' || year === '4th Year' || year === '5th Year' )">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in veterinaryServicesUndergraduateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Veterinary Services Masters Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Veterinary Services' && graduateStatus === 'Postgraduate' && year === 'Masters' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in veterinaryServicesMastersDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Veterinary Services Doctorates Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Veterinary Services' && graduateStatus === 'Postgraduate' && year === 'Doctorates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in veterinaryServicesDoctoratesDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Student Number -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty">
      <md-field :class="[
          { 'md-valid': !errors.has('studentNo') && touched.studentNo },
          { 'md-form-group': true },
          { 'md-error': errors.has('studentNo') }
        ]">
        <md-icon>school</md-icon>
        <label>Student ID</label>
        <md-input @change="addStudentNo" v-model="studentNo" data-vv-name="studentNo" type="text" name="studentNo" required v-validate="modelValidations.studentNo">
        </md-input>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('studentNo')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('studentNo') && touched.studentNo">done</md-icon>
        </slide-y-down-transition>
      </md-field>
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
export default {
  name: 'tuks',
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      studentId: null,
      user: null,
      student: null,
      graduates: null,
      faculty: null,
      degree: null,
      year: null,
      graduateStatus: null,
      studentNo: null,
      undergraduateYears: [],
      postgraduateYears: [],
      faculties: [],
      
      // Undergraduate Degrees
      economicsAndManagementScienceUndergraduateDegrees: [],
      educationUndergraduateDegrees: [],
      engineeringBuiltEnvironmentAndITUndergraduateDegrees: [],
      healthSciencesUndergraduateDegrees: [],
      humanitiesUndergraduateDegrees: [],
      lawUndergraduateDegrees: [],
      naturalAndAgriculturalSciencesUndergraduateDegrees: [],
      theologyAndReligionUndergraduateDegrees: [],
      veterinaryServicesUndergraduateDegrees: [],
      
      // Postgraduate Diploma/Certificates
      economicsAndManagementSciencesPostgraduateDiplomas: [],
      educationPostgraduateDiplomas: [],
      healthSciencesPostgraduateDiplomas: [],
      
      // Honours Degrees
      economicsAndManagementSciencesHonoursDegrees: [],
      educationHonoursDegrees: [],
      engineeringBuiltEnvironmentAndITHonoursDegrees: [],
      healthSciencesHonoursDegrees: [],
      humanitiesHonoursDegrees: [],
      naturalAndAgriculturalSciencesHonoursDegrees: [],
      theologyAndReligionHonoursDegrees: [],

      // Masters Degrees
      economicsAndManagementSciencesMastersDegrees: [],
      educationMastersDegrees: [],
      engineeringBuiltEnvironmentAndITMastersDegrees: [],
      healthSciencesMastersDegrees: [],
      humanitiesMastersDegrees: [],
      lawMastersDegrees: [],
      naturalAndAgriculturalSciencesMastersDegrees: [],
      theologyAndReligionMastersDegrees: [],
      veterinaryServicesMastersDegrees: [],

      // Doctorates Degrees
      economicsAndManagementSciencesDoctoratesDegrees: [],
      educationDoctoratesDegrees: [],
      engineeringBuiltEnvironmentAndITDoctoratesDegrees: [],
      healthSciencesDoctoratesDegrees: [],
      humanitiesDoctoratesDegrees: [],
      lawDoctoratesDegrees: [],
      naturalAndAgriculturalSciencesDoctoratesDegrees: [],
      theologyAndReligionDoctoratesDegrees: [],
      veterinaryServicesDoctoratesDegrees: [],
      touched: {
        faculty: false,
        degree: false,
        year: false,
        graduateStatus: false,
        studentNo: false,
      },
      modelValidations: {
        faculty: {
          required: true
        },
        degree: {
          required: true
        },
        year: {
          required: true
        },
        graduateStatus: {
          required: true
        },
        studentNo: {
          required: true
        }
      }
    }
  },
  methods: {
    debouncedUpdate: debounce(function() {
      this.updateAccount();
    }, 300),
    updateAccount() {
      let student = db.collection('students').doc(this.studentId);
      student.get().then(doc => {
        if(doc.exists) {
          if(this.faculty) {
            student.update({
              faculty: this.faculty
            });
          }
          if(this.graduateStatus) {
            student.update({
              graduateStatus: this.graduateStatus
            });
          }
          if(this.year) {
            student.update({
              year: this.year
            });
          }
          if(this.degree) {
            student.update({
              degree: this.degree
            });
          }
          if(this.studentNo) {
            student.update({
              studentNo: this.studentNo
            });
          }
        }
        this.$notify(
        {
          message: 'Your data has been automatically saved!',
          icon: 'add_alert',
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: 'success'
        });
      });
    },
    addFaculty: function() {
      this.$emit("faculty", this.faculty);
      // if(this.graduateStatus){this.graduateStatus = null;}
      // if(this.year){this.year = null;}
      // if(this.degree){this.degree = null;}
      this.debouncedUpdate();
    },
    addGraduateStatus: function() {
      this.$emit("graduateStatus", this.graduateStatus);
      // if(this.year){this.year = null;}
      // if(this.degree){this.degree = null;}
      this.debouncedUpdate();
    },
    addYear: function() {
      this.$emit("year", this.year);
      // if(this.degree){this.degree = null;}
      this.debouncedUpdate();
    },
    addDegree: function() {
      this.$emit("degree", this.degree);
      this.debouncedUpdate();
    },
    addStudentNo: function() {
      this.$emit("studentNo", this.studentNo);
      this.debouncedUpdate();
    },
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit("on-validated", res);
        return res;
      });
    }
  },
  watch: {
    faculty() {
      this.touched.faculty = true;
    },
    degree() {
      this.touched.degree = true;
    },
    year() {
      this.touched.year = true;
    },
    graduateStatus() {
      this.touched.graduateStatus = true;
    },
    studentNo() {
      this.touched.studentNo = true;
    }  
  },
  created() {
    let settings = db.collection('Settings').doc('Drop-down Lists');
    settings.get().then(doc => {
      this.graduates = doc.data().Graduates;
    });

    let Dropdowns = db.collection('Settings').doc('University of Pretoria Drop-down Lists');
    Dropdowns.get().then(doc => {
      // Faculties
      this.faculties = doc.data().Faculties;

      // Graduate Status
      this.undergraduateYears = doc.data().UndergraduateYears;
      this.postgraduateYears = doc.data().PostgraduateYears;

      // Undergraduate Degrees/Certificates/Higher Certificate
      this.economicsAndManagementScienceUndergraduateDegrees = doc.data().EconomicsAndManagementScienceUndergraduateDegrees;
      this.educationUndergraduateDegrees = doc.data().EducationUndergraduateDegrees;
      this.engineeringBuiltEnvironmentAndITUndergraduateDegrees = doc.data().EngineeringBuiltEnvironmentAndITUndergraduateDegrees;
      this.healthSciencesUndergraduateDegrees = doc.data().HealthSciencesUndergraduateDegrees;
      this.humanitiesUndergraduateDegrees = doc.data().HumanitiesUndergraduateDegrees;
      this.lawUndergraduateDegrees = doc.data().LawUndergraduateDegrees;
      this.naturalAndAgriculturalSciencesUndergraduateDegrees = doc.data().NaturalAndAgriculturalSciencesUndergraduateDegrees;
      this.theologyAndReligionUndergraduateDegrees = doc.data().TheologyAndReligionUndergraduateDegrees;
      this.veterinaryServicesUndergraduateDegrees = doc.data().VeterinaryServicesUndergraduateDegrees;
      
      // Postgraduate Diploma/Certificates
      this.economicsAndManagementSciencesPostgraduateDiplomas = doc.data().EconomicsAndManagementSciencesPostgraduateDiplomas;
      this.educationPostgraduateDiplomas = doc.data().EducationPostgraduateDiplomas;
      this.healthSciencesPostgraduateDiplomas = doc.data().HealthSciencesPostgraduateDiplomas;

      // Honours Degrees
      this.economicsAndManagementSciencesHonoursDegrees = doc.data().EconomicsAndManagementSciencesHonoursDegrees;
      this.educationHonoursDegrees = doc.data().EducationHonoursDegrees;
      this.engineeringBuiltEnvironmentAndITHonoursDegrees = doc.data().EngineeringBuiltEnvironmentAndITHonoursDegrees;
      this.healthSciencesHonoursDegrees = doc.data().HealthSciencesHonoursDegrees;
      this.humanitiesHonoursDegrees = doc.data().HumanitiesHonoursDegrees;
      this.naturalAndAgriculturalSciencesHonoursDegrees = doc.data().NaturalAndAgriculturalSciencesHonoursDegrees;
      this.theologyAndReligionHonoursDegrees = doc.data().TheologyAndReligionHonoursDegrees;
      
      // Masters Degrees
      this.economicsAndManagementSciencesMastersDegrees = doc.data().EconomicsAndManagementSciencesMastersDegrees;
      this.educationMastersDegrees = doc.data().EducationMastersDegrees;
      this.engineeringBuiltEnvironmentAndITMastersDegrees = doc.data().EngineeringBuiltEnvironmentAndITMastersDegrees;
      this.healthSciencesMastersDegrees = doc.data().HealthSciencesMastersDegrees;
      this.humanitiesMastersDegrees = doc.data().HumanitiesMastersDegrees;
      this.lawMastersDegrees = doc.data().LawMastersDegrees;
      this.naturalAndAgriculturalSciencesMastersDegrees = doc.data().NaturalAndAgriculturalSciencesMastersDegrees;
      this.theologyAndReligionMastersDegrees = doc.data().TheologyAndReligionMastersDegrees;
      this.veterinaryServicesMastersDegrees = doc.data().VeterinaryServicesMastersDegrees;

      // Doctorates Degrees
      this.economicsAndManagementSciencesDoctoratesDegrees = doc.data().EconomicsAndManagementSciencesDoctoratesDegrees;
      this.educationDoctoratesDegrees = doc.data().EducationDoctoratesDegrees;
      this.engineeringBuiltEnvironmentAndITDoctoratesDegrees = doc.data().EngineeringBuiltEnvironmentAndITDoctoratesDegrees;
      this.healthSciencesDoctoratesDegrees = doc.data().HealthSciencesDoctoratesDegrees;
      this.humanitiesDoctoratesDegrees = doc.data().HumanitiesDoctoratesDegrees;
      this.lawDoctoratesDegrees = doc.data().LawDoctoratesDegrees;
      this.naturalAndAgriculturalSciencesDoctoratesDegrees = doc.data().NaturalAndAgriculturalSciencesDoctoratesDegrees;
      this.theologyAndReligionDoctoratesDegrees = doc.data().TheologyAndReligionDoctoratesDegrees;
      this.veterinaryServicesDoctoratesDegrees = doc.data().VeterinaryServicesDoctoratesDegrees;
    });

    this.user = firebase.auth().currentUser;
    let ref = db.collection('users');
    ref.where('userId', '==', this.user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.studentId = doc.id;
        this.student = db.collection('students').doc(doc.id);
        this.student.get().then(doc => {
          if(doc.exists) {
            this.faculty = doc.data().faculty;
            this.graduateStatus = doc.data().graduateStatus;
            this.degree = doc.data().degree;
            this.year = doc.data().year;
            this.studentNo = doc.data().studentNo;
          }
        })
        .catch(err => {
          console.log(err.message);
        });
      });
    });
  }
}
</script>