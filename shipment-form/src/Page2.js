import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProgressTracker from "./ProgressTracker";
import styles from "./Page2.module.css";

const Page2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.formData || {};

  const [formData, setFormData] = useState({
    ...initialData,
    receiverName: "",
    receiverEmail: "",
    receiverAddress: "",
    receiverPhoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Receiver's Name
    if (!formData.receiverName) {
      newErrors.receiverName = "Receiver's Name is required";
    }

    // Validate Receiver's Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.receiverEmail) {
      newErrors.receiverEmail = "Receiver's Email is required";
    } else if (!emailPattern.test(formData.receiverEmail)) {
      newErrors.receiverEmail = "Invalid email format";
    }

    // Validate Receiver's Address
    if (!formData.receiverAddress) {
      newErrors.receiverAddress = "Receiver's Address is required";
    }

    // Validate Receiver's Phone Number
    const phonePattern = /^\d{10}$/; // Example pattern for a 10-digit phone number
    if (!formData.receiverPhoneNumber) {
      newErrors.receiverPhoneNumber = "Receiver's Phone Number is required";
    } else if (!phonePattern.test(formData.receiverPhoneNumber)) {
      newErrors.receiverPhoneNumber = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate("/page3", { state: { formData } });
    }
  };

  const handlePrevious = () => {
    navigate("/page1", { state: { formData } });
  };

  return (
    <div className={styles.container}>
      <Dashboard />
      <ProgressTracker currentStep={2} />
      <div className={styles.content}>
        <h2 style={{ color: "#ffffff" }}>Receiver Address</h2>
        <form>
          <div className="form-group">
            <label>
              Receiver's Name:
              <input
                type="text"
                name="receiverName"
                value={formData.receiverName}
                onChange={handleChange}
              />
            </label>
            {errors.receiverName && (
              <span className={styles.error}>{errors.receiverName}</span>
            )}
          </div>

          <div className="form-group">
            <label>
              Receiver's Email:
              <input
                type="email"
                name="receiverEmail"
                value={formData.receiverEmail}
                onChange={handleChange}
              />
            </label>
            {errors.receiverEmail && (
              <span className={styles.error}>{errors.receiverEmail}</span>
            )}
          </div>

          <div className="form-group">
            <label>
              Receiver's Address:
              <input
                type="text"
                name="receiverAddress"
                value={formData.receiverAddress}
                onChange={handleChange}
              />
            </label>
            {errors.receiverAddress && (
              <span className={styles.error}>{errors.receiverAddress}</span>
            )}
          </div>

          <div className="form-group">
            <label>
              Receiver's Phone Number:
              <input
                type="text"
                name="receiverPhoneNumber"
                value={formData.receiverPhoneNumber}
                onChange={handleChange}
              />
            </label>
            {errors.receiverPhoneNumber && (
              <span className={styles.error}>{errors.receiverPhoneNumber}</span>
            )}
          </div>

          <button type="button" onClick={handlePrevious}>
            Previous
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page2;
