/* 
 * CV Generator - Editor Page
 */

"use client";

import type { ResumeData } from "../types";
import { useResumeData } from "./hooks/useResumeData";
import { useResumeStrength } from "./hooks/useResumeStrength";
import { TopNavigationBar } from "./components/TopNavigationBar";
import { ProgressCard } from "./components/ProgressCard";
import { PersonalInfoSection } from "./components/PersonalInfoSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { SkillsSection } from "./components/SkillsSection";
import { EducationSection } from "./components/EducationSection";
import { CoursesSection } from "./components/CoursesSection";
import { LanguagesSection } from "./components/LanguagesSection";
import { PreviewPanel } from "./components/PreviewPanel";

import styles from "./editor.module.css";

export default function EditorPage() {
  const { resume, setResume, saveState, reset, save } = useResumeData();
  const strength = useResumeStrength(resume);

  // Header field updaters
  function setHeaderField<K extends keyof ResumeData["header"]>(
    key: K,
    value: ResumeData["header"][K]
  ) {
    setResume((prev) => ({
      ...prev,
      header: { ...prev.header, [key]: value },
    }));
  }

  function setContactField<K extends keyof ResumeData["contactInfo"]>(
    key: K,
    value: ResumeData["contactInfo"][K]
  ) {
    setResume((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [key]: value },
    }));
  }

  // Experience handlers
  function addExperience() {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: "", period: "", position: "", responsibilities: [""] },
      ],
    }));
  }

  function updateExperienceField(
    index: number,
    key: keyof ResumeData["experience"][number],
    value: string | string[]
  ) {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((e, i) =>
        i === index ? ({ ...e, [key]: value } as typeof e) : e
      ),
    }));
  }

  function removeExperience(index: number) {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  }

  function addResponsibility(expIndex: number) {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((e, i) =>
        i === expIndex
          ? { ...e, responsibilities: [...e.responsibilities, ""] }
          : e
      ),
    }));
  }

  function updateResponsibility(
    expIndex: number,
    respIndex: number,
    value: string
  ) {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((e, i) =>
        i === expIndex
          ? {
              ...e,
              responsibilities: e.responsibilities.map((r, ri) =>
                ri === respIndex ? value : r
              ),
            }
          : e
      ),
    }));
  }

  function removeResponsibility(expIndex: number, respIndex: number) {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((e, i) =>
        i === expIndex
          ? {
              ...e,
              responsibilities: e.responsibilities.filter(
                (_, ri) => ri !== respIndex
              ),
            }
          : e
      ),
    }));
  }

  // Education handlers
  function addEducation() {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { institution: "", period: "", degree: "" },
      ],
    }));
  }

  function updateEducation(
    index: number,
    key: keyof ResumeData["education"][number],
    value: string
  ) {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((e, i) =>
        i === index ? { ...e, [key]: value } : e
      ),
    }));
  }

  function removeEducation(index: number) {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  }

  // Course handlers
  function addCourse() {
    setResume((prev) => ({
      ...prev,
      courses: [...prev.courses, { institution: "", year: "", course: "" }],
    }));
  }

  function updateCourse(
    index: number,
    key: keyof ResumeData["courses"][number],
    value: string
  ) {
    setResume((prev) => ({
      ...prev,
      courses: prev.courses.map((c, i) =>
        i === index ? { ...c, [key]: value } : c
      ),
    }));
  }

  function removeCourse(index: number) {
    setResume((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index),
    }));
  }

  // Language handlers
  function addLanguage() {
    setResume((prev) => ({
      ...prev,
      languages: [...prev.languages, { language: "", level: 0 }],
    }));
  }

  function updateLanguage(
    index: number,
    key: keyof ResumeData["languages"][number],
    value: string | number
  ) {
    setResume((prev) => ({
      ...prev,
      languages: prev.languages.map((l, i) =>
        i === index ? { ...l, [key]: value } : l
      ),
    }));
  }

  function removeLanguage(index: number) {
    setResume((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  }

  // Skill handlers
  function addSkill(group: "primary" | "secondary" | "otherSkills") {
    setResume((prev) => {
      if (group === "otherSkills")
        return {
          ...prev,
          otherSkills: [...prev.otherSkills, { name: "", level: 0 }],
        };
      return {
        ...prev,
        knowledgeAndTools: {
          ...prev.knowledgeAndTools,
          [group]: [...prev.knowledgeAndTools[group], { name: "", level: 0 }],
        },
      };
    });
  }

  function updateSkill(
    group: "primary" | "secondary" | "otherSkills",
    index: number,
    key: "name" | "level",
    value: string | number
  ) {
    setResume((prev) => {
      if (group === "otherSkills") {
        return {
          ...prev,
          otherSkills: prev.otherSkills.map((s, i) =>
            i === index ? { ...s, [key]: value } : s
          ),
        };
      }

      return {
        ...prev,
        knowledgeAndTools: {
          ...prev.knowledgeAndTools,
          [group]: prev.knowledgeAndTools[group].map((s, i) =>
            i === index ? { ...s, [key]: value } : s
          ),
        },
      };
    });
  }

  function removeSkill(
    group: "primary" | "secondary" | "otherSkills",
    index: number
  ) {
    setResume((prev) => {
      if (group === "otherSkills")
        return {
          ...prev,
          otherSkills: prev.otherSkills.filter((_, i) => i !== index),
        };
      return {
        ...prev,
        knowledgeAndTools: {
          ...prev.knowledgeAndTools,
          [group]: prev.knowledgeAndTools[group].filter((_, i) => i !== index),
        },
      };
    });
  }

  return (
    <div className={styles.page}>
      {/* Top Navigation Bar */}
      <TopNavigationBar
        saveState={saveState}
        onSave={save}
        onReset={reset}
      />

      {/* Progress Card */}
      <ProgressCard strength={strength} />

      {/* Main Content */}
      <div className={styles.shell}>
        {/* Left Column - Form */}
        <div className={styles.leftCol}>
          <PersonalInfoSection
            header={resume.header}
            contactInfo={resume.contactInfo}
            onHeaderChange={setHeaderField}
            onContactChange={setContactField}
          />

          <ExperienceSection
            experience={resume.experience}
            onAdd={addExperience}
            onUpdate={updateExperienceField}
            onRemove={removeExperience}
            onAddResponsibility={addResponsibility}
            onUpdateResponsibility={updateResponsibility}
            onRemoveResponsibility={removeResponsibility}
          />

          <SkillsSection
            knowledgeAndTools={resume.knowledgeAndTools}
            otherSkills={resume.otherSkills}
            onAdd={addSkill}
            onUpdate={updateSkill}
            onRemove={removeSkill}
          />

          <EducationSection
            education={resume.education}
            onAdd={addEducation}
            onUpdate={updateEducation}
            onRemove={removeEducation}
          />

          <CoursesSection
            courses={resume.courses}
            onAdd={addCourse}
            onUpdate={updateCourse}
            onRemove={removeCourse}
          />

          <LanguagesSection
            languages={resume.languages}
            onAdd={addLanguage}
            onUpdate={updateLanguage}
            onRemove={removeLanguage}
          />
        </div>

        {/* Right Column - Preview */}
        <PreviewPanel resume={resume} />
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
