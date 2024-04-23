const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  goalName: String,
  narrativeGoal: String,
  goalType: String,
  startDate: Date,
  days: Number,
  projectedDate: Date,
  startStatus: String,
  currentStatus: String,
  goalMet: String,
  actualDate: Date,
  offlineId: String
});

const activitySchema = new mongoose.Schema({
  name: String,
  type: [String],
  list: [
    {
      mobility: [String],
      levelOfAssist: String,
      typeOfAssist: [String],
      notes: String
    }
  ],
  date: Date
});

const objectiveSchema = new mongoose.Schema({
  bodyStructureAndFunction: [String],
  activities: [activitySchema],
  functionalOutcomeMeasure: [String],
  painAndVitals: {
    painTest: String,
    intensity: String,
    location: String,
    quality: String,
    improvesWith: String,
    worsensWith: String,
    vitalTest: String,
    heartRate: String,
    bloodPressure: String,
    spo2: String,
    position: String,
    status: String
  },
  generalObservation: String,
  oralPharyngealSwallowFunction: String,
  oralMotor: String,
  pharyngealFunction: String,
  esophagealPhase: String,
  respiratoryStatus: String,
  exercises: {
    therapeuticExercises: {
      test: [[String]],
      notes: String
    },
    neuromuscularReEducation: {
      test: [[String]],
      notes: String
    },
    status: String
  },
  manualTherapy: String,
  dailyTreatment: String,
  cognitiveFunction: String
});

const outcomesSchema = new mongoose.Schema({
  admitDate: Date,
  disciplineType: String,
  facilityCode: String,
  facilityName: String,
  financialClass: String,
  firstName: String,
  goal: [goalSchema],
  lastName: String,
  middleName: String,
  objective: [objectiveSchema],
  subjective: [
    {
      additionalAssessmentRequired: Boolean,
      isResponsiblePartyAware: Boolean,
      socialIssuesIdentified: String,
      rehabPotential: String,
      swallowingFunction: String,
      patientGoal: String,
      responseToTreatement: String,
      adverseReactions: String,
      patientComment: String,
      educationProvided: String,
      therapyCommunicated: String,
      dcSummary: String,
      dcReason: String,
      speechAffect: String,
      status: String,
      patientReport: String
    }
  ]
});

const Outcomes = mongoose.model('outcomes', outcomesSchema);

module.exports = Outcomes;
