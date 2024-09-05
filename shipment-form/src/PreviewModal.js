import React, { useState } from "react";
import axios from "axios";

const PreviewModal = ({ formData, closeModal }) => {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/shipments",
        formData
      );
      if (response.data.success) {
        alert("Data saved successfully!");
        closeModal(); // Close the modal after saving
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

  return (
    <div className="modal">
      <div className="modalContent">
        <h2>Preview Data</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
        <button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        {saveError && <p className="error">{saveError}</p>}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default PreviewModal;
