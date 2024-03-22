import React, {useRef, useState} from "react";
import axios from "axios";
import "../css/LibraryUpload.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const resolveAfter3Seconds = new Promise((resolve) => { setTimeout ( resolve, 3000 ); } );

const LibraryUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const uploadPromise = axios.post(
        "https://ciaranchaney.com:443/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
    );

    try {
      const response = await toast.promise(
          uploadPromise,
          {
            pending: "Uploading file...",
            success: "File uploaded successfully!",
            error: "Error uploading file!",
          }
      );

      const hashValue = response.data;

      onFileUpload(hashValue);

      console.log("File uploaded successfully:", hashValue);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="upload-container">
      <ToastContainer />
      <input type="file" onChange={handleFileChange} className="file-input" />
      <button onClick={handleUpload} className="upload-button">
        Upload
      </button>
    </div>
  );
};

export default LibraryUpload;