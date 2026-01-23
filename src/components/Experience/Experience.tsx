import { Experience as ExperienceType } from "@/app/types";
import styles from "./styles.module.css";

type ExperienceProps = {
  experience: ExperienceType[];
};

export const Experience = ({ experience }: ExperienceProps) => {
  return (
    <div className={styles.experienceContainer}>
      {experience?.length > 0 && (
        <>
          <h2 className={styles.headingRow}>Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className={styles.experienceItem}>
              <div className={styles.experienceItemHeader}>
                <div className={styles.experienceItemHeaderCompany}>
                  {exp.company}
                </div>
                <div className={styles.experienceItemHeaderPeriod}>
                  {exp.period}
                </div>
              </div>
              <div className={styles.experienceItemContent}>
                <div className={styles.experienceItemPosition}>
                  {exp.position}
                </div>
                <ul className={styles.experienceItemResponsibilities}>
                  {exp.responsibilities.map((resp, idx) => (
                    <li
                      key={idx}
                      className={styles.experienceItemResponsibility}
                    >
                      <span
                        className={styles.experienceItemResponsibilityBullet}
                      >
                        -
                      </span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
