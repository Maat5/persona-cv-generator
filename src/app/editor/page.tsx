"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import type { ResumeData } from "../types";
import { createBlankResumeData } from "../utils/defaultResume";
import {
  clearResumeData,
  loadResumeData,
  saveResumeData,
} from "../utils/resumeStorage";

import pageStyles from "../page.module.css";
import styles from "./editor.module.css";

import { Container } from "@/components/Container/Container";
import { Heading } from "@/components/Heading/Heading";

import { Experience } from "@/components/Experience/Experience";
import { KnowledgeAndTools } from "@/components/knowledgeAndTools/KnowledgeAndTools";

type SaveState = "idle" | "saving" | "saved";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function nonEmpty(value: string) {
  return value.trim().length > 0;
}

function computeStrength(data: ResumeData): number {
  const checks: boolean[] = [
    nonEmpty(data.header.name),
    nonEmpty(data.header.title),
    nonEmpty(data.contactInfo.email),
    nonEmpty(data.contactInfo.phoneNumber),
    nonEmpty(data.contactInfo.likedinUrl),
    data.experience.some((e) => nonEmpty(e.company) && nonEmpty(e.position)),
    data.education.some((e) => nonEmpty(e.institution) && nonEmpty(e.degree)),
    data.languages.some((l) => nonEmpty(l.language)),
    data.knowledgeAndTools.primary.some((s) => nonEmpty(s.name)),
    data.knowledgeAndTools.secondary.some((s) => nonEmpty(s.name)),
    data.courses.some((c) => nonEmpty(c.course)),
  ];

  const completed = checks.filter(Boolean).length;
  const pct = Math.round((completed / checks.length) * 100);
  return clamp(pct, 0, 100);
}

