
import { NextResponse } from 'next/server';
// import pool from '@/lib/db'; // No longer needed

export async function GET() {
  try {
    // Fetch data from the Laravel backend
    const response = await fetch('http://localhost:8000/api/dosen'); // Assuming Laravel is running on port 8000
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch data from backend: ${response.status} - ${errorData.details || response.statusText}`);
    }
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch data', details: errorMessage }, { status: 500 });
  }
}
