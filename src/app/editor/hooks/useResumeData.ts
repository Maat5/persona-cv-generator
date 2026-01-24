/* 
 * Custom hook for managing resume data with auto-save
 */

import { useEffect, useRef, useState } from "react";
import type { ResumeData } from "../../types";
import { createBlankResumeData } from "../../utils/defaultResume";
import {
  clearResumeData,
  loadResumeData,
  saveResumeData,
} from "../../utils/resumeStorage";

type SaveState = "idle" | "saving" | "saved";

export function useResumeData() {
  const [resume, setResume] = useState<ResumeData>(() =>
    createBlankResumeData()
  );
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const hydratedRef = useRef(false);
  const firstRenderAfterHydrateRef = useRef(true);

  // Load saved data on mount
  useEffect(() => {
    const stored = loadResumeData();
    if (stored) setResume(stored);
    hydratedRef.current = true;
    firstRenderAfterHydrateRef.current = true;
    setSaveState(stored ? "saved" : "idle");
  }, []);

  // Auto-save on changes
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

  const reset = () => {
    const ok = window.confirm("Clear your saved resume and start over?");
    if (!ok) return;
    clearResumeData();
    setResume(createBlankResumeData());
    setSaveState("idle");
  };

  const save = () => {
    saveResumeData(resume);
    setSaveState("saved");
  };

  return {
    resume,
    setResume,
    saveState,
    reset,
    save,
  };
}