export default function EditorPage() {
  const [resume, setResume] = useState<ResumeData>(() =>
    createBlankResumeData()
  );
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const hydratedRef = useRef(false);
  const firstRenderAfterHydrateRef = useRef(true);

  useEffect(() => {
    const stored = loadResumeData();
    if (stored) setResume(stored);
    hydratedRef.current = true;
    firstRenderAfterHydrateRef.current = true;
    setSaveState(stored ? "saved" : "idle");
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    if (firstRenderAfterHydrateRef.current) {
      firstRenderAfterHydrateRef.current = false;
      return;
    }

    setSaveState("saving");
    const id = window.setTimeout(() => {
      saveResumeData(resume);
      setSaveState("saved");
    }, 450);

    return () => window.clearTimeout(id);
  }, [resume]);

  const strength = useMemo(() => computeStrength(resume), [resume]);

  const savedPillClass =
    saveState === "saving"
      ? `${styles.pill} ${styles.pillSaving}`
      : styles.pill;

  const savedPillText =
    saveState === "saving"
      ? "Saving…"
      : saveState === "saved"
      ? "Saved"
      : "Not saved";

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
        i === index ? ({ ...e, [key]: value } as any) : e
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

  function onReset() {
    const ok = window.confirm("Clear your saved resume and start over?");
    if (!ok) return;
    clearResumeData();
    setResume(createBlankResumeData());
    setSaveState("idle");
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.topCard}>
          <div className={styles.topRow}>
            <div className={styles.titleWrap}>
              <h1>Your Resume Details</h1>
              <div className={styles.subtitle}>
                Resume Strength: {strength}% Complete
              </div>
            </div>
            <div className={styles.cardActions}>
              <Link
                className={`${styles.btn} ${styles.btnPrimary}`}
                href="/print"
              >
                Open Print View
              </Link>
              <button
                className={styles.btn}
                type="button"
                onClick={() => saveResumeData(resume)}
              >
                Save now
              </button>
              <button
                className={`${styles.btn} ${styles.btnDanger}`}
                type="button"
                onClick={onReset}
              >
                Reset
              </button>
              <span className={savedPillClass}>{savedPillText}</span>
            </div>
          </div>
          <div className={styles.progressRow}>
            <div
              className={styles.progressTrack}
              aria-label="Resume completion"
            >
              <div
                className={styles.progressFill}
                style={{ width: `${strength}%` }}
              />
            </div>
            <div className={styles.progressLabel}>{strength}%</div>
          </div>
        </div>

        <div className={styles.leftCol}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Header & Contact</h2>
            </div>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <div className={styles.label}>Full Name</div>
                <input
                  className={styles.input}
                  value={resume.header.name}
                  onChange={(e) => setHeaderField("name", e.target.value)}
                  placeholder="Full Name"
                />
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Job Title</div>
                <input
                  className={styles.input}
                  value={resume.header.title}
                  onChange={(e) => setHeaderField("title", e.target.value)}
                  placeholder="Job Title"
                />
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Website/Portfolio URL</div>
                <input
                  className={styles.input}
                  value={resume.header.url}
                  onChange={(e) => setHeaderField("url", e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Linkedin Profile</div>
                <input
                  className={styles.input}
                  value={resume.contactInfo.likedinUrl}
                  onChange={(e) =>
                    setContactField("likedinUrl", e.target.value)
                  }
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Email</div>
                <input
                  className={styles.input}
                  value={resume.contactInfo.email}
                  onChange={(e) => setContactField("email", e.target.value)}
                  placeholder="name@email.com"
                />
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Phone Number</div>
                <input
                  className={styles.input}
                  value={resume.contactInfo.phoneNumber}
                  onChange={(e) =>
                    setContactField("phoneNumber", e.target.value)
                  }
                  placeholder="+1 555 123 4567"
                />
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Experience</h2>
              <div className={styles.cardActions}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  type="button"
                  onClick={addExperience}
                >
                  + Add Experience
                </button>
              </div>
            </div>
            {resume.experience.length === 0 && (
              <div className={styles.muted}>
                Add your work history and responsibilities.
              </div>
            )}
            {resume.experience.map((exp, index) => (
              <div key={index} className={styles.itemBlock}>
                <div className={styles.itemBlockHeader}>
                  <div className={styles.itemTitle}>
                    Experience #{index + 1}
                  </div>
                  <button
                    className={`${styles.btn} ${styles.btnDanger}`}
                    type="button"
                    onClick={() => removeExperience(index)}
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <div className={styles.label}>Company</div>
                    <input
                      className={styles.input}
                      value={exp.company}
                      onChange={(e) =>
                        updateExperienceField(index, "company", e.target.value)
                      }
                      placeholder="Company"
                    />
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>Period</div>
                    <input
                      className={styles.input}
                      value={exp.period}
                      onChange={(e) =>
                        updateExperienceField(index, "period", e.target.value)
                      }
                      placeholder="Jan 2023 - Present"
                    />
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>Position</div>
                    <input
                      className={styles.input}
                      value={exp.position}
                      onChange={(e) =>
                        updateExperienceField(index, "position", e.target.value)
                      }
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>

                <div
                  className={styles.itemBlockHeader}
                  style={{ marginTop: "0.75rem" }}
                >
                  <div className={styles.itemTitle}>Responsibilities</div>
                  <div className={styles.cardActions}>
                    <button
                      className={styles.btn}
                      type="button"
                      onClick={() => addResponsibility(index)}
                    >
                      + Add Responsibility
                    </button>
                  </div>
                </div>

                {exp.responsibilities.map((resp, ri) => (
                  <div
                    key={ri}
                    className={styles.smallRow}
                    style={{ marginTop: "0.5rem" }}
                  >
                    <input
                      className={styles.input}
                      value={resp}
                      onChange={(e) =>
                        updateResponsibility(index, ri, e.target.value)
                      }
                      placeholder="Responsibility"
                    />
                    <button
                      className={`${styles.btn} ${styles.btnDanger}`}
                      type="button"
                      onClick={() => removeResponsibility(index, ri)}
                      aria-label="Remove responsibility"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Knowledge & Tools</h2>
            </div>

            <div className={styles.itemBlock}>
              <div className={styles.itemBlockHeader}>
                <div className={styles.itemTitle}>Primary</div>
                <button
                  className={styles.btn}
                  type="button"
                  onClick={() => addSkill("primary")}
                >
                  + Add
                </button>
              </div>
              {resume.knowledgeAndTools.primary.map((skill, index) => (
                <div
                  key={index}
                  className={styles.grid3}
                  style={{ marginTop: "0.5rem" }}
                >
                  <div className={styles.field}>
                    <div className={styles.label}>Name</div>
                    <input
                      className={styles.input}
                      value={skill.name}
                      onChange={(e) =>
                        updateSkill("primary", index, "name", e.target.value)
                      }
                      placeholder="React"
                    />
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>Level</div>
                    <div className={styles.smallRow}>
                      <input
                        className={styles.range}
                        type="range"
                        min={0}
                        max={10}
                        value={skill.level}
                        onChange={(e) =>
                          updateSkill(
                            "primary",
                            index,
                            "level",
                            Number(e.target.value)
                          )
                        }
                      />
                      <span
                        className={styles.muted}
                        style={{ width: 28, textAlign: "right" }}
                      >
                        {skill.level}
                      </span>
                    </div>
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>&nbsp;</div>
                    <button
                      className={`${styles.btn} ${styles.btnDanger}`}
                      type="button"
                      onClick={() => removeSkill("primary", index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.itemBlock}>
              <div className={styles.itemBlockHeader}>
                <div className={styles.itemTitle}>Secondary</div>
                <button
                  className={styles.btn}
                  type="button"
                  onClick={() => addSkill("secondary")}
                >
                  + Add
                </button>
              </div>
              {resume.knowledgeAndTools.secondary.map((skill, index) => (
                <div
                  key={index}
                  className={styles.grid3}
                  style={{ marginTop: "0.5rem" }}
                >
                  <div className={styles.field}>
                    <div className={styles.label}>Name</div>
                    <input
                      className={styles.input}
                      value={skill.name}
                      onChange={(e) =>
                        updateSkill("secondary", index, "name", e.target.value)
                      }
                      placeholder="SQL"
                    />
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>Level</div>
                    <div className={styles.smallRow}>
                      <input
                        className={styles.range}
                        type="range"
                        min={0}
                        max={10}
                        value={skill.level}
                        onChange={(e) =>
                          updateSkill(
                            "secondary",
                            index,
                            "level",
                            Number(e.target.value)
                          )
                        }
                      />
                      <span
                        className={styles.muted}
                        style={{ width: 28, textAlign: "right" }}
                      >
                        {skill.level}
                      </span>
                    </div>
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>&nbsp;</div>
                    <button
                      className={`${styles.btn} ${styles.btnDanger}`}
                      type="button"
                      onClick={() => removeSkill("secondary", index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.itemBlock}>
              <div className={styles.itemBlockHeader}>
                <div className={styles.itemTitle}>Other Skills</div>
                <button
                  className={styles.btn}
                  type="button"
                  onClick={() => addSkill("otherSkills")}
                >
                  + Add
                </button>
              </div>
              {resume.otherSkills.map((skill, index) => (
                <div
                  key={index}
                  className={styles.grid3}
                  style={{ marginTop: "0.5rem" }}
                >
                  <div className={styles.field}>
                    <div className={styles.label}>Name</div>
                    <input
                      className={styles.input}
                      value={skill.name}
                      onChange={(e) =>
                        updateSkill(
                          "otherSkills",
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Docker"
                    />
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>Level</div>
                    <div className={styles.smallRow}>
                      <input
                        className={styles.range}
                        type="range"
                        min={0}
                        max={10}
                        value={skill.level}
                        onChange={(e) =>
                          updateSkill(
                            "otherSkills",
                            index,
                            "level",
                            Number(e.target.value)
                          )
                        }
                      />
                      <span
                        className={styles.muted}
                        style={{ width: 28, textAlign: "right" }}
                      >
                        {skill.level}
                      </span>
                    </div>
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>&nbsp;</div>
                    <button
                      className={`${styles.btn} ${styles.btnDanger}`}
                      type="button"
                      onClick={() => removeSkill("otherSkills", index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Courses & Certifications</h2>
              <div className={styles.cardActions}>
                <button
                  className={styles.btn}
                  type="button"
                  onClick={addCourse}
                >
                  + Add Course
                </button>
              </div>
            </div>
            {resume.courses.map((course, index) => (
              <div key={index} className={styles.itemBlock}>
                <div className={styles.itemBlockHeader}>
                  <div className={styles.itemTitle}>Course #{index + 1}</div>
                  <button
                    className={`${styles.btn} ${styles.btnDanger}`}
                    type="button"
                    onClick={() => removeCourse(index)}
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <div className={styles.label}>Institution</div>
                    <input
                      className={styles.input}
                      value={course.institution}
                      onChange={(e) =>
                        updateCourse(index, "institution", e.target.value)
                      }
                      placeholder="Institution"
                    />
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>Year</div>
                    <input
                      className={styles.input}
                      value={course.year}
                      onChange={(e) =>
                        updateCourse(index, "year", e.target.value)
                      }
                      placeholder="2024"
                    />
                  </div>
                  <div
                    className={styles.field}
                    style={{ gridColumn: "1 / -1" }}
                  >
                    <div className={styles.label}>Course</div>
                    <input
                      className={styles.input}
                      value={course.course}
                      onChange={(e) =>
                        updateCourse(index, "course", e.target.value)
                      }
                      placeholder="Course name"
                    />
                  </div>
                </div>
              </div>
            ))}
            {resume.courses.length === 0 && (
              <div className={styles.muted}>
                Add certifications or courses you’ve completed.
              </div>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Education</h2>
              <div className={styles.cardActions}>
                <button
                  className={styles.btn}
                  type="button"
                  onClick={addEducation}
                >
                  + Add Education
                </button>
              </div>
            </div>
            {resume.education.map((edu, index) => (
              <div key={index} className={styles.itemBlock}>
                <div className={styles.itemBlockHeader}>
                  <div className={styles.itemTitle}>Education #{index + 1}</div>
                  <button
                    className={`${styles.btn} ${styles.btnDanger}`}
                    type="button"
                    onClick={() => removeEducation(index)}
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <div className={styles.label}>Institution</div>
                    <input
                      className={styles.input}
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(index, "institution", e.target.value)
                      }
                      placeholder="Institution"
                    />
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>Period</div>
                    <input
                      className={styles.input}
                      value={edu.period}
                      onChange={(e) =>
                        updateEducation(index, "period", e.target.value)
                      }
                      placeholder="2019 - 2023"
                    />
                  </div>
                  <div
                    className={styles.field}
                    style={{ gridColumn: "1 / -1" }}
                  >
                    <div className={styles.label}>Degree</div>
                    <input
                      className={styles.input}
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(index, "degree", e.target.value)
                      }
                      placeholder="BSc Computer Science"
                    />
                  </div>
                </div>
              </div>
            ))}
            {resume.education.length === 0 && (
              <div className={styles.muted}>Add your education history.</div>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Languages</h2>
              <div className={styles.cardActions}>
                <button
                  className={styles.btn}
                  type="button"
                  onClick={addLanguage}
                >
                  + Add Language
                </button>
              </div>
            </div>
            {resume.languages.map((lang, index) => (
              <div key={index} className={styles.itemBlock}>
                <div className={styles.itemBlockHeader}>
                  <div className={styles.itemTitle}>Language #{index + 1}</div>
                  <button
                    className={`${styles.btn} ${styles.btnDanger}`}
                    type="button"
                    onClick={() => removeLanguage(index)}
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <div className={styles.label}>Language</div>
                    <input
                      className={styles.input}
                      value={lang.language}
                      onChange={(e) =>
                        updateLanguage(index, "language", e.target.value)
                      }
                      placeholder="English"
                    />
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>Level (0-10)</div>
                    <div className={styles.smallRow}>
                      <input
                        className={styles.range}
                        type="range"
                        min={0}
                        max={10}
                        value={Number(lang.level) || 0}
                        onChange={(e) =>
                          updateLanguage(index, "level", Number(e.target.value))
                        }
                      />
                      <span
                        className={styles.muted}
                        style={{ width: 28, textAlign: "right" }}
                      >
                        {Number(lang.level) || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {resume.languages.length === 0 && (
              <div className={styles.muted}>Add the languages you speak.</div>
            )}
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <h2>Preview</h2>
              <Link className={styles.btn} href="/print">
                Print
              </Link>
            </div>
            <div className={styles.previewCanvas}>
              <div className={styles.previewScale}>
                <Container isPreview={true}>
                  <Heading
                    userInfo={resume.header}
                    contactInfo={resume.contactInfo}
                    isPreview={true}
                  />
                  <section
                    className={pageStyles.contentHolder}
                    style={{ padding: "2rem 0 0" }}
                  >
                    <div className={pageStyles.section}>
                      <Experience experience={resume.experience} />
                    </div>
                    <div className={pageStyles.section}>
                      <KnowledgeAndTools
                        languages={resume.languages}
                        knowledgeAndTools={resume.knowledgeAndTools}
                        courses={resume.courses}
                        education={resume.education}
                      />
                    </div>
                  </section>
                </Container>
              </div>
            </div>
            <div
              className={styles.muted}
              style={{ marginTop: "0.65rem", fontSize: "0.85rem" }}
            >
              Tip: use <b>Print</b> to export to PDF.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
