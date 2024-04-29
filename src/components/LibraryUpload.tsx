import { useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// @ts-ignore
const LibraryUpload = ({onFileUpload}) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            // @ts-ignore
            setFile(files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            toast.info("Uploading file...");

            await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await axios.post(
                "https://ciaranchaney.com:443/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const hashValue = response.data;

            onFileUpload(hashValue);

            toast.success("File uploaded successfully!");
            console.log("File uploaded successfully:", hashValue);
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Error uploading file!");
        }
    };


    return (
        <div className="col">
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label"></label>
                    <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="col">
                    <button
                        className="btn btn-dark btn-lg"
                        onClick={handleUpload}
                        type="button"
                    >
                        Upload File
                    </button>
                </div>
        </div>
    );
};

export default LibraryUpload;
