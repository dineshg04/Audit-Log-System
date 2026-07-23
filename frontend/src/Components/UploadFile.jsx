import React, { useRef, useState } from "react";
import { uploadLogs } from "../api/logApi";

const UploadFile = ({ fetchLogs }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();
    const allowedExtensions = ["csv", "xlsx", "xls"];

    if (!allowedExtensions.includes(fileExtension)) {
      alert("Only CSV and Excel files are allowed.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadLogs(formData);
      const { message, skippedCount, invalidRows } = response.data;

      if (skippedCount > 0) {
        const preview = (invalidRows || [])
          .slice(0, 5)
          .map((r) => `Row ${r.row}: ${r.reasons.join("; ")}`)
          .join("\n");
        alert(`${message}\n\nSome rows were skipped:\n${preview}`);
      } else {
        alert(message);
      }

      setFile(null);

      
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      fetchLogs(); 
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Upload Audit Logs</h2>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileChange}
        className="mb-4 block w-full border rounded-md p-2"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadFile;
