/* 
 * Languages section component
 */

import type { ResumeData } from "../../types";
import styles from "../editor.module.css";
import { PlusIcon } from "./icons";

interface LanguagesSectionProps {
  languages: ResumeData["languages"];
  onAdd: () => void;
  onUpdate: (
    index: number,
    key: keyof ResumeData["languages"][number],
    value: string | number
  ) => void;
  onRemove: (index: number) => void;
}

function getRangeStyle(value: number, max: number = 10) {
  const percent = (value / max) * 100;
  return {
    background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${percent}%, var(--border-default) ${percent}%, var(--border-default) 100%)`,
  };
}

export function LanguagesSection({
  languages,
  onAdd,
  onUpdate,
  onRemove,
}: LanguagesSectionProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Languages</h2>
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
        {languages.length === 0 && (
          <p className={styles.muted}>Add the languages you speak.</p>
        )}
        {languages.map((lang, index) => (
          <div key={index} className={styles.itemBlock}>
            <div className={styles.itemBlockHeader}>
              <span className={styles.itemTitle}>
                {lang.language || `Language #${index + 1}`}
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
                <label className={styles.label}>Language</label>
                <input
                  className={styles.input}
                  value={lang.language}
                  onChange={(e) =>
                    onUpdate(index, "language", e.target.value)
                  }
                  placeholder="English"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Level (0-10)</label>
                <div className={styles.smallRow}>
                  <input
                    className={styles.range}
                    type="range"
                    min={0}
                    max={10}
                    value={Number(lang.level) || 0}
                    onChange={(e) =>
                      onUpdate(index, "level", Number(e.target.value))
                    }
                    style={getRangeStyle(Number(lang.level) || 0)}
                  />
                  <span className={styles.muted} style={{ width: 28, textAlign: "right" }}>
                    {Number(lang.level) || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
