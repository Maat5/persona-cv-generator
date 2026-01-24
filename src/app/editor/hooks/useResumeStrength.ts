/* 
 * Custom hook for calculating resume strength/completeness
 */

import { useMemo } from "react";
import type { ResumeData } from "../../types";

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

export function useResumeStrength(resume: ResumeData) {
  return useMemo(() => computeStrength(resume), [resume]);
}
