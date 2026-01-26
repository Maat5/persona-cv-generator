/* 
 * CV Generator - Landing Page
 */

import Link from "next/link";
import Script from "next/script";
import styles from "./page.module.css";
import {
  LogoIcon,
  CoffeeIcon,
  ArrowRightIcon,
  CheckmarkIcon,
  EditIcon,
  ImageIcon,
  PrinterIcon,
  LockIcon,
  GlobeIcon,
  FileIcon,
  GithubIcon,
} from "@/components/icons";
import { StructuredData } from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>
              <LogoIcon />
            </span>
            <span className={styles.logoText}>Persona</span>
          </Link>
          <div className={styles.headerActions}>
            <a 
              href="https://buymeacoffee.com/manuel.abrante" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.btnGhost}
            >
              <CoffeeIcon />
              Buy me a coffee
            </a>
            <Link href="/editor" className={styles.btnPrimary}>
              Start Building
              <ArrowRightIcon />
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
                  <ArrowRightIcon size={18} />
                </Link>
              </div>
              <div className={styles.heroFeatures}>
                <div className={styles.heroFeature}>
                  <CheckmarkIcon />
                  Live Preview
                </div>
                <div className={styles.heroFeature}>
                  <CheckmarkIcon />
                  Print to PDF
                </div>
                <div className={styles.heroFeature}>
                  <CheckmarkIcon />
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
                  <EditIcon />
                </div>
                <div className={styles.stepNumber}>01</div>
                <h3 className={styles.stepTitle}>Fill in your details</h3>
                <p className={styles.stepDescription}>
                  Add your experience, education, skills, and contact information using our intuitive form editor.
                </p>
              </div>
              
              <div className={styles.stepCard}>
                <div className={styles.stepIcon}>
                  <ImageIcon />
                </div>
                <div className={styles.stepNumber}>02</div>
                <h3 className={styles.stepTitle}>Preview in real-time</h3>
                <p className={styles.stepDescription}>
                  Watch your resume come to life as you type. See exactly how it will look when printed.
                </p>
              </div>
              
              <div className={styles.stepCard}>
                <div className={styles.stepIcon}>
                  <PrinterIcon />
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
                  <LockIcon />
                </div>
                <h3 className={styles.trustTitle}>Your data stays private</h3>
                <p className={styles.trustDescription}>
                  Everything is stored locally in your browser. We never collect or store your personal information.
                </p>
              </div>
              
              <div className={styles.trustCard}>
                <div className={styles.trustIcon}>
                  <GlobeIcon />
                </div>
                <h3 className={styles.trustTitle}>Free</h3>
                <p className={styles.trustDescription}>
                  No hidden fees, no premium tiers. This tool is free to use, if you like it, you can buy me a coffee.
                </p>
              </div>
              
              <div className={styles.trustCard}>
                <div className={styles.trustIcon}>
                  <FileIcon />
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
                <ArrowRightIcon size={18} />
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
              <GithubIcon />
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
    
    {/* Buy Me a Coffee Widget Script */}
    <Script
      src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
      data-name="bmc-button"
      data-slug="manuel.abrante"
      data-color="#ffffff"
      data-emoji=""
      data-font="Cookie"
      data-text="Buy me a coffee"
      data-outline-color="#000000"
      data-font-color="#000000"
      data-coffee-color="#FFDD00"
      strategy="lazyOnload"
    />
    </>
  );
}
