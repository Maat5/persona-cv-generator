/* 
 * Education section component
 */

import type { ResumeData } from "../../types";
import styles from "../editor.module.css";
import { PlusIcon } from "../../../components/icons";

interface EducationSectionProps {
  education: ResumeData["education"];
  onAdd: () => void;
  onUpdate: (
    index: number,
    key: keyof ResumeData["education"][number],
    value: string
  ) => void;
  onRemove: (index: number) => void;
}

export function EducationSection({
  education,
  onAdd,
  onUpdate,
  onRemove,
}: EducationSectionProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Education</h2>
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
        {education.length === 0 && (
          <p className={styles.muted}>Add your education history.</p>
        )}
        {education.map((edu, index) => (
          <div key={index} className={styles.itemBlock}>
            <div className={styles.itemBlockHeader}>
              <span className={styles.itemTitle}>
                {edu.institution || `Education #${index + 1}`}
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
                <label className={styles.label}>Institution</label>
                <input
                  className={styles.input}
                  value={edu.institution}
                  onChange={(e) =>
                    onUpdate(index, "institution", e.target.value)
                  }
                  placeholder="University Name"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Period</label>
                <input
                  className={styles.input}
                  value={edu.period}
                  onChange={(e) =>
                    onUpdate(index, "period", e.target.value)
                  }
                  placeholder="2019 - 2023"
                />
              </div>
              <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
                <label className={styles.label}>Degree</label>
                <input
                  className={styles.input}
                  value={edu.degree}
                  onChange={(e) =>
                    onUpdate(index, "degree", e.target.value)
                  }
                  placeholder="BSc Computer Science"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
