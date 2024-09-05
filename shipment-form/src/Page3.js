import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProgressTracker from "./ProgressTracker";
import styles from "./Page3.module.css";

const Page3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.formData || {};

  const [formData, setFormData] = useState({
    ...initialData,
    shippingMethod: "",
    trackingNumber: "",
    shippingAddress: "",
    shippingPhoneNumber: "",
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

    // Validate Shipping Method
    if (!formData.shippingMethod) {
      newErrors.shippingMethod = "Shipping Method is required";
    }

    // Validate Tracking Number
    if (!formData.trackingNumber) {
      newErrors.trackingNumber = "Tracking Number is required";
    }

    // Validate Shipping Address
    if (!formData.shippingAddress) {
      newErrors.shippingAddress = "Shipping Address is required";
    }

    // Validate Phone Number
    const phonePattern = /^\d{10}$/; // Example pattern for a 10-digit phone number
    if (!formData.shippingPhoneNumber) {
      newErrors.shippingPhoneNumber = "Phone Number is required";
    } else if (!phonePattern.test(formData.shippingPhoneNumber)) {
      newErrors.shippingPhoneNumber = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate("/page4", { state: { formData } });
    }
  };

  const handlePrevious = () => {
    navigate("/page2", { state: { formData } });
  };

  return (
    <div className={styles.container}>
      <Dashboard />
      <ProgressTracker currentStep={3} />
      <div className={styles.content}>
        <h2 style={{ color: "#ffffff" }}>Shipping Details</h2>
        <form>
          <div className="form-group">
            <label>
              Shipping Method:
              <input
                type="text"
                name="shippingMethod"
                value={formData.shippingMethod}
                onChange={handleChange}
              />
            </label>
            {errors.shippingMethod && (
              <span className={styles.error}>{errors.shippingMethod}</span>
            )}
          </div>

          <div className="form-group">
            <label>
              Tracking Number:
              <input
                type="text"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleChange}
              />
            </label>
            {errors.trackingNumber && (
              <span className={styles.error}>{errors.trackingNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label>
              Shipping Address:
              <input
                type="text"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
              />
            </label>
            {errors.shippingAddress && (
              <span className={styles.error}>{errors.shippingAddress}</span>
            )}
          </div>

          <div className="form-group">
            <label>
              Phone Number:
              <input
                type="text"
                name="shippingPhoneNumber"
                value={formData.shippingPhoneNumber}
                onChange={handleChange}
              />
            </label>
            {errors.shippingPhoneNumber && (
              <span className={styles.error}>{errors.shippingPhoneNumber}</span>
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

export default Page3;
