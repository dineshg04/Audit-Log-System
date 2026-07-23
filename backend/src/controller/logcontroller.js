const logService = require("../services/logService");

const uploadLogs = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a CSV or Excel file",
      });
    }
 
    const result = await logService.uploadLogs(req.file.path);

    return res.status(201).json({
      success: true,
      message: `Logs uploaded successfully. Inserted ${result.insertedCount}, skipped ${result.skippedCount}.`,
      insertedCount: result.insertedCount,
      skippedCount: result.skippedCount,
      invalidRows: result.invalidRows,
      insertErrors: result.insertErrors,
    });
  } catch (error) {
    next(error);
  }
};

const getLogs = async (req, res, next) => {
  try {
    const logs = await logService.getLogs(req.query);

    res.status(200).json({
      success: true,
      ...logs,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  uploadLogs,
  getLogs,
};
