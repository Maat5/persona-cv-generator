/* 
 * Courses and certifications section component
 */

import type { ResumeData } from "../../types";
import styles from "../editor.module.css";
import { PlusIcon } from "@/components/icons";

interface CoursesSectionProps {
  courses: ResumeData["courses"];
  onAdd: () => void;
  onUpdate: (
    index: number,
    key: keyof ResumeData["courses"][number],
    value: string
  ) => void;
  onRemove: (index: number) => void;
}

export function CoursesSection({
  courses,
  onAdd,
  onUpdate,
  onRemove,
}: CoursesSectionProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Courses & Certifications</h2>
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
        {courses.length === 0 && (
          <p className={styles.muted}>
            Add certifications or courses you&apos;ve completed.
          </p>
        )}
        {courses.map((course, index) => (
          <div key={index} className={styles.itemBlock}>
            <div className={styles.itemBlockHeader}>
              <span className={styles.itemTitle}>
                {course.course || `Course #${index + 1}`}
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
                  value={course.institution}
                  onChange={(e) =>
                    onUpdate(index, "institution", e.target.value)
                  }
                  placeholder="Institution Name"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Year</label>
                <input
                  className={styles.input}
                  value={course.year}
                  onChange={(e) =>
                    onUpdate(index, "year", e.target.value)
                  }
                  placeholder="2024"
                />
              </div>
              <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
                <label className={styles.label}>Course / Certification</label>
                <input
                  className={styles.input}
                  value={course.course}
                  onChange={(e) =>
                    onUpdate(index, "course", e.target.value)
                  }
                  placeholder="Course name"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
