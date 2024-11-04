"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Dropzone from '@/components/ui/Dropzone';
import styles from './ListingForm.module.css';
import { Loader } from 'lucide-react';

interface FormData {
  marketplace: string;
}

interface AnalysisResult {
  analysis: string;
  marketplace?: string;
  suggestedPrice?: string;
  category?: string;
}

const MARKETPLACES = [
  'Amazon',
  'eBay',
  'Etsy',
  'Shopify',
  'Walmart',
  'Facebook Marketplace',
  'Mercari',
  'Poshmark',
  'Alibaba'
];

export default function ListingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const handleFileAccepted = (file: File) => {
    setSelectedFile(file);
    setAnalysisResult(null);
  };

  const analyzeImage = async (file: File, marketplace: string): Promise<AnalysisResult> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('marketplace', marketplace);

    const response = await fetch('/api/analyze-image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to analyze image');
    }

    return response.json();
  };

  const onSubmit = async (data: FormData) => {
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    setIsLoading(true);
    try {
      const analysis = await analyzeImage(selectedFile, data.marketplace);
      
      // Simulate a delay to show AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAnalysisResult(analysis);
    } catch (error) {
      console.error('Error processing submission:', error);
      alert('Error processing submission. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatAnalysis = (text: string) => {
    return text.split('\n').map((line, index) => (
      <p key={index} className={styles.analysisLine}>
        {line}
      </p>
    ));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2>Create Your Listing</h2>
        
        <div className={styles.dropzoneContainer}>
          <Dropzone onFileAccepted={handleFileAccepted} />
          {selectedFile && (
            <p className={styles.selectedFile}>
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="marketplace">Marketplace</label>
            <select
              id="marketplace"
              {...register("marketplace", { required: "Please select a marketplace" })}
              className={styles.select}
            >
              <option value="">Select a marketplace</option>
              {MARKETPLACES.map((marketplace) => (
                <option key={marketplace} value={marketplace}>
                  {marketplace}
                </option>
              ))}
            </select>
            {errors.marketplace && (
              <span className={styles.error}>{errors.marketplace.message}</span>
            )}
          </div>
        </div>

        <button type="submit" className={styles.submit} disabled={isLoading || !selectedFile}>
          {isLoading ? (
            <>
              <Loader className={styles.spinner} size={20} />
              Analyzing...
            </>
          ) : (
            'Analyze & Submit'
          )}
        </button>

        {isLoading && (
          <div className={styles.analyzing}>
            <div className={styles.pulse} />
            <p>AI is analyzing your image...</p>
          </div>
        )}

        {analysisResult && (
          <div className={`${styles.aiResponse} ${styles.fadeIn}`}>
            <h3>AI Analysis Results</h3>
            <div className={styles.responseContent}>
              {analysisResult.marketplace && (
                <div className={styles.resultField}>
                  <strong>Marketplace:</strong> {analysisResult.marketplace}
                </div>
              )}
              {analysisResult.category && (
                <div className={styles.resultField}>
                  <strong>Category:</strong> {analysisResult.category}
                </div>
              )}
              {analysisResult.suggestedPrice && (
                <div className={styles.resultField}>
                  <strong>Suggested Price:</strong> {analysisResult.suggestedPrice}
                </div>
              )}
              <div className={styles.resultField}>
                <strong>Analysis:</strong>
                <div className={styles.analysisContent}>
                  {formatAnalysis(analysisResult.analysis)}
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}