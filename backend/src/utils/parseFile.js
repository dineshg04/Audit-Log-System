const xlsx = require("xlsx");

const requiredColumns = [
  "actor",
  "role",
  "action",
  "resource",
  "resourceType",
  "ipAddress",
  "region",
  "severity",
  "status",
  "timestamp",
];

const severityMap = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4,
};

const allowedRoles = ["admin", "manager", "support", "user"];
const allowedStatus = ["resolved", "unresolved"]; // compared lowercased


const parseTimestamp = (value) => {
  if (!value) return null;

  
  if (typeof value === "number") {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const parsed = new Date(excelEpoch.getTime() + value * 86400000);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
};


const parseFile = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const firstSheet = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheet];

  const data = xlsx.utils.sheet_to_json(worksheet, {
    defval: "",
    raw: false,
  });

  if (!data.length) {
    throw new Error("Uploaded file is empty.");
  }

  const headers = Object.keys(data[0]);
  const missingColumns = requiredColumns.filter((column) => !headers.includes(column));

  if (missingColumns.length > 0) {
    throw new Error(`Missing required columns: ${missingColumns.join(", ")}`);
  }

  const validLogs = [];
  const invalidRows = [];

  data.forEach((row, index) => {
    const rowNumber = index + 2; // +2 accounts for header row + 0-index
    const reasons = [];

    const actor = String(row.actor || "").trim();
    const role = String(row.role || "").toLowerCase().trim();
    const action = String(row.action || "").toUpperCase().trim();
    const resource = String(row.resource || "").trim();
    const resourceType = String(row.resourceType || "").toUpperCase().trim();
    const ipAddress = String(row.ipAddress || "").trim();
    const region = String(row.region || "").toLowerCase().trim();
    const severity = String(row.severity || "").toUpperCase().trim();
    const status = String(row.status || "").trim();
    const timestamp = parseTimestamp(row.timestamp);

    if (!actor) reasons.push("actor is required");
    if (!allowedRoles.includes(role)) reasons.push(`invalid role "${row.role}"`);
    if (!action) reasons.push("action is required");
    if (!resource) reasons.push("resource is required");
    if (!resourceType) reasons.push("resourceType is required");
    if (!ipAddress) reasons.push("ipAddress is required");
    if (!region) reasons.push("region is required");
    if (!severityMap[severity]) reasons.push(`invalid severity "${row.severity}"`);
    if (!allowedStatus.includes(status.toLowerCase())) reasons.push(`invalid status "${row.status}"`);
    if (!timestamp) reasons.push(`invalid timestamp "${row.timestamp}"`);

    if (reasons.length > 0) {
      invalidRows.push({ row: rowNumber, reasons });
      return;
    }

    validLogs.push({
      actor,
      role,
      action,
      resource,
      resourceType,
      ipAddress,
      region,
      severity,
      severityLevel: severityMap[severity],
      status: status.toLowerCase() === "resolved" ? "Resolved" : "Unresolved",
      timestamp,
    });
  });

  return { validLogs, invalidRows };
};

module.exports = parseFile;
