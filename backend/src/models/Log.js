const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  actor: {
    type: String,
    required: [true, "Actor is required"],
    trim: true,
    index: true,
  },

  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["admin", "manager", "support", "user"],
    lowercase: true,
    index: true,
  },

  action: {
    type: String,
    required: [true, "Action is required"],
    uppercase: true,
    trim: true,
    index: true,
  },

  resource: {
    type: String,
    required: [true, "Resource is required"],
    trim: true,
  },

  resourceType: {
    type: String,
    required: [true, "Resource Type is required"],
    uppercase: true,
    trim: true,
    index: true,
  },

  ipAddress: {
    type: String,
    required: [true, "IP Address is required"],
    trim: true,
    index: true,
  },

  region: {
    type: String,
    required: [true, "Region is required"],
     enum: ["ap-south-1", "us-east-1", "eu-west-1", "sa-east-1"],
    trim: true,
    lowercase: true,
    index: true,
  },

  severity: {
    type: String,
    required: [true, "Severity is required"],
    enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
    uppercase: true,
    index: true,
  },

  severityLevel: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: [true, "Status is required"],
    enum: ["Resolved", "Unresolved"],
    index: true,
  },

  timestamp: {
    type: Date,
    required: true,
    index: true,
  },
});


logSchema.index({ severity: 1, status: 1 });
logSchema.index({ role: 1, timestamp: -1 });
logSchema.index({ region: 1, severity: 1 });
logSchema.index({ timestamp: -1 });

module.exports = mongoose.model("Log", logSchema);
