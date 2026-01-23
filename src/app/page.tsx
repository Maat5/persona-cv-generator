import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>PERSONA</div>
        {/* <nav className={styles.nav}>
          <Link href="#templates" className={styles.navLink}>Templates</Link>
          <Link href="#features" className={styles.navLink}>Features</Link>
          <Link href="#pricing" className={styles.navLink}>Pricing</Link>
        </nav> */}
        <div className={styles.headerButtons}>
          <Link href="/editor" className={styles.btnSecondary}>Buy me a coffee</Link>
          <Link href="/editor" className={styles.btnPrimary}>Get Started</Link>
        </div>
      </header>

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Build a resume that looks like you.</h1>
            <Link href="/editor" className={styles.heroCta}>Get Started</Link>
            <div className={styles.trustBadges}>
              <span className={styles.trustText}>
                This tool is free to use, the idea is to help people to build their resume in a few minutes without the need of a professional designer.
              </span>

              <span className={styles.trustText}>
                We don&apos;t collect any data from you, all the data is stored locally in your browser.
              </span>

              <span className={styles.trustText}>
                The tool is free to use and still under development, so any feedback is welcome.
              </span>
              {/* <div className={styles.companyLogos}>
                <span className={styles.companyLogo}>Google</span>
                <span className={styles.companyLogo}>Apple</span>
                <span className={styles.companyLogo}>Nike</span>
                <span className={styles.companyLogo}>Airbnb</span>
              </div> */}
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.resumePreview}>
              <div className={styles.resumeCard}>
                <div className={styles.resumeHeader}>
                  <div className={styles.resumeAvatar}></div>
                  <div className={styles.resumeHeaderText}>
                    <div className={styles.resumeName}></div>
                    <div className={styles.resumeTitle}></div>
                  </div>
                </div>
                <div className={styles.resumeContent}>
                  <div className={styles.resumeSection}></div>
                  <div className={styles.resumeSection}></div>
                  <div className={styles.resumeSection}></div>
                </div>
              </div>
            </div>
            <div className={styles.heroArrow}></div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className={styles.howItWorks}>
          <h2 className={styles.sectionTitle}>How it Works</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Your Resume Details</h3>
              <div className={styles.stepPreview}>
                <ul className={styles.featuresList}>
                  <li>Add your basic information & education</li>
                  <li>Add your work experience & skills</li>
                  <li>Add your languages & courses</li>
                </ul>
                </div>
                {/* <div className={styles.formPreview}>
                  <div className={styles.formField}>
                    Form field
                  </div>
                  <div className={styles.formField}></div>
                  <div className={styles.formField}></div>
                </div>
              </div> */}
            </div>
            {/* <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Choose a Template (Soon)</h3>
              <div className={styles.stepPreview}>
                <div className={styles.templatePreview}>
                  <div className={styles.templateOption}></div>
                  <div className={styles.templateOption}></div>
                  <div className={styles.templateOption}></div>
                </div>
              </div>
            </div> */}
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Customize with Ease</h3>
              <div className={styles.stepPreview}>
                <ul className={styles.featuresList}>
                  <li>Live Editor</li>
                  <li>Data stored locally in your browser</li>
                  <li>Print your resume to PDF</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to land your dream job?</h2>
          <Link href="/editor" className={styles.ctaButton}>Create My Resume</Link>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerLinks}>
            <Link href="https://github.com/Maat5" className={styles.footerLink}>About Me</Link>
            <Link href="#contact" className={styles.footerLink}>Contact</Link>
            {/* <Link href="#terms" className={styles.footerLink}>Terms</Link> */}
          </div>
          {/* <div className={styles.socialIcons}>
            <a href="#facebook" className={styles.socialIcon} aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#twitter" className={styles.socialIcon} aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#instagram" className={styles.socialIcon} aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div> */}
        </footer>
      </main>
    </>
  );
}
