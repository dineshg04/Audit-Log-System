import API from "./axios";


export const uploadLogs = async (formData) => {
  return await API.post("/api/logs/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const getLogs = async (params) => {
  return await API.get("/api/logs", { params });
};

