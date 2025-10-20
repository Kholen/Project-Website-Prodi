import { NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

async function forwardResponse(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";
  const rawBody = await response.text();
  const status = response.status;

  if (!rawBody) {
    return new NextResponse(null, { status });
  }

  if (contentType.includes("application/json")) {
    try {
      const payload = JSON.parse(rawBody);
      return NextResponse.json(payload, { status });
    } catch (error) {
      // fallback to text response
    }
  }

  return new NextResponse(rawBody, {
    status,
    headers: contentType ? { "content-type": contentType } : undefined,
  });
}

export async function GET() {
  try {
    const response = await fetch(`${backendUrl}/api/pengumuman`, { cache: "no-store" });
    return await forwardResponse(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch data", details: message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const response = await fetch(`${backendUrl}/api/pengumuman`, {
      method: "POST",
      body: formData,
    });

    return await forwardResponse(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to forward request", details: message },
      { status: 500 }
    );
  }
}
