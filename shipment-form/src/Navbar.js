import React from "react";
import styles from "./Navbar.module.css";
import { FaSearch, FaBell, FaUserCircle, FaCog } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <h1>Shipment Tracker</h1>
      </div>

      <div className={styles.center}>
        <form className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <FaSearch />
          </button>
        </form>
      </div>

      <div className={styles.right}>
        <FaBell className={styles.icon} title="Notifications" />
        <FaUserCircle className={styles.icon} title="Profile" />
        <FaCog className={styles.icon} title="Settings" />
      </div>
    </nav>
  );
};

export default Navbar;
