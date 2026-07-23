const fs = require("fs");

const Log = require("../models/Log");

const parseFile = require("../utils/parseFile");
const buildFilter = require("../utils/buildFilter");
const buildSort = require("../utils/buildSort");

const safeUnlink = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const uploadLogs = async (filePath) => {
  try {
    const { validLogs, invalidRows } = parseFile(filePath);

    if (validLogs.length === 0) {
      safeUnlink(filePath);
      const error = new Error("No valid rows found in the uploaded file.");
      error.statusCode = 400;
      error.invalidRows = invalidRows;
      throw error;
    }

    let insertedCount = 0;
    let insertErrors = [];

    try {
      const inserted = await Log.insertMany(validLogs, { ordered: false });
      insertedCount = inserted.length;
    } catch (bulkError) {
    
      insertedCount = bulkError.result?.nInserted ?? bulkError.insertedDocs?.length ?? 0;

      if (bulkError.writeErrors) {
        insertErrors = bulkError.writeErrors.map((e) => ({
          index: e.index,
          message: e.errmsg || e.err?.errmsg || "Failed to insert row",
        }));
      } else {
        throw bulkError;
      }
    }

    safeUnlink(filePath);

    return {
      insertedCount,
      skippedCount: invalidRows.length + insertErrors.length,
      invalidRows,
      insertErrors,
    };
  } catch (error) {
    safeUnlink(filePath);
    throw error;
  }
};

const getLogs = async (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.max(Number(query.limit) || 10, 1);
  const skip = (page - 1) * limit;

  const filter = buildFilter(query);
  const sort = buildSort(query);

  const totalRecords = await Log.countDocuments(filter);

  const logs = await Log.find(filter).sort(sort).skip(skip).limit(limit).lean();

  return {
    logs,
    pagination: {
      currentPage: page,
      totalPages: Math.max(Math.ceil(totalRecords / limit), 1),
      totalRecords,
      limit,
    },
  };
};


module.exports = {
  uploadLogs,
  getLogs,
};
