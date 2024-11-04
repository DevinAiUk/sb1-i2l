import styles from './Features.module.css';
import { Zap, Shield, Globe, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Zap size={24} />,
    title: 'Instant Analysis',
    description: 'AI-powered image processing for quick listing generation'
  },
  {
    icon: <Shield size={24} />,
    title: 'Multi-Platform Support',
    description: 'List on Amazon, eBay, Etsy, and more with one click'
  },
  {
    icon: <Globe size={24} />,
    title: 'Global Reach',
    description: 'Optimize listings for international marketplaces'
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Smart Suggestions',
    description: 'Get AI-powered pricing and category recommendations'
  }
];

export default function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2>Powerful Features</h2>
        <p className={styles.subtitle}>Everything you need to create professional listings</p>
        
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}