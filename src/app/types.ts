/**
 * Interface for a skill or tool with a proficiency level.
 */
export interface SkillLevel {
  name: string;
  level: number;
}

/**
 * Interface for a language with its proficiency level.
 */
export interface Language {
  language: string;
  level: number | string;
}

/**
 * Interface for an educational entry.
 */
export interface Education {
  institution: string;
  period: string;
  degree: string;
}

/**
 * Interface for a work experience entry.
 */
export interface Experience {
  company: string;
  period: string;
  position: string;
  responsibilities: string[];
}

/**
 * Interface for a course or certification.
 */
export interface Course {
  institution: string;
  year: string;
  course: string;
}

/**
 * Interface for the contact information section.
 */
export interface ContactInfo {
  email: string;
  likedinUrl: string;
  phoneNumber: string;
}

/**
 * Interface for the header section of the resume.
 */
export interface Header {
  name: string;
  title: string;
  url: string;
}

/**
 * The main interface that represents the entire resume data object.
 * It combines all the other defined interfaces and arrays.
 */
export interface ResumeData {
  header: Header;
  contactInfo: ContactInfo;
  education: Education[];
  experience: Experience[];
  knowledgeAndTools: {
    primary: SkillLevel[];
    secondary: SkillLevel[];
  };
  courses: Course[];
  languages: Language[];
  otherSkills: SkillLevel[];
}
