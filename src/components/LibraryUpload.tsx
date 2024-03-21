import React, { useState } from "react";
import axios from "axios";
import "../css/LibraryUpload.css";

const LibraryUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://ciaranchaney.com:443/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const hashValue = response.data;

      // Call the onFileUpload callback with the hash value
      onFileUpload(hashValue);

      console.log("File uploaded successfully:", hashValue);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="upload-container">
      <input type="file" onChange={handleFileChange} className="file-input" />
      <button onClick={handleUpload} className="upload-button">
        Upload
      </button>
    </div>
  );
};

export default LibraryUpload;
