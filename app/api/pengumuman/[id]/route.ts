import { NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
const normalizedBackendUrl = backendUrl.replace(/\/$/, "");

async function toNextResponse(response: Response) {
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
      // fallback to text
    }
  }

  return new NextResponse(rawBody, {
    status,
    headers: contentType ? { "content-type": contentType } : undefined,
  });
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${normalizedBackendUrl}/api/pengumuman/${params.id}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    return await toNextResponse(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch data", details: message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const response = await fetch(`${normalizedBackendUrl}/api/pengumuman/${params.id}`, {
      method: "POST",
      body: formData,
    });

    return await toNextResponse(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to forward request", details: message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const response = await fetch(`${normalizedBackendUrl}/api/pengumuman/${params.id}`, {
      method: "PUT",
      body: formData,
    });

    return await toNextResponse(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to forward request", details: message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${normalizedBackendUrl}/api/pengumuman/${params.id}`, {
      method: "DELETE",
    });

    return await toNextResponse(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to forward request", details: message },
      { status: 500 }
    );
  }
}
