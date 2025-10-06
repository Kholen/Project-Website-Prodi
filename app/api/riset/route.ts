import { NextResponse } from 'next/server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

export async function GET() {
  try {
    const response = await fetch(`${backendUrl}/api/riset`, { cache: 'no-store' });

    if (!response.ok) {
      let message = `Failed to fetch data from backend: ${response.status}`;

      try {
        const errorData = await response.json();
        message = `${message} - ${errorData?.detail ?? errorData?.details ?? response.statusText}`;
      } catch {
        // ignore non-JSON error body
      }

      throw new Error(message);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    return NextResponse.json(
      { error: 'Failed to fetch data', details: errorMessage },
      { status: 500 }
    );
  }
}
