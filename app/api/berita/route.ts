import { NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

async function forwardResponse(backendResponse: Response) {
  const contentType = backendResponse.headers.get("content-type") ?? "";
  const rawBody = await backendResponse.text();
  const status = backendResponse.status;

  if (!rawBody) {
    return new NextResponse(null, { status });
  }

  if (contentType.includes("application/json")) {
    try {
      const payload = JSON.parse(rawBody);
      return NextResponse.json(payload, { status });
    } catch (error) {
      // fall through to send raw response as text
    }
  }

  return new NextResponse(rawBody, {
    status,
    headers: contentType ? { "content-type": contentType } : undefined,
  });
}

export async function GET() {
  try {
    const backendResponse = await fetch(`${backendUrl}/api/berita`, { cache: "no-store" });
    return await forwardResponse(backendResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch data", details: message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const backendResponse = await fetch(`${backendUrl}/api/berita`, {
      method: "POST",
      body: formData,
    });

    return await forwardResponse(backendResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to forward request", details: message },
      { status: 500 }
    );
  }
}
