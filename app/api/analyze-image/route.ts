import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI("AIzaSyCqPsvC8DkK1v36d6CV7AzmeuHWIPSLKBI");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function analyzeWithGemini(imageBase64: string, marketplace: string) {
  try {
    // Remove the data URL prefix to get just the base64 data
    const base64Data = imageBase64.split(',')[1];

    // Create a parts array with the image and prompt
    const prompt = `Analyze this product image for ${marketplace} marketplace listing and provide a detailed markdown response with the following sections:

# Product Analysis

## Title
[Generate an SEO-optimized product title]

## Description
[Provide a detailed product description]

## Key Features
- [List key product features]
- [Include specifications]
- [Highlight unique selling points]

## Category
[Suggest the most appropriate category hierarchy]

## Price Analysis
- Suggested Price Range: [Provide a price range]
- Market Positioning: [Explain pricing strategy]

## Keywords
- [List relevant search keywords]
- [Include long-tail keywords]

## Optimization Tips
- [Provide marketplace-specific optimization suggestions]
- [Include best practices for the chosen platform]

Please ensure all content is optimized for ${marketplace} and follows their best practices for product listings.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data
        }
      }
    ]);

    const response = await result.response;
    const analysis = response.text();

    return {
      analysis,
      marketplace,
      suggestedPrice: extractPriceFromAnalysis(analysis),
      category: extractCategoryFromAnalysis(analysis)
    };
  } catch (error) {
    console.error('Error analyzing with Gemini:', error);
    throw error;
  }
}

function extractPriceFromAnalysis(analysis: string): string {
  // Look for price range in the Price Analysis section
  const priceMatch = analysis.match(/Suggested Price Range:\s*([^\n]+)/i);
  return priceMatch ? priceMatch[1].trim() : '';
}

function extractCategoryFromAnalysis(analysis: string): string {
  // Look for category in the Category section
  const categoryMatch = analysis.match(/## Category\s*\n([^\n#]+)/i);
  return categoryMatch ? categoryMatch[1].trim() : '';
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const marketplace = formData.get('marketplace') as string;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    if (!marketplace) {
      return NextResponse.json(
        { error: 'Marketplace must be specified' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!image.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an image.' },
        { status: 400 }
      );
    }

    // Maximum file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (image.size > maxSize) {
      return NextResponse.json(
        { error: 'Image size exceeds 5MB limit.' },
        { status: 400 }
      );
    }

    // Convert image to base64
    const buffer = await image.arrayBuffer();
    const base64 = `data:${image.type};base64,${Buffer.from(buffer).toString('base64')}`;

    // Analyze with Gemini
    const analysisResult = await analyzeWithGemini(base64, marketplace);

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}