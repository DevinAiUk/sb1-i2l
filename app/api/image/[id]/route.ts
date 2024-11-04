import { NextRequest, NextResponse } from 'next/server';

// Access the image store from the analyze-image route
declare const imageStore: Map<string, { data: string; type: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const image = imageStore.get(id);

  if (!image) {
    return NextResponse.json(
      { error: 'Image not found' },
      { status: 404 }
    );
  }

  // Convert base64 back to buffer
  const buffer = Buffer.from(image.data, 'base64');

  // Return image with proper content type
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': image.type,
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}