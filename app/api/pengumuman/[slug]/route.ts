import { NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

const normalizedBackendUrl = backendUrl.replace(/\/$/, "");

function buildImageUrl(path?: string | null) {
  if (!path) return null;
  return `${normalizedBackendUrl}/storage/${path}`;
}

async function toNextResponse(backendResponse: Response, transformJson?: (payload: any) => any) {
  const contentType = backendResponse.headers.get("content-type") ?? "";
  const rawBody = await backendResponse.text();
  const status = backendResponse.status;

  if (!rawBody) {
    return new NextResponse(null, { status });
  }

  if (contentType.includes("application/json")) {
    try {
      const payload = JSON.parse(rawBody);
      const transformed = transformJson ? transformJson(payload) : payload;
      return NextResponse.json(transformed, { status });
    } catch (error) {
      // Fall through and return raw body as text
    }
  }

  const headers = contentType ? { "content-type": contentType } : undefined;
  return new NextResponse(rawBody, { status, headers });
}

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    const backendResponse = await fetch(`${normalizedBackendUrl}/api/pengumuman/${slug}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    return await toNextResponse(backendResponse, (payload) => {
      if (backendResponse.ok && payload && typeof payload === "object" && !Array.isArray(payload)) {
        return {
          ...payload,
          gambar_url: payload.gambar_url ?? buildImageUrl(payload.gambar),
        };
      }
      return payload;
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to fetch data", details: message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    const formData = await req.formData();

    const backendResponse = await fetch(`${normalizedBackendUrl}/api/pengumuman/${slug}`, {
      method: "POST",
      body: formData,
    });

    return await toNextResponse(backendResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to forward request", details: message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    const formData = await req.formData();

    const backendResponse = await fetch(`${normalizedBackendUrl}/api/pengumuman/${slug}`, {
      method: "PUT",
      body: formData,
    });

    return await toNextResponse(backendResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to forward request", details: message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    const backendResponse = await fetch(`${normalizedBackendUrl}/api/pengumuman/${slug}`, {
      method: "DELETE",
    });

    return await toNextResponse(backendResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to forward request", details: message }, { status: 500 });
  }
}
