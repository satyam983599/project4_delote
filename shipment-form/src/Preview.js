import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import styles from "./Preview.module.css";

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;
  const [qrValue, setQrValue] = useState(""); // State to hold QR code value

  const handleEdit = (page) => {
    navigate(`/${page}`, { state: { formData } });
  };

  const handleGenerateQrCode = () => {
    // Update QR code with form data
    setQrValue(JSON.stringify(formData));
  };

  const handleDownloadQrCode = () => {
    const canvas = document.getElementById("qrCodeCanvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/shipments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Data saved successfully!");
      } else {
        console.error("Error saving data:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!formData) {
    return <div>No form data available</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Preview</h2>
      <div className={styles.content}>
        <h3>Form Data Summary</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
        <div className={styles.qrCodeContainer}>
          {qrValue && (
            <QRCodeCanvas
              id="qrCodeCanvas"
              value={qrValue}
              size={256}
              level="H"
            />
          )}
        </div>
        <button
          onClick={() => handleEdit("page1")}
          className={styles.editButton}
        >
          Edit Page 1
        </button>
        <button
          onClick={() => handleEdit("page2")}
          className={styles.editButton}
        >
          Edit Page 2
        </button>
        <button
          onClick={() => handleEdit("page3")}
          className={styles.editButton}
        >
          Edit Page 3
        </button>
        <button
          onClick={() => handleEdit("page4")}
          className={styles.editButton}
        >
          Edit Page 4
        </button>
        <button onClick={handleSave} className={styles.saveButton}>
          Save
        </button>
        <button
          onClick={handleGenerateQrCode}
          className={styles.generateButton}
        >
          Generate QR Code
        </button>
        {qrValue && (
          <button
            onClick={handleDownloadQrCode}
            className={styles.downloadButton}
          >
            Download QR Code
          </button>
        )}
      </div>
    </div>
  );
};

export default Preview;
