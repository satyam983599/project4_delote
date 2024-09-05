// import React from "react";
// import PropTypes from "prop-types";
// import styles from "./ProgressTracker.module.css";

// const ProgressTracker = ({ currentStep }) => {
// const steps = [
//   { label: "senderAddress", page: "page1" },
//   { label: "receiverAddress", page: "page2" },
//   { label: "shippingDetails", page: "page3" },
//   { label: "Price", page: "page4" },
// ];

//   return (
//     <div className={styles.progressTracker}>
//       {steps.map((step, index) => (
//         <div
//           key={step.page}
//           className={`${styles.step} ${
//             index + 1 === currentStep ? styles.active : ""
//           }`}
//         >
//           {step.label}
//         </div>
//       ))}
//     </div>
//   );
// };

// ProgressTracker.propTypes = {
//   currentStep: PropTypes.number.isRequired,
// };

// export default ProgressTracker;
import React from "react";
import styles from "./ProgressTracker.module.css";

const ProgressTracker = ({ currentStep }) => {
  // Updated steps array with label and page
  const steps = [
    { label: "senderAddress", page: "page1" },
    { label: "receiverAddress", page: "page2" },
    { label: "shippingDetails", page: "page3" },
    { label: "Price", page: "page4" },
  ];

  return (
    <div className={styles.progressContainer}>
      {steps.map((step, index) => (
        <div key={step.page} className={styles.stepContainer}>
          <button
            className={`${styles.stepButton} ${
              currentStep >= index + 1 ? styles.completed : ""
            }`}
          >
            {step.label}
          </button>
          {index < steps.length - 1 && (
            <div
              className={`${styles.connector} ${
                currentStep > index + 1 ? styles.completedConnector : ""
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressTracker;
