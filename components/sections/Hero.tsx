"use client";

import styles from './Hero.module.css';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Transform Images into
          <span className={styles.gradient}> Listings</span>
        </h1>
        <p className={styles.subtitle}>
          Instantly create professional product listings using AI
        </p>
        <button onClick={onGetStarted} className={styles.cta}>
          Get Started
          <ArrowRight className={styles.icon} size={20} />
        </button>
      </div>
      <div className={styles.background}>
        <div className={styles.gradient1} />
        <div className={styles.gradient2} />
      </div>
    </section>
  );
}