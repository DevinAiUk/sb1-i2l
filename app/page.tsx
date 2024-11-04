"use client";

import { useState } from 'react';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Pricing from '@/components/sections/Pricing';
import ListingForm from '@/components/sections/ListingForm';
import EmailPopup from '@/components/sections/EmailPopup';

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);

  const handleGetStarted = () => {
    setIsEmailPopupOpen(true);
  };

  const handleEmailPopupClose = () => {
    setIsEmailPopupOpen(false);
    setIsFormVisible(true);
    // Smooth scroll to form
    document.getElementById('listing-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <div id="listing-form">
        {isFormVisible && <ListingForm />}
      </div>
      <Pricing />
      <EmailPopup 
        isOpen={isEmailPopupOpen} 
        onClose={handleEmailPopupClose} 
      />
    </>
  );
}