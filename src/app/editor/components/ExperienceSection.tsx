/* 
 * Experience section with responsibilities management
 */

import type { ResumeData } from "../../types";
import styles from "../editor.module.css";
import { PlusIcon, XIcon } from "./icons";

interface ExperienceSectionProps {
  experience: ResumeData["experience"];
  onAdd: () => void;
  onUpdate: (
    index: number,
    key: keyof ResumeData["experience"][number],
    value: string | string[]
  ) => void;
  onRemove: (index: number) => void;
  onAddResponsibility: (expIndex: number) => void;
  onUpdateResponsibility: (expIndex: number, respIndex: number, value: string) => void;
  onRemoveResponsibility: (expIndex: number, respIndex: number) => void;
}

export function ExperienceSection({
  experience,
  onAdd,
  onUpdate,
  onRemove,
  onAddResponsibility,
  onUpdateResponsibility,
  onRemoveResponsibility,
}: ExperienceSectionProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Experience</h2>
        <div className={styles.cardActions}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            type="button"
            onClick={onAdd}
          >
            <PlusIcon />
            Add
          </button>
        </div>
      </div>
      <div className={styles.cardBody}>
        {experience.length === 0 && (
          <p className={styles.muted}>
            Add your work history and responsibilities.
          </p>
        )}
        {experience.map((exp, index) => (
          <div key={index} className={styles.itemBlock}>
            <div className={styles.itemBlockHeader}>
              <span className={styles.itemTitle}>
                {exp.company || exp.position || `Experience #${index + 1}`}
              </span>
              <button
                className={`${styles.btn} ${styles.btnDanger}`}
                type="button"
                onClick={() => onRemove(index)}
              >
                Remove
              </button>
            </div>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label className={styles.label}>Company</label>
                <input
                  className={styles.input}
                  value={exp.company}
                  onChange={(e) =>
                    onUpdate(index, "company", e.target.value)
                  }
                  placeholder="Company Name"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Period</label>
                <input
                  className={styles.input}
                  value={exp.period}
                  onChange={(e) =>
                    onUpdate(index, "period", e.target.value)
                  }
                  placeholder="Jan 2023 - Present"
                />
              </div>
              <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
                <label className={styles.label}>Position</label>
                <input
                  className={styles.input}
                  value={exp.position}
                  onChange={(e) =>
                    onUpdate(index, "position", e.target.value)
                  }
                  placeholder="Software Engineer"
                />
              </div>
            </div>

            <div
              className={styles.itemBlockHeader}
              style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
            >
              <span className={styles.muted}>Responsibilities</span>
              <button
                className={styles.btn}
                type="button"
                onClick={() => onAddResponsibility(index)}
              >
                <PlusIcon size={12} />
                Add
              </button>
            </div>

            <div className={styles.responsibilityList}>
              {exp.responsibilities.map((resp, ri) => (
                <div key={ri} className={styles.responsibilityRow}>
                  <textarea
                    className={styles.textarea}
                    value={resp}
                    onChange={(e) =>
                      onUpdateResponsibility(index, ri, e.target.value)
                    }
                    placeholder="Describe your responsibility..."
                    rows={2}
                  />
                  <button
                    className={`${styles.btn} ${styles.btnDanger}`}
                    type="button"
                    onClick={() => onRemoveResponsibility(index, ri)}
                    aria-label="Remove responsibility"
                  >
                    <XIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
