import React from "react";
import styles from "./Dashboard.module.css"; // Make sure this path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCog,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.tags}>
        <div className={styles.tag}>
          <FontAwesomeIcon icon={faChartLine} />
          <span>Task1</span>
        </div>
        <div className={styles.tag}>
          <FontAwesomeIcon icon={faCog} />
          <span>Task2</span>
        </div>
        <div className={styles.tag}>
          <FontAwesomeIcon icon={faBell} />
          <span>Task3</span>
        </div>
        <div className={styles.tag}>
          <FontAwesomeIcon icon={faUser} />
          <span>Task4</span>
        </div>
        <div className={styles.tag}>
          <FontAwesomeIcon icon={faUser} />
          <span>Task5</span>
        </div>
        <div className={styles.tag}>
          <FontAwesomeIcon icon={faUser} />
          <span>Task6</span>
        </div>
        <div className={styles.tag}>
          <FontAwesomeIcon icon={faUser} />
          <span>Task7</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
