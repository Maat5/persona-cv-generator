/* 
 * Skills and tools section with primary, secondary, and other skills
 */

import type { ResumeData } from "../../types";
import styles from "../editor.module.css";
import { PlusIcon, XIcon } from "@/components/icons";

interface SkillsSectionProps {
  knowledgeAndTools: ResumeData["knowledgeAndTools"];
  otherSkills: ResumeData["otherSkills"];
  onAdd: (group: "primary" | "secondary" | "otherSkills") => void;
  onUpdate: (
    group: "primary" | "secondary" | "otherSkills",
    index: number,
    key: "name" | "level",
    value: string | number
  ) => void;
  onRemove: (group: "primary" | "secondary" | "otherSkills", index: number) => void;
}

function getRangeStyle(value: number, max: number = 10) {
  const percent = (value / max) * 100;
  return {
    background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${percent}%, var(--border-default) ${percent}%, var(--border-default) 100%)`,
  };
}

export function SkillsSection({
  knowledgeAndTools,
  otherSkills,
  onAdd,
  onUpdate,
  onRemove,
}: SkillsSectionProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Skills & Tools</h2>
      </div>
      <div className={styles.cardBody}>
        {/* Primary Skills */}
        <div className={styles.itemBlock}>
          <div className={styles.itemBlockHeader}>
            <span className={styles.itemTitle}>Primary Skills</span>
            <button
              className={styles.btn}
              type="button"
              onClick={() => onAdd("primary")}
            >
              <PlusIcon size={12} />
              Add
            </button>
          </div>
          {knowledgeAndTools.primary.map((skill, index) => (
            <div key={index} className={styles.grid3} style={{ marginTop: "0.5rem" }}>
              <div className={styles.field}>
                <input
                  className={styles.input}
                  value={skill.name}
                  onChange={(e) =>
                    onUpdate("primary", index, "name", e.target.value)
                  }
                  placeholder="e.g. React, Python"
                />
              </div>
              <div className={styles.field}>
                <div className={styles.smallRow}>
                  <input
                    className={styles.range}
                    type="range"
                    min={0}
                    max={10}
                    value={skill.level}
                    onChange={(e) =>
                      onUpdate("primary", index, "level", Number(e.target.value))
                    }
                    style={getRangeStyle(skill.level)}
                  />
                  <span className={styles.muted} style={{ width: 28, textAlign: "right" }}>
                    {skill.level}
                  </span>
                </div>
              </div>
              <button
                className={`${styles.btn} ${styles.btnDanger}`}
                type="button"
                onClick={() => onRemove("primary", index)}
              >
                <XIcon />
              </button>
            </div>
          ))}
        </div>

        {/* Secondary Skills */}
        <div className={styles.itemBlock}>
          <div className={styles.itemBlockHeader}>
            <span className={styles.itemTitle}>Secondary Skills</span>
            <button
              className={styles.btn}
              type="button"
              onClick={() => onAdd("secondary")}
            >
              <PlusIcon size={12} />
              Add
            </button>
          </div>
          {knowledgeAndTools.secondary.map((skill, index) => (
            <div key={index} className={styles.grid3} style={{ marginTop: "0.5rem" }}>
              <div className={styles.field}>
                <input
                  className={styles.input}
                  value={skill.name}
                  onChange={(e) =>
                    onUpdate("secondary", index, "name", e.target.value)
                  }
                  placeholder="e.g. SQL, Docker"
                />
              </div>
              <div className={styles.field}>
                <div className={styles.smallRow}>
                  <input
                    className={styles.range}
                    type="range"
                    min={0}
                    max={10}
                    value={skill.level}
                    onChange={(e) =>
                      onUpdate("secondary", index, "level", Number(e.target.value))
                    }
                    style={getRangeStyle(skill.level)}
                  />
                  <span className={styles.muted} style={{ width: 28, textAlign: "right" }}>
                    {skill.level}
                  </span>
                </div>
              </div>
              <button
                className={`${styles.btn} ${styles.btnDanger}`}
                type="button"
                onClick={() => onRemove("secondary", index)}
              >
                <XIcon />
              </button>
            </div>
          ))}
        </div>

        {/* Other Skills */}
        <div className={styles.itemBlock}>
          <div className={styles.itemBlockHeader}>
            <span className={styles.itemTitle}>Other Skills</span>
            <button
              className={styles.btn}
              type="button"
              onClick={() => onAdd("otherSkills")}
            >
              <PlusIcon size={12} />
              Add
            </button>
          </div>
          {otherSkills.map((skill, index) => (
            <div key={index} className={styles.grid3} style={{ marginTop: "0.5rem" }}>
              <div className={styles.field}>
                <input
                  className={styles.input}
                  value={skill.name}
                  onChange={(e) =>
                    onUpdate("otherSkills", index, "name", e.target.value)
                  }
                  placeholder="e.g. Agile, Communication"
                />
              </div>
              <div className={styles.field}>
                <div className={styles.smallRow}>
                  <input
                    className={styles.range}
                    type="range"
                    min={0}
                    max={10}
                    value={skill.level}
                    onChange={(e) =>
                      onUpdate("otherSkills", index, "level", Number(e.target.value))
                    }
                    style={getRangeStyle(skill.level)}
                  />
                  <span className={styles.muted} style={{ width: 28, textAlign: "right" }}>
                    {skill.level}
                  </span>
                </div>
              </div>
              <button
                className={`${styles.btn} ${styles.btnDanger}`}
                type="button"
                onClick={() => onRemove("otherSkills", index)}
              >
                <XIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
