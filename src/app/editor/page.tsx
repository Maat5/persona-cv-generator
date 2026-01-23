/* 
 * CV Generator - Editor Page
 */

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

  // Helper to get range slider gradient style for visual progress
  function getRangeStyle(value: number, max: number = 10) {
    const percent = (value / max) * 100;
    return {
      background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${percent}%, var(--border-default) ${percent}%, var(--border-default) 100%)`,
    };
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
      {/* Top Navigation Bar */}
      <nav className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.topBarLeft}>
            <Link href="/" className={styles.backLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Home
            </Link>
            <span className={styles.topBarTitle}>Resume Editor</span>
          </div>
          <div className={styles.topBarRight}>
            <span className={savedPillClass}>
              {saveState === "saving" ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{animation: 'spin 1s linear infinite'}}>
                  <circle cx="12" cy="12" r="10" opacity="0.25"/>
                  <path d="M12 2a10 10 0 0 1 10 10"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
              {savedPillText}
            </span>
            <button
              className={styles.btn}
              type="button"
              onClick={() => saveResumeData(resume)}
            >
              Save
            </button>
            <button
              className={`${styles.btn} ${styles.btnDanger}`}
              type="button"
              onClick={onReset}
            >
              Reset
            </button>
            <Link
              className={`${styles.btn} ${styles.btnPrimary}`}
              href="/print"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
              Print View
            </Link>
          </div>
        </div>
      </nav>

      {/* Progress Card */}
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

      {/* Main Content */}
      <div className={styles.shell}>
        {/* Left Column - Form */}
        <div className={styles.leftCol}>
          {/* Header & Contact */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Personal Information</h2>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label className={styles.label}>Full Name</label>
                  <input
                    className={styles.input}
                    value={resume.header.name}
                    onChange={(e) => setHeaderField("name", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Job Title</label>
                  <input
                    className={styles.input}
                    value={resume.header.title}
                    onChange={(e) => setHeaderField("title", e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email</label>
                  <input
                    className={styles.input}
                    type="email"
                    value={resume.contactInfo.email}
                    onChange={(e) => setContactField("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Phone Number</label>
                  <input
                    className={styles.input}
                    value={resume.contactInfo.phoneNumber}
                    onChange={(e) =>
                      setContactField("phoneNumber", e.target.value)
                    }
                    placeholder="+1 555 123 4567"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>LinkedIn Profile</label>
                  <input
                    className={styles.input}
                    value={resume.contactInfo.likedinUrl}
                    onChange={(e) =>
                      setContactField("likedinUrl", e.target.value)
                    }
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Website / Portfolio</label>
                  <input
                    className={styles.input}
                    value={resume.header.url}
                    onChange={(e) => setHeaderField("url", e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Experience</h2>
              <div className={styles.cardActions}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  type="button"
                  onClick={addExperience}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add
                </button>
              </div>
            </div>
            <div className={styles.cardBody}>
              {resume.experience.length === 0 && (
                <p className={styles.muted}>
                  Add your work history and responsibilities.
                </p>
              )}
              {resume.experience.map((exp, index) => (
                <div key={index} className={styles.itemBlock}>
                  <div className={styles.itemBlockHeader}>
                    <span className={styles.itemTitle}>
                      {exp.company || exp.position || `Experience #${index + 1}`}
                    </span>
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
                      <label className={styles.label}>Company</label>
                      <input
                        className={styles.input}
                        value={exp.company}
                        onChange={(e) =>
                          updateExperienceField(index, "company", e.target.value)
                        }
                        placeholder="Company Name"
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Period</label>
                      <input
                        className={styles.input}
                        value={exp.period}
                        onChange={(e) =>
                          updateExperienceField(index, "period", e.target.value)
                        }
                        placeholder="Jan 2023 - Present"
                      />
                    </div>
                    <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
                      <label className={styles.label}>Position</label>
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
                    style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
                  >
                    <span className={styles.muted}>Responsibilities</span>
                    <button
                      className={styles.btn}
                      type="button"
                      onClick={() => addResponsibility(index)}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      Add
                    </button>
                  </div>

                  {exp.responsibilities.map((resp, ri) => (
                    <div key={ri} className={styles.smallRow}>
                      <input
                        className={styles.input}
                        value={resp}
                        onChange={(e) =>
                          updateResponsibility(index, ri, e.target.value)
                        }
                        placeholder="Describe your responsibility..."
                      />
                      <button
                        className={`${styles.btn} ${styles.btnDanger}`}
                        type="button"
                        onClick={() => removeResponsibility(index, ri)}
                        aria-label="Remove responsibility"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
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
                    onClick={() => addSkill("primary")}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add
                  </button>
                </div>
                {resume.knowledgeAndTools.primary.map((skill, index) => (
                  <div key={index} className={styles.grid3} style={{ marginTop: "0.5rem" }}>
                    <div className={styles.field}>
                      <input
                        className={styles.input}
                        value={skill.name}
                        onChange={(e) =>
                          updateSkill("primary", index, "name", e.target.value)
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
                            updateSkill("primary", index, "level", Number(e.target.value))
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
                      onClick={() => removeSkill("primary", index)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
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
                    onClick={() => addSkill("secondary")}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add
                  </button>
                </div>
                {resume.knowledgeAndTools.secondary.map((skill, index) => (
                  <div key={index} className={styles.grid3} style={{ marginTop: "0.5rem" }}>
                    <div className={styles.field}>
                      <input
                        className={styles.input}
                        value={skill.name}
                        onChange={(e) =>
                          updateSkill("secondary", index, "name", e.target.value)
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
                            updateSkill("secondary", index, "level", Number(e.target.value))
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
                      onClick={() => removeSkill("secondary", index)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
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
                    onClick={() => addSkill("otherSkills")}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add
                  </button>
                </div>
                {resume.otherSkills.map((skill, index) => (
                  <div key={index} className={styles.grid3} style={{ marginTop: "0.5rem" }}>
                    <div className={styles.field}>
                      <input
                        className={styles.input}
                        value={skill.name}
                        onChange={(e) =>
                          updateSkill("otherSkills", index, "name", e.target.value)
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
                            updateSkill("otherSkills", index, "level", Number(e.target.value))
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
                      onClick={() => removeSkill("otherSkills", index)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Education</h2>
              <div className={styles.cardActions}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  type="button"
                  onClick={addEducation}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add
                </button>
              </div>
            </div>
            <div className={styles.cardBody}>
              {resume.education.length === 0 && (
                <p className={styles.muted}>Add your education history.</p>
              )}
              {resume.education.map((edu, index) => (
                <div key={index} className={styles.itemBlock}>
                  <div className={styles.itemBlockHeader}>
                    <span className={styles.itemTitle}>
                      {edu.institution || `Education #${index + 1}`}
                    </span>
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
                      <label className={styles.label}>Institution</label>
                      <input
                        className={styles.input}
                        value={edu.institution}
                        onChange={(e) =>
                          updateEducation(index, "institution", e.target.value)
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
                          updateEducation(index, "period", e.target.value)
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
                          updateEducation(index, "degree", e.target.value)
                        }
                        placeholder="BSc Computer Science"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Courses & Certifications</h2>
              <div className={styles.cardActions}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  type="button"
                  onClick={addCourse}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add
                </button>
              </div>
            </div>
            <div className={styles.cardBody}>
              {resume.courses.length === 0 && (
                <p className={styles.muted}>
                  Add certifications or courses you&apos;ve completed.
                </p>
              )}
              {resume.courses.map((course, index) => (
                <div key={index} className={styles.itemBlock}>
                  <div className={styles.itemBlockHeader}>
                    <span className={styles.itemTitle}>
                      {course.course || `Course #${index + 1}`}
                    </span>
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
                      <label className={styles.label}>Institution</label>
                      <input
                        className={styles.input}
                        value={course.institution}
                        onChange={(e) =>
                          updateCourse(index, "institution", e.target.value)
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
                          updateCourse(index, "year", e.target.value)
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
                          updateCourse(index, "course", e.target.value)
                        }
                        placeholder="Course name"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Languages</h2>
              <div className={styles.cardActions}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  type="button"
                  onClick={addLanguage}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add
                </button>
              </div>
            </div>
            <div className={styles.cardBody}>
              {resume.languages.length === 0 && (
                <p className={styles.muted}>Add the languages you speak.</p>
              )}
              {resume.languages.map((lang, index) => (
                <div key={index} className={styles.itemBlock}>
                  <div className={styles.itemBlockHeader}>
                    <span className={styles.itemTitle}>
                      {lang.language || `Language #${index + 1}`}
                    </span>
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
                      <label className={styles.label}>Language</label>
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
                      <label className={styles.label}>Level (0-10)</label>
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
        </div>

        {/* Right Column - Preview */}
        <div className={styles.rightCol}>
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <h2>Live Preview</h2>
              <Link className={styles.btn} href="/print">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Full View
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
          </div>
        </div>
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
