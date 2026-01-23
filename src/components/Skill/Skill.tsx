import { SkillLevel as SkillLevelType } from "@/app/types";
import styles from "./styles.module.css";

type SkillProps = {
  skills: SkillLevelType[];
};

type SkillDotsProps = {
  level: number;
  maxLevel?: number;
};

const SkillDots = ({ level, maxLevel = 10 }: SkillDotsProps) => (
  <div className={styles.skillDots}>
    {[...Array(maxLevel)].map((_, i) => (
      <div
        key={i}
        className={`${styles.skillDot} ${
          i < level ? styles.skillDotActive : styles.skillDotInactive
        }`}
      />
    ))}
  </div>
);
export const Skill = ({ skills }: SkillProps) => {
  return (
    <>
      {skills.map((skill, index) => (
        <div key={index} className={styles.skillItem}>
          <span className={styles.skillName}>
            {skill.name}
          </span>
          <div className={styles.skillDots}>
            <SkillDots level={skill.level} />
          </div>
        </div>
      ))}
    </>
  );
};
