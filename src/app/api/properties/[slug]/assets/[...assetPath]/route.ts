import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import { resolveCatalogAsset } from "@/lib/property-catalog";

export const runtime = "nodejs";

const contentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string; assetPath: string[] }> },
) {
  const { slug, assetPath } = await params;
  const filePath = resolveCatalogAsset(slug, assetPath.join("/"));
  if (!filePath) return new NextResponse("Not found", { status: 404 });

  const extension = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
  const body = await readFile(filePath);
  return new NextResponse(body, {
    headers: {
      "Content-Type": contentTypes[extension] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
