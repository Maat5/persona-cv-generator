/* 
 * CV Generator - Landing Page
 */

import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="9" rx="1" fill="currentColor"/>
                <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.5"/>
                <rect x="12" y="3" width="9" height="5" rx="1" fill="currentColor" opacity="0.5"/>
                <rect x="12" y="10" width="9" height="11" rx="1" fill="currentColor"/>
              </svg>
            </span>
            <span className={styles.logoText}>Persona</span>
          </Link>
          <div className={styles.headerActions}>
            <a 
              href="https://buymeacoffee.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.btnGhost}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                <line x1="6" y1="1" x2="6" y2="4"/>
                <line x1="10" y1="1" x2="10" y2="4"/>
                <line x1="14" y1="1" x2="14" y2="4"/>
              </svg>
              Buy me a coffee
            </a>
            <Link href="/editor" className={styles.btnPrimary}>
              Start Building
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroBgGradient}></div>
            <div className={styles.heroBgPattern}></div>
          </div>
          
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <div className={styles.heroBadge}>
                <span className={styles.badgeDot}></span>
                100% Free & Private
              </div>
              <h1 className={styles.heroTitle}>
                Build a resume<br/>
                <span className={styles.heroTitleAccent}>that stands out</span>
              </h1>
              <p className={styles.heroDescription}>
                Create a professional CV in minutes with our live editor. 
                No sign-up required, all data stays in your browser.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/editor" className={styles.ctaPrimary}>
                  Create Your Resume
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </div>
              <div className={styles.heroFeatures}>
                <div className={styles.heroFeature}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Live Preview
                </div>
                <div className={styles.heroFeature}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Print to PDF
                </div>
                <div className={styles.heroFeature}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  No Account Needed
                </div>
              </div>
            </div>
            
            <div className={styles.heroVisual}>
              <div className={styles.mockupContainer}>
                <div className={styles.mockupWindow}>
                  <div className={styles.mockupHeader}>
                    <div className={styles.mockupDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className={styles.mockupContent}>
                    <div className={styles.mockupResume}>
                      <div className={styles.mockupResumeHeader}>
                        <div className={styles.mockupAvatar}></div>
                        <div className={styles.mockupInfo}>
                          <div className={styles.mockupName}></div>
                          <div className={styles.mockupTitle}></div>
                        </div>
                      </div>
                      <div className={styles.mockupSection}>
                        <div className={styles.mockupSectionTitle}></div>
                        <div className={styles.mockupLine}></div>
                        <div className={styles.mockupLine} style={{width: '85%'}}></div>
                        <div className={styles.mockupLine} style={{width: '70%'}}></div>
                      </div>
                      <div className={styles.mockupSection}>
                        <div className={styles.mockupSectionTitle}></div>
                        <div className={styles.mockupLine}></div>
                        <div className={styles.mockupLine} style={{width: '90%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.mockupGlow}></div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className={styles.features}>
          <div className={styles.featuresInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>How it works</span>
              <h2 className={styles.sectionTitle}>Three simple steps to your perfect CV</h2>
            </div>
            
            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </div>
                <div className={styles.stepNumber}>01</div>
                <h3 className={styles.stepTitle}>Fill in your details</h3>
                <p className={styles.stepDescription}>
                  Add your experience, education, skills, and contact information using our intuitive form editor.
                </p>
              </div>
              
              <div className={styles.stepCard}>
                <div className={styles.stepIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <div className={styles.stepNumber}>02</div>
                <h3 className={styles.stepTitle}>Preview in real-time</h3>
                <p className={styles.stepDescription}>
                  Watch your resume come to life as you type. See exactly how it will look when printed.
                </p>
              </div>
              
              <div className={styles.stepCard}>
                <div className={styles.stepIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                  </svg>
                </div>
                <div className={styles.stepNumber}>03</div>
                <h3 className={styles.stepTitle}>Print or save as PDF</h3>
                <p className={styles.stepDescription}>
                  Use your browser&apos;s print function to save as PDF or print directly. It&apos;s that simple.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className={styles.trust}>
          <div className={styles.trustInner}>
            {/* Section Header */}
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Why use Persona?</h2>
              <p className={styles.sectionDescription}>
                Persona is more than just a CV builder. It&apos;s a tool that helps you create a professional CV in minutes. It&apos;s easy to use and doesn&apos;t require any sign-up.
              </p>
            </div>
            
            <div className={styles.trustCards}>
              <div className={styles.trustCard}>
                <div className={styles.trustIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h3 className={styles.trustTitle}>Your data stays private</h3>
                <p className={styles.trustDescription}>
                  Everything is stored locally in your browser. We never collect or store your personal information.
                </p>
              </div>
              
              <div className={styles.trustCard}>
                <div className={styles.trustIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <h3 className={styles.trustTitle}>Free</h3>
                <p className={styles.trustDescription}>
                  No hidden fees, no premium tiers. This tool is free to use, if you like it, you can buy me a coffee.
                </p>
              </div>
              
              <div className={styles.trustCard}>
                <div className={styles.trustIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <h3 className={styles.trustTitle}>Open source</h3>
                <p className={styles.trustDescription}>
                  Built with transparency in mind. Check out the code and contribute on GitHub.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to create your resume?</h2>
              <p className={styles.ctaDescription}>
                Start building your professional CV now. It only takes a few minutes.
              </p>
              <Link href="/editor" className={styles.ctaButton}>
                Get Started — It&apos;s Free
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>
            <span className={styles.footerLogo}>Persona</span>
            <span className={styles.footerCopy}>© 2026 · Free CV Builder</span>
          </div>
          <div className={styles.footerLinks}>
            <a 
              href="https://github.com/Maat5" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            {/* <a 
              href="mailto:contact@example.com" 
              className={styles.footerLink}
            >
              Contact
            </a> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
