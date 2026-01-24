/* 
 * Preview panel component showing live resume preview
 */

import Link from "next/link";
import type { ResumeData } from "../../types";
import styles from "../editor.module.css";
import pageStyles from "../../page.module.css";
import { Container } from "@/components/Container/Container";
import { Heading } from "@/components/Heading/Heading";
import { Experience } from "@/components/Experience/Experience";
import { KnowledgeAndTools } from "@/components/knowledgeAndTools/KnowledgeAndTools";
import { ExternalLinkIcon } from "../../../components/icons";

interface PreviewPanelProps {
  resume: ResumeData;
}

export function PreviewPanel({ resume }: PreviewPanelProps) {
  return (
    <div className={styles.rightCol}>
      <div className={styles.previewCard}>
        <div className={styles.previewHeader}>
          <h2>Live Preview</h2>
          <Link className={styles.btn} href="/print">
            <ExternalLinkIcon />
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
  );
}
