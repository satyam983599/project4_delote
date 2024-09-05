import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Import axios
import Dashboard from "./Dashboard";
import ProgressTracker from "./ProgressTracker";
import styles from "./Page4.module.css";
import JsBarcode from "jsbarcode";
import { PDFDocument } from "pdf-lib";

const Page4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(location.state?.formData || {});
  const [showPreview, setShowPreview] = useState(false);
  const [showBarcodePopup, setShowBarcodePopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false); // Add saving state
  const [saveError, setSaveError] = useState(""); // Add saveError state

  useEffect(() => {
    if (showBarcodePopup) {
      const barcodeCanvas = document.getElementById("barcodeCanvas");
      JsBarcode(barcodeCanvas, JSON.stringify(formData), {
        format: "CODE128",
        displayValue: false,
      });
    }
  }, [showBarcodePopup, formData]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Price
    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    // Validate Currency
    if (!formData.currency) {
      newErrors.currency = "Currency is required";
    } else if (!/^[A-Z]{3}$/.test(formData.currency)) {
      newErrors.currency = "Currency must be a 3-letter code (e.g., USD)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setShowPreview(true); // Open preview modal
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");

    try {
      // Save the form data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/shipments",
        formData
      );
      if (response.data.success) {
        alert("Data saved successfully!");
        setShowPreview(false); // Close preview modal
        setShowBarcodePopup(true); // Open barcode popup
      } else {
        setSaveError("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setSaveError("Error saving data");
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPNG = () => {
    const barcodeCanvas = document.createElement("canvas");
    JsBarcode(barcodeCanvas, JSON.stringify(formData), {
      format: "CODE128",
      displayValue: false,
    });
    const pngUrl = barcodeCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "barcode.png";
    link.click();
  };

  const handleDownloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([200, 100]);
    const barcodeCanvas = document.createElement("canvas");
    JsBarcode(barcodeCanvas, JSON.stringify(formData), {
      format: "CODE128",
      displayValue: false,
    });
    const pngUrl = barcodeCanvas.toDataURL("image/png");
    const pngImage = await pdfDoc.embedPng(pngUrl);
    page.drawImage(pngImage, {
      x: 10,
      y: 10,
      width: 180,
      height: 80,
    });
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "barcode.pdf";
    link.click();
  };

  const handleEdit = (page) => {
    navigate(`/${page}`, { state: { formData } });
  };

  return (
    <div className={styles.container}>
      <Dashboard />
      <ProgressTracker currentStep={4} />
      <div className={styles.content}>
        <h2 style={{ color: "#ffffff" }}>Price</h2>
        <form>
          <div className="form-group">
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleInputChange}
              />
            </label>
            {errors.price && (
              <span className={styles.error}>{errors.price}</span>
            )}
          </div>

          <div className="form-group">
            <label>
              Currency:
              <input
                type="text"
                name="currency"
                value={formData.currency || ""}
                onChange={handleInputChange}
              />
            </label>
            {errors.currency && (
              <span className={styles.error}>{errors.currency}</span>
            )}
          </div>

          <button type="button" onClick={() => navigate("/page3")}>
            Previous
          </button>
          <button type="button" onClick={handleNext}>
            Preview
          </button>
        </form>
      </div>
      {showPreview && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Form Data Summary</h3>
            <div className={styles.formSection}>
              <h4>Page 1 Details</h4>
              <p>Name: {formData.name}</p>
              <p>Email: {formData.email}</p>
              <p>Address: {formData.address}</p>
              <p>Phone Number: {formData.phoneNumber}</p>
              <button onClick={() => handleEdit("page1")}>Edit</button>
            </div>
            <div className={styles.formSection}>
              <h4>Page 2 Details</h4>
              <p>Receiver Name: {formData.receiverName}</p>
              <p>Receiver Email: {formData.receiverEmail}</p>
              <p>Receiver Address: {formData.receiverAddress}</p>
              <p>Receiver Phone Number: {formData.receiverPhoneNumber}</p>
              <button onClick={() => handleEdit("page2")}>Edit</button>
            </div>
            <div className={styles.formSection}>
              <h4>Page 3 Details</h4>
              <p>Shipping Method: {formData.shippingMethod}</p>
              <p>Tracking Number: {formData.trackingNumber}</p>
              <p>Shipping Address: {formData.shippingAddress}</p>
              <p>Shipping Phone Number: {formData.shippingPhoneNumber}</p>
              <button onClick={() => handleEdit("page3")}>Edit</button>
            </div>
            <div className={styles.formSection}>
              <h4>Page 4 Details</h4>
              <p>Price: {formData.price}</p>
              <p>Currency: {formData.currency}</p>
              <button onClick={() => handleEdit("page4")}>Edit</button>
            </div>
            <button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            {saveError && <p className={styles.error}>{saveError}</p>}
          </div>
        </div>
      )}

      {showBarcodePopup && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Generate Barcode</h3>
            <canvas id="barcodeCanvas"></canvas>
            <button onClick={handleDownloadPNG}>Download PNG</button>
            <button onClick={handleDownloadPDF}>Download PDF</button>
            <button onClick={() => setShowBarcodePopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page4;
