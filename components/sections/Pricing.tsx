import styles from './Pricing.module.css';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$9',
    period: 'per month',
    features: [
      '100 AI-generated listings',
      'Basic image analysis',
      'Single marketplace support',
      'Email support'
    ]
  },
  {
    name: 'Professional',
    price: '$29',
    period: 'per month',
    features: [
      'Unlimited listings',
      'Advanced image analysis',
      'Multi-marketplace support',
      'Priority support',
      'Custom branding',
      'Analytics dashboard'
    ],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    features: [
      'Everything in Professional',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom AI training'
    ]
  }
];

export default function Pricing() {
  return (
    <section className={styles.pricing}>
      <div className={styles.container}>
        <h2>Simple, Transparent Pricing</h2>
        <p className={styles.subtitle}>Choose the plan that's right for you</p>
        
        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${styles.plan} ${plan.recommended ? styles.recommended : ''}`}
            >
              {plan.recommended && (
                <div className={styles.badge}>Recommended</div>
              )}
              <h3>{plan.name}</h3>
              <div className={styles.price}>
                <span>{plan.price}</span>
                <span className={styles.period}>{plan.period}</span>
              </div>
              <ul className={styles.features}>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`${styles.button} ${plan.recommended ? styles.primaryButton : ''}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}