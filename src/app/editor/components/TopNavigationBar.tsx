/* 
 * Top navigation bar for the editor page
 */

import Link from "next/link";
import styles from "../editor.module.css";
import { ArrowLeftIcon, CheckIcon, SpinnerIcon, PrintIcon } from "@/components/icons";

type SaveState = "idle" | "saving" | "saved";

interface TopNavigationBarProps {
  saveState: SaveState;
  onSave: () => void;
  onReset: () => void;
}

export function TopNavigationBar({ saveState, onSave, onReset }: TopNavigationBarProps) {
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

  return (
    <nav className={styles.topBar}>
      <div className={styles.topBarInner}>
        <div className={styles.topBarLeft}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeftIcon />
            Home
          </Link>
          <span className={styles.topBarTitle}>Resume Editor</span>
        </div>
        <div className={styles.topBarRight}>
          <span className={savedPillClass}>
            {saveState === "saving" ? <SpinnerIcon /> : <CheckIcon />}
            {savedPillText}
          </span>
          <button
            className={styles.btn}
            type="button"
            onClick={onSave}
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
            <PrintIcon />
            Print View
          </Link>
        </div>
      </div>
    </nav>
  );
}
