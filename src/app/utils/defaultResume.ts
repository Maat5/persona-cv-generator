import type { ResumeData } from "../types";

export function createBlankResumeData(): ResumeData {
  return {
    header: {
      name: "",
      title: "",
      url: "",
    },
    contactInfo: {
      email: "",
      likedinUrl: "",
      phoneNumber: "",
    },
    education: [],
    experience: [],
    knowledgeAndTools: {
      primary: [],
      secondary: [],
    },
    courses: [],
    languages: [],
    otherSkills: [],
  };
}


