import {
  SkillLevel as SkillLevelType,
  Course as CourseType,
  Language as LanguageType,
  Education as EducationType,
} from "@/app/types";
import { Skill } from "../Skill/Skill";
import styles from "./styles.module.css";

type KnowledgeAndToolsProps = {
  knowledgeAndTools: {
    primary: SkillLevelType[];
    secondary: SkillLevelType[];
  };
  courses: CourseType[];
  languages: LanguageType[];
  education: EducationType[];
};

export const KnowledgeAndTools = ({
  knowledgeAndTools,
  courses,
  languages,
  education,
}: KnowledgeAndToolsProps) => {
  return (
    <div className={styles.knowledgeAndToolsContainer}>
      {
        (knowledgeAndTools?.primary?.length > 0 || knowledgeAndTools?.secondary?.length > 0) && (
          <>
            <h2 className={styles.headingRow}>Knowledge and Tools</h2>
            <div className={styles.skillsContainer}>
              <Skill skills={knowledgeAndTools?.primary || []} />
              <Skill skills={knowledgeAndTools?.secondary || []} />
            </div>
          </>
        )}

      {languages && languages.length > 0 && (
        <>
          <h2 className={styles.headingRow}>Languages</h2>
          <div className={styles.skillsContainer}>
            <Skill
              skills={languages.map((language) => ({
                name: language.language,
                level: Number(language.level),
              }))}
            />
          </div>
        </>
      )}

      {courses && courses?.length > 0 && (
        <>
          <h2 className={styles.headingRow}>Courses</h2>
          <div className={styles.coursesContainer}>
            {courses.map((course, index) => (
              <div
                className={styles.courseContainer}
                key={`${index}-${course.institution}`}
              >
                <div className={styles.bulletItem}></div>
                <div className={styles.courseContent}>
                  <div className={styles.courseItem}>
                    <h3>{course.institution}</h3>
                    <p className={styles.courseYear}>{course.year}</p>
                  </div>
                  <p className={styles.courseCourse}>{course.course}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {education && education?.length > 0 && (
        <>
          <h2 className={styles.headingRow}>Education</h2>
          <div className={styles.coursesContainer}>
            {education.map((education, index) => (
              <div
                className={styles.courseContainer}
                key={`${index}-${education.institution}`}
              >
                <div className={styles.bulletItem}></div>
                <div className={styles.courseContent}>
                  <div className={styles.courseItem}>
                    <h3>{education.institution}</h3>
                    <p className={styles.courseYear}>{education.period}</p>
                  </div>
                  <p className={styles.courseCourse}>{education.degree}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
