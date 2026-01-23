"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { ResumeData } from "../types";
import { loadResumeData } from "../utils/resumeStorage";

import styles from "./print.module.css";

import { Container } from "@/components/Container/Container";
import { Heading } from "@/components/Heading/Heading";
import { Experience } from "@/components/Experience/Experience";
import { KnowledgeAndTools } from "@/components/knowledgeAndTools/KnowledgeAndTools";
import { Footer } from "@/components/Footer/Footer";

export default function PrintPage() {
  const [data, setData] = useState<ResumeData | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(loadResumeData());
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  if (!data) {
    return (
      <div className={styles.page}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <div className={styles.title}>Print Resume</div>
            <div className={styles.subtitle}>No saved data found</div>
          </div>
          <div className={styles.toolbarRight}>
            <Link className={styles.btn} href="/editor">
              Go to Editor
            </Link>
          </div>
        </div>

        <div className={styles.empty}>
          <h2>No resume saved yet</h2>
          <p>
            Go to the editor, fill in your details, and come back here to print
            or save as PDF.
          </p>
          <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/editor">
            Open Editor
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.title}>Print Resume</div>
          <div className={styles.subtitle}>
            Tip: choose “Save as PDF” in the print dialog
          </div>
        </div>
        <div className={styles.toolbarRight}>
          <Link className={styles.btn} href="/editor">
            Edit
          </Link>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            type="button"
            onClick={() => window.print()}
          >
            Print / Save PDF
          </button>
        </div>
      </div>

      <Container>
        <Heading userInfo={data.header} contactInfo={data.contactInfo} />
        <section className={styles.contentHolder}>
          <div className={styles.section}>
            <Experience experience={data.experience} />
          </div>
          <div className={styles.section}>
            <KnowledgeAndTools
              languages={data.languages}
              knowledgeAndTools={data.knowledgeAndTools}
              courses={data.courses}
              education={data.education}
            />
          </div>
        </section>
        <Footer />
      </Container>
    </div>
  );
}
