import { Mail, Github, Twitter } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.company}>
            <h3>AI Listing Pro</h3>
            <p>Transform your product images into professional marketplace listings with AI.</p>
          </div>

          <div className={styles.links}>
            <h4>Quick Links</h4>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>

          <div className={styles.social}>
            <h4>Connect</h4>
            <div className={styles.socialLinks}>
              <a href="mailto:contact@ailistingpro.com" aria-label="Email">
                <Mail size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} AI Listing Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}