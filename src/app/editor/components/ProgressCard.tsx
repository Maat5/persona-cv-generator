/* 
 * Progress card showing resume completion strength
 */

import styles from "../editor.module.css";

interface ProgressCardProps {
  strength: number;
}

export function ProgressCard({ strength }: ProgressCardProps) {
  return (
    <div className={styles.progressCard}>
      <div className={styles.progressHeader}>
        <span className={styles.progressTitle}>Resume Strength</span>
        <span className={styles.progressPercent}>{strength}% Complete</span>
      </div>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${strength}%` }}
        />
      </div>
    </div>
  );
}
