<template>
    <div class="md-layout">
      <notifications></notifications>
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

      <!-- University of the Witwatersrand - Undergraduate Year of Study -->
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

    <!-- Undergraduate Commerce, Law And Management Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Commerce, Law And Management' 
       && graduateStatus === 'Undergraduate' && (year === '1st Year' || year === '2nd Year' || year === '3rd Year' || year === '4th Year' || year === '5th Year' )">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in commerceLawAndManagementUndergraduateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Commerce, Law And Management Postgraduate Diplomas -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Commerce, Law And Management' && graduateStatus === 'Postgraduate' && year === 'Postgraduate Diploma/Certificates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Diploma/Higher Certificate</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in commerceLawAndManagementPostgraduateDiplomas" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Commerce, Law And Management Honours Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Commerce, Law And Management' && graduateStatus === 'Postgraduate' && year === 'Honours' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in commerceLawAndManagementMastersDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Commerce, Law And Management Masters Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Commerce, Law And Management' && graduateStatus === 'Postgraduate' && year === 'Masters' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in commerceLawAndManagementMastersDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Commerce, Law And Management Doctorates Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Commerce, Law And Management' && graduateStatus === 'Postgraduate' && year === 'Doctorates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in commerceLawAndManagementDoctorateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate Engineering And Built Environment Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Engineering And Built Environment' 
       && graduateStatus === 'Undergraduate' && (year === '1st Year' || year === '2nd Year' || year === '3rd Year' || year === '4th Year' || year === '5th Year' )">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in engineeringAndBuiltEnvironmentUndergradateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate Occasional Studies Engineering And Built Environment Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Engineering And Built Environment' 
       && graduateStatus === 'Undergraduate' && year === 'Occasional Studies' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in engineeringAndBuiltEnvironmentUndergraduateOccassionalStudies" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Engineering And Built Environment Postgraduate Diplomas -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Engineering And Built Environment' && graduateStatus === 'Postgraduate' && year === 'Postgraduate Diploma/Certificates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Diploma/Higher Certificate</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in engineeringAndBuiltEnvironmentPostgraduateDiplomas" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Engineering And Built Environment Honours Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Engineering And Built Environment' && graduateStatus === 'Postgraduate' && year === 'Honours' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in engineeringAndBuiltEnvironmentHonoursDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Engineering And Built Environment Masters Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Engineering And Built Environment' && graduateStatus === 'Postgraduate' && year === 'Masters' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in engineeringAndBuiltEnvironmentMastersDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Engineering And Built Environment Doctorates Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Engineering And Built Environment' && graduateStatus === 'Postgraduate' && year === 'Doctorates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in engineeringAndBuiltEnvironmentDoctoratesDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Occasional Studies Engineering And Built Environment Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Engineering And Built Environment' && graduateStatus === 'Postgraduate' && year === 'Occasional Studies' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in engineeringAndBuiltEnvironmentPostgraduateOccassionalStudies" :key="index" :value="degree">{{degree}}</md-option>
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
          <md-option v-for="(degree, index) in healthSciencesUndergradateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate Occasional Studies Health Sciences Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Health Sciences' 
       && graduateStatus === 'Undergraduate' && year === 'Occasional Studies' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in healthSciencesUndergraduateOccassionalStudies" :key="index" :value="degree">{{degree}}</md-option>
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

    <!-- Postgraduate Occasional Studies Health Sciences -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Health Sciences' && graduateStatus === 'Postgraduate' && year === 'Occasional Studies' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in healthSciencesUndergraduateOccassionalStudies" :key="index" :value="degree">{{degree}}</md-option>
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

    <!-- Postgraduate Humanities Postgraduate Diplomas -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Humanities' && graduateStatus === 'Postgraduate' && year === 'Postgraduate Diploma/Certificates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Diploma/Higher Certificate</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in humanitiesPostgraduateDiplomas" :key="index" :value="degree">{{degree}}</md-option>
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
          <md-option v-for="(degree, index) in humanitiesDoctorateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate Science Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Science' 
       && graduateStatus === 'Undergraduate' && (year === '1st Year' || year === '2nd Year' || year === '3rd Year' || year === '4th Year' || year === '5th Year' )">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in scienceUndergraduateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Undergraduate Occasional Studies Science Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" v-if="faculty === 'Science' 
       && graduateStatus === 'Undergraduate' && year === 'Occasional Studies' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in scienceUndergraduateOccasionalStudies" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Science Masters Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Science' && graduateStatus === 'Postgraduate' && year === 'Masters' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in scienceMastersDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Science Doctorates Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Science' && graduateStatus === 'Postgraduate' && year === 'Doctorates' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in scienceDoctorateDegrees" :key="index" :value="degree">{{degree}}</md-option>
        </md-select>
        <slide-y-down-transition>
          <md-icon class="error" v-show="errors.has('degree')">close</md-icon>
        </slide-y-down-transition>
        <slide-y-down-transition>
          <md-icon class="success" v-show="!errors.has('degree') && touched.degree">done</md-icon>
        </slide-y-down-transition>
      </md-field>
    </div>

    <!-- Postgraduate Occasional Studies Science Degrees -->
    <div class="md-layout-item  ml-auto mt-4 md-small-size-100" 
      v-if="faculty === 'Science' && graduateStatus === 'Postgraduate' && year === 'Occasional Studies' ">
      <md-field :class="[
          { 'md-valid': !errors.has('degree') && touched.degree },
          { 'md-form-group': true },
          { 'md-error': errors.has('degree') }
        ]">
        <md-icon>school</md-icon>
        <label>Degree</label>
        <md-select class="pad" @input="addDegree" v-model="degree" data-vv-name="degree" type="text" name="degree" required v-validate="modelValidations.degree">
          <md-option v-for="(degree, index) in scienceUndergraduateOccasionalStudies" :key="index" :value="degree">{{degree}}</md-option>
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
        studentNo: null,
        undergraduateYears: [],
        postgraduateYears: [],
        faculties: [],

        // Diplomas
        healthSciencesDiplomas: [],

        // Higher Diplomas
        commerceLawAndManagementHigherDiplomas: [],
        humaitiesHigherDiplomas: [],
        scienceHigherDiplomas: [],

        // Advance Diplomas
        healthSciencesAdvanceDiplomas: [],
        humanitiesAdvanceDiplomas: [],
        scienceAdvanceDiplomas: [],

        // Advance Certificates
        humanitiesAdvancedCertificates: [],

        // Postgraduate Occasional Studies 
        engineeringAndBuiltEnvironmentPostgraduateOccassionalStudies: [],
        healthSciencesPostgraduateOccasionalStudies: [],
        sciencePostgraduateOccasionalStudies: [],

        // Undergraduate Occasional Studies 
        engineeringAndBuiltEnvironmentUndergraduateOccassionalStudies: [],
        healthSciencesUndergraduateOccassionalStudies: [],
        scienceUndergraduateOccasionalStudies: [],

        // Undergraduate Degrees
        commerceLawAndManagementUndergraduateDegrees: [],
        engineeringAndBuiltEnvironmentUndergradateDegrees: [],
        healthSciencesUndergradateDegrees: [],
        humanitiesUndergraduateDegrees: [],
        scienceUndergraduateDegrees: [],

        // Postgraduate Diploma/Certificates
        commerceLawAndManagementPostgraduateDiplomas: [],
        engineeringAndBuiltEnvironmentPostgraduateDiplomas: [],
        healthSciencesPostgraduateDiplomas: [],
        humanitiesPostgraduateDiplomas: [],

        // Honours Degrees
        commerceLawAndManagementHonoursDegrees: [],
        engineeringAndBuiltEnvironmentHonoursDegrees: [],
        healthSciencesHonoursDegrees: [],
        humanitiesHonoursDegrees: [],

        // Masters Degrees
        commerceLawAndManagementMastersDegrees: [],
        engineeringAndBuiltEnvironmentMastersDegrees: [],
        healthSciencesMastersDegrees: [],
        humanitiesMastersDegrees: [],
        scienceMastersDegrees: [],

        // Doctorates Degrees
        commerceLawAndManagementDoctorateDegrees: [],
        engineeringAndBuiltEnvironmentDoctoratesDegrees: [],
        healthSciencesDoctoratesDegrees: [],
        humanitiesDoctorateDegrees: [],
        scienceDoctorateDegrees: [],
        touched: {
          faculty: false,
          degree: false,
          year: false,
          graduateStatus: false,
          campus: false,
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
      }, 1500),
      updateAccount() {
        this.student.get().then(doc => {
        if(doc.exists) {
          if(this.faculty) {
            this.student.update({
              faculty: this.faculty,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.graduateStatus) {
            this.student.update({
              graduateStatus: this.graduateStatus,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.year) {
            this.student.update({
              year: this.year,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.degree) {
            this.student.update({
              degree: this.degree,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.campus) {
            this.student.update({
              campus: this.campus,
              lastModified: moment(Date.now()).format('L')
            });
          }
          if(this.studentNo) {
            this.student.update({
              studentNo: this.studentNo,
              lastModified: moment(Date.now()).format('L')
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
        this.debouncedUpdate();
      },
      addGraduateStatus: function() {
        this.$emit("graduateStatus", this.graduateStatus);
        this.debouncedUpdate();
      },
      addYear: function() {
      this.$emit("year", this.year);
        this.debouncedUpdate();
      },
      addDegree: function() {
        this.$emit("degree", this.degree);
        this.debouncedUpdate();
      },
      addCampus: function() {
        this.$emit("campus", this.campus);
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

      let Dropdowns = db.collection('Settings').doc('University of the Witwatersrand Drop-down Lists');
      Dropdowns.get().then(doc => {
        // Faculties
        this.faculties = doc.data().Faculties;

        // Graduate Status
        this.undergraduateYears = doc.data().UndergraduateYears;
        this.postgraduateYears = doc.data().PostgraduateYears;

        // Advance Diplomas/Advance Certificates/Certificates/Higher Certificate/Postgraduate Diploma/Certificates
        this.healthSciencesDiplomas = doc.data().HealthSciencesDiplomas;
        this.commerceLawAndManagementHigherDiplomas = doc.data().CommerceLawAndManagementHigherDiplomas;
        this.humaitiesHigherDiplomas = doc.data().HumaitiesHigherDiplomas;
        this.scienceHigherDiplomas = doc.data().ScienceHigherDiplomas;
        this.healthSciencesAdvanceDiplomas = doc.data().HealthSciencesAdvanceDiplomas;
        this.humanitiesAdvanceDiplomas = doc.data().HumanitiesAdvanceDiplomas;
        this.scienceAdvanceDiplomas = doc.data().ScienceAdvanceDiplomas;
        this.humanitiesAdvancedCertificates = doc.data().HumanitiesAdvancedCertificates;

        // Postgraduate Occasional Studies 
        this.engineeringAndBuiltEnvironmentPostgraduateOccassionalStudies = doc.data().EngineeringAndBuiltEnvironmentPostgraduateOccassionalStudies;
        this.healthSciencesPostgraduateOccasionalStudies = doc.data().HealthSciencesPostgraduateOccasionalStudies;
        this.sciencePostgraduateOccasionalStudies = doc.data().SciencePostgraduateOccasionalStudies;

        // Postgraduate Diploma/Certificates
        this.commerceLawAndManagementPostgraduateDiplomas = doc.data().CommerceLawAndManagementPostgraduateDiplomas;
        this.engineeringAndBuiltEnvironmentPostgraduateDiplomas = doc.data().EngineeringAndBuiltEnvironmentPostgraduateDiplomas;
        this.healthSciencesPostgraduateDiplomas = doc.data().HealthSciencesPostgraduateDiplomas;
        this.humanitiesPostgraduateDiplomas = doc.data().HumanitiesPostgraduateDiplomas;

        // Undergraduate Occasional Studies 
        this.engineeringAndBuiltEnvironmentUndergraduateOccassionalStudies = doc.data().EngineeringAndBuiltEnvironmentUndergraduateOccassionalStudies;
        this.healthSciencesUndergraduateOccassionalStudies = doc.data().HealthSciencesUndergraduateOccassionalStudies;
        this.scienceUndergraduateOccasionalStudies = doc.data().ScienceUndergraduateOccasionalStudies;

        // Undergraduate Degrees
        this.commerceLawAndManagementUndergraduateDegrees = doc.data().CommerceLawAndManagementUndergraduateDegrees;
        this.engineeringAndBuiltEnvironmentUndergradateDegrees = doc.data().EngineeringAndBuiltEnvironmentUndergradateDegrees;
        this.healthSciencesUndergradateDegrees = doc.data().HealthSciencesUndergradateDegrees;
        this.humanitiesUndergraduateDegrees = doc.data().HumanitiesUndergraduateDegrees;
        this.scienceUndergraduateDegrees = doc.data().ScienceUndergraduateDegrees;

        // Honours Degrees
        this.commerceLawAndManagementHonoursDegrees = doc.data().CommerceLawAndManagementHonoursDegrees;
        this.engineeringAndBuiltEnvironmentHonoursDegrees = doc.data().EngineeringAndBuiltEnvironmentHonoursDegrees;
        this.healthSciencesHonoursDegrees = doc.data().HealthSciencesHonoursDegrees;
        this.humanitiesHonoursDegrees = doc.data().HumanitiesHonoursDegrees;

        // Masters Degrees
        this.commerceLawAndManagementMastersDegrees = doc.data().CommerceLawAndManagementMastersDegrees;
        this.engineeringAndBuiltEnvironmentMastersDegrees = doc.data().EngineeringAndBuiltEnvironmentMastersDegrees;
        this.healthSciencesMastersDegrees = doc.data().HealthSciencesMastersDegrees;
        this.humanitiesMastersDegrees = doc.data().HumanitiesMastersDegrees;
        this.scienceMastersDegrees = doc.data().ScienceMastersDegrees;

        // Doctorates Degrees
        this.commerceLawAndManagementDoctorateDegrees = doc.data().CommerceLawAndManagementDoctorateDegrees;
        this.engineeringAndBuiltEnvironmentDoctoratesDegrees = doc.data().EngineeringAndBuiltEnvironmentDoctoratesDegrees;
        this.healthSciencesDoctoratesDegrees = doc.data().HealthSciencesDoctoratesDegrees;
        this.humanitiesDoctorateDegrees = doc.data().HumanitiesDoctorateDegrees;
        this.scienceDoctorateDegrees = doc.data().ScienceDoctorateDegrees;
      });

      this.user = firebase.auth().currentUser;
      let ref = db.collection('users');
      ref.where('userId', '==', this.user.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
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