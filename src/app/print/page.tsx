/* 
 * CV Generator - Print Page
 */

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
        <nav className={styles.toolbar}>
          <div className={styles.toolbarInner}>
            <div className={styles.toolbarLeft}>
              <div className={styles.title}>Print Resume</div>
              <div className={styles.subtitle}>No saved data found</div>
            </div>
            <div className={styles.toolbarRight}>
              <Link className={styles.btn} href="/editor">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
                Go to Editor
              </Link>
            </div>
          </div>
        </nav>

        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <h2>No resume saved yet</h2>
          <p>
            Go to the editor, fill in your details, and come back here to print
            or save as PDF.
          </p>
          <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/editor">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Open Editor
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <nav className={styles.toolbar}>
        <div className={styles.toolbarInner}>
          <div className={styles.toolbarLeft}>
            <div className={styles.title}>Print Resume</div>
            <div className={styles.subtitle}>
              Tip: Choose &quot;Save as PDF&quot; in the print dialog
            </div>
          </div>
          <div className={styles.toolbarRight}>
            <Link className={styles.btn} href="/editor">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </Link>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              type="button"
              onClick={() => window.print()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
              Print / Save PDF
            </button>
          </div>
        </div>
      </nav>

      <div className={styles.previewContainer}>
        <div className={styles.previewPaper}>
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
      </div>
    </div>
  );
}
