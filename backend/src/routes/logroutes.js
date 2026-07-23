const express = require("express");

const logrouter = express.Router();

const upload = require("../middlewares/upload");


const { uploadLogs, getLogs } = require("../controller/logcontroller");


logrouter.post("/upload", upload.single("file"), uploadLogs);


logrouter.get("/", getLogs);

 

module.exports = logrouter;
