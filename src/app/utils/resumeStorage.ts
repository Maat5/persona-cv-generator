import type { ResumeData } from "../types";

export const RESUME_STORAGE_KEY = "resumeData:v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isSkillLevel(value: unknown): value is { name: string; level: number } {
  if (!isRecord(value)) return false;
  return isString(value.name) && isNumber(value.level);
}

function isLanguage(value: unknown): value is { language: string; level: number | string } {
  if (!isRecord(value)) return false;
  const level = value.level;
  return isString(value.language) && (isNumber(level) || isString(level));
}

function isEducation(value: unknown): value is { institution: string; period: string; degree: string } {
  if (!isRecord(value)) return false;
  return isString(value.institution) && isString(value.period) && isString(value.degree);
}

function isCourse(value: unknown): value is { institution: string; year: string; course: string } {
  if (!isRecord(value)) return false;
  return isString(value.institution) && isString(value.year) && isString(value.course);
}

function isExperience(
  value: unknown
): value is { company: string; period: string; position: string; responsibilities: string[] } {
  if (!isRecord(value)) return false;
  return (
    isString(value.company) &&
    isString(value.period) &&
    isString(value.position) &&
    isStringArray(value.responsibilities)
  );
}

function isResumeData(value: unknown): value is ResumeData {
  if (!isRecord(value)) return false;

  const header = value.header;
  const contactInfo = value.contactInfo;
  const knowledgeAndTools = value.knowledgeAndTools;

  if (!isRecord(header) || !isString(header.name) || !isString(header.title) || !isString(header.url)) {
    return false;
  }

  if (
    !isRecord(contactInfo) ||
    !isString(contactInfo.email) ||
    !isString(contactInfo.likedinUrl) ||
    !isString(contactInfo.phoneNumber)
  ) {
    return false;
  }

  if (
    !Array.isArray(value.education) ||
    !value.education.every(isEducation) ||
    !Array.isArray(value.experience) ||
    !value.experience.every(isExperience) ||
    !Array.isArray(value.courses) ||
    !value.courses.every(isCourse) ||
    !Array.isArray(value.languages) ||
    !value.languages.every(isLanguage) ||
    !Array.isArray(value.otherSkills) ||
    !value.otherSkills.every(isSkillLevel)
  ) {
    return false;
  }

  if (!isRecord(knowledgeAndTools)) return false;
  if (!Array.isArray(knowledgeAndTools.primary) || !knowledgeAndTools.primary.every(isSkillLevel)) return false;
  if (!Array.isArray(knowledgeAndTools.secondary) || !knowledgeAndTools.secondary.every(isSkillLevel)) return false;

  return true;
}

export function loadResumeData(): ResumeData | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(RESUME_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    return isResumeData(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveResumeData(data: ResumeData): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore quota/serialization errors
  }
}

export function clearResumeData(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(RESUME_STORAGE_KEY);
  } catch {
    // ignore
  }
}


