/* 
 * Personal information and contact details section
 */

import type { ResumeData } from "../../types";
import styles from "../editor.module.css";

interface PersonalInfoSectionProps {
  header: ResumeData["header"];
  contactInfo: ResumeData["contactInfo"];
  onHeaderChange: <K extends keyof ResumeData["header"]>(
    key: K,
    value: ResumeData["header"][K]
  ) => void;
  onContactChange: <K extends keyof ResumeData["contactInfo"]>(
    key: K,
    value: ResumeData["contactInfo"][K]
  ) => void;
}

export function PersonalInfoSection({
  header,
  contactInfo,
  onHeaderChange,
  onContactChange,
}: PersonalInfoSectionProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Personal Information</h2>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Full Name</label>
            <input
              className={styles.input}
              value={header.name}
              onChange={(e) => onHeaderChange("name", e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Job Title</label>
            <input
              className={styles.input}
              value={header.title}
              onChange={(e) => onHeaderChange("title", e.target.value)}
              placeholder="Software Engineer"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={contactInfo.email}
              onChange={(e) => onContactChange("email", e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Phone Number</label>
            <input
              className={styles.input}
              value={contactInfo.phoneNumber}
              onChange={(e) =>
                onContactChange("phoneNumber", e.target.value)
              }
              placeholder="+1 555 123 4567"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>LinkedIn Profile</label>
            <input
              className={styles.input}
              value={contactInfo.likedinUrl}
              onChange={(e) =>
                onContactChange("likedinUrl", e.target.value)
              }
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Website / Portfolio</label>
            <input
              className={styles.input}
              value={header.url}
              onChange={(e) => onHeaderChange("url", e.target.value)}
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
