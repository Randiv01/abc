const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Greenhouse Schema
const greenhouseSchema = new Schema({
  greenhouseId: {
    type: String,
    required: true,
    unique: true
  },
  plantName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Vegetable', 'Fruit']
  },
  length: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  plantedDate: {
    type: Date,
    required: true
  },
  expectedHarvest: {
    type: Date,
    required: true
  },
  estimatedYield: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive', 'Maintenance'],
    default: 'Active'
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});
// Inspection Schema
const inspectionSchema = new Schema({
  greenhouseNo: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  inspector: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Cleared', 'Issue']
  },
  findings: {
    type: String,
    required: true
  },
  issueImage: {
    type: String
  },
  issueDescription: {
    type: String
  }
}, {
  timestamps: true
});
// Fertilizing Schema
const fertilizingSchema = new Schema({
  greenhouseNo: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  fertilizerType: {
    type: String,
    required: true,
    enum: ['Urea', 'NPK', 'Compost', 'Organic']
  },
  quantity: {
    type: Number,
    required: true
  },
  staff: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Treated', 'Untreated']
  }
}, {
  timestamps: true
});
// Pest Disease Issues Schema
const pestDiseaseIssueSchema = new Schema({
  greenhouseNo: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  issueType: {
    type: String,
    required: true,
    enum: ['Fungus', 'Insect', 'Virus', 'Other']
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  status: {
    type: String,
    enum: ['Identified', 'Assigned', 'In Progress', 'Resolved'],
    default: 'Identified'
  }
}, {
  timestamps: true
});
// Specialist Assignment Schema
const specialistAssignmentSchema = new Schema({
  specialistName: {
    type: String,
    required: true
  },
  dateAssigned: {
    type: Date,
    required: true
  },
  greenhouseNo: {
    type: String,
    required: true
  },
  treatedIssue: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Assigned', 'In Progress', 'Resolved']
  },
  report: {
    type: String
  }
}, {
  timestamps: true
});
// Telemetry Schema
const telemetrySchema = new Schema({
  greenhouseNo: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  soilMoisture: {
    type: Number,
    required: true
  },
  light: {
    type: Number
  },
  co2: {
    type: Number
  }
});
// Control Actions Schema
const controlActionSchema = new Schema({
  greenhouseNo: {
    type: String,
    required: true
  },
  device: {
    type: String,
    required: true,
    enum: ['fan', 'lights', 'waterPump']
  },
  action: {
    type: String,
    required: true,
    enum: ['on', 'off']
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  }
});
// Alerts Schema
const alertSchema = new Schema({
  greenhouseNo: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['temperature', 'humidity', 'moisture', 'connection', 'other']
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  resolved: {
    type: Boolean,
    default: false
  },
  resolvedAt: {
    type: Date
  },
  resolvedBy: {
    type: String
  }
});
// Harvest Records Schema
const harvestRecordSchema = new Schema({
  plantType: {
    type: String,
    required: true
  },
  greenhouseNo: {
    type: String,
    required: true
  },
  harvestDate: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  qualityGrade: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C']
  },
  worker: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Manager', 'Worker', 'Viewer']
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});
// Role Schema
const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  permissions: {
    type: [String],
    required: true
  }
}, {
  timestamps: true
});
// Settings Schema
const settingSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: Schema.Types.Mixed,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
// Create models
const Greenhouse = mongoose.model('Greenhouse', greenhouseSchema);
const Inspection = mongoose.model('Inspection', inspectionSchema);
const Fertilizing = mongoose.model('Fertilizing', fertilizingSchema);
const PestDiseaseIssue = mongoose.model('PestDiseaseIssue', pestDiseaseIssueSchema);
const SpecialistAssignment = mongoose.model('SpecialistAssignment', specialistAssignmentSchema);
const Telemetry = mongoose.model('Telemetry', telemetrySchema);
const ControlAction = mongoose.model('ControlAction', controlActionSchema);
const Alert = mongoose.model('Alert', alertSchema);
const HarvestRecord = mongoose.model('HarvestRecord', harvestRecordSchema);
const User = mongoose.model('User', userSchema);
const Role = mongoose.model('Role', roleSchema);
const Setting = mongoose.model('Setting', settingSchema);
module.exports = {
  Greenhouse,
  Inspection,
  Fertilizing,
  PestDiseaseIssue,
  SpecialistAssignment,
  Telemetry,
  ControlAction,
  Alert,
  HarvestRecord,
  User,
  Role,
  Setting
};