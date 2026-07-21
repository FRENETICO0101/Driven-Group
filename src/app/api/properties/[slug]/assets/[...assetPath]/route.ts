import { NextResponse } from "next/server";
import { getCatalogAssetUrl } from "@/lib/property-catalog";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string; assetPath: string[] }> },
) {
  const { slug, assetPath } = await params;
  const assetUrl = getCatalogAssetUrl(slug, assetPath.join("/"));
  if (!assetUrl) return new NextResponse("Not found", { status: 404 });
  return NextResponse.redirect(new URL(assetUrl, request.url), 308);
}
