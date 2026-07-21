import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import type { Property, PropertyImage, PropertyStatus } from "@/lib/types";

const catalogRoot = path.join(process.cwd(), "assets", "properties");
const assetExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);
const defaultAgent = {
  id: "driven-group",
  name: "Driven Group",
  email: "info@drivengroup.com",
  role: "AGENT" as const,
  createdAt: new Date(0),
  updatedAt: new Date(0),
};

const propertyJsonSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  state: z.string().optional(),
  address: z.string().optional(),
  coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
  propertyType: z.string().optional(),
  featured: z.boolean().optional(),
  year: z.number().optional(),
  completion: z.string().optional(),
  residences: z.union([z.number(), z.object({ bedroomsMin: z.number().optional(), bedroomsMax: z.number().optional() })]).optional(),
  bedrooms: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  heroImage: z.string().optional(),
  hero: z.object({ title: z.string().optional(), image: z.string().optional() }).optional(),
  seo: z.object({ title: z.string().optional(), description: z.string().optional() }).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export type CatalogProperty = Property & {
  resources: {
    floorplans: Array<{ name: string; previewUrl?: string; documentUrl: string }>;
    brochures: Array<{ name: string; url: string }>;
    galleryDocuments: Array<{ name: string; url: string }>;
  };
  seo: { title: string; description: string };
};

function assetUrl(slug: string, relativePath: string) {
  return `/api/properties/${encodeURIComponent(slug)}/assets/${relativePath.split(path.sep).map(encodeURIComponent).join("/")}`;
}

function listFiles(directory: string) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).filter((name) => statSync(path.join(directory, name)).isFile());
}

function plainText(markdown: string) {
  return markdown
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\*\*/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function readContent(directory: string, filename: string) {
  const filePath = path.join(directory, "content", filename);
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
}

function heroField(content: string, field: string) {
  return content.match(new RegExp(`^${field}:\\s*(.+)$`, "mi"))?.[1]?.trim();
}

function formatName(slug: string) {
  return slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function normalizeStatus(value?: string): PropertyStatus {
  const normalized = value?.toLowerCase().replace(/[\s-]/g, "_");
  if (normalized === "sold") return "SOLD";
  if (normalized === "pending") return "PENDING";
  if (normalized === "inactive") return "INACTIVE";
  return "ACTIVE";
}

function bedroomCount(value?: string[]) {
  return Math.max(0, ...(value ?? []).map((entry) => Number(entry.match(/\d+/)?.[0] ?? 0)));
}

function makeResources(slug: string, directory: string) {
  const floorplanFiles = listFiles(path.join(directory, "floorplans"));
  const brochures = listFiles(path.join(directory, "brochure"))
    .filter((file) => path.extname(file).toLowerCase() === ".pdf")
    .map((file) => ({ name: path.parse(file).name, url: assetUrl(slug, path.join("brochure", file)) }));
  const floorplans = floorplanFiles
    .filter((file) => path.extname(file).toLowerCase() === ".pdf")
    .map((file) => {
      const basename = path.parse(file).name.trim();
      const preview = floorplanFiles.find((candidate) => path.parse(candidate).name.trim() === basename && assetExtensions.has(path.extname(candidate).toLowerCase()));
      return {
        name: basename,
        documentUrl: assetUrl(slug, path.join("floorplans", file)),
        ...(preview ? { previewUrl: assetUrl(slug, path.join("floorplans", preview)) } : {}),
      };
    });
  const galleryDocuments = listFiles(path.join(directory, "gallery"))
    .filter((file) => path.extname(file).toLowerCase() === ".pdf")
    .map((file) => ({ name: path.parse(file).name, url: assetUrl(slug, path.join("gallery", file)) }));
  return { floorplans, brochures, galleryDocuments };
}

function makeCatalogProperty(directory: string): CatalogProperty | null {
  const slug = path.basename(directory);
  const jsonPath = path.join(directory, "property.json");
  if (!existsSync(jsonPath)) return null;
  const parsed = propertyJsonSchema.safeParse(JSON.parse(readFileSync(jsonPath, "utf8")));
  if (!parsed.success) return null;

  const data = parsed.data;
  const hero = readContent(directory, "hero.md");
  const overview = plainText(readContent(directory, "overview.md"));
  const galleryDirectory = path.join(directory, "gallery");
  const galleryAssets = listFiles(galleryDirectory).filter((file) => assetExtensions.has(path.extname(file).toLowerCase()));
  const webpBasenames = new Set(
    galleryAssets
      .filter((file) => path.extname(file).toLowerCase() === ".webp")
      .map((file) => path.parse(file).name.toLowerCase()),
  );
  const galleryFiles = galleryAssets.filter((file) => (
    path.extname(file).toLowerCase() === ".webp"
    || !webpBasenames.has(path.parse(file).name.toLowerCase())
  ));
  const configuredHero = data.hero?.image ?? data.heroImage ?? heroField(hero, "hero_image");
  const configuredHeroFilename = configuredHero ? path.basename(configuredHero) : undefined;
  const configuredHeroWebp = configuredHeroFilename ? `${path.parse(configuredHeroFilename).name}.webp` : undefined;
  const heroFile = [configuredHeroWebp, configuredHeroFilename, ...galleryFiles]
    .find((file): file is string => Boolean(file && galleryFiles.includes(file)));
  const images: PropertyImage[] = galleryFiles
    .sort((a, b) => (a === heroFile ? -1 : b === heroFile ? 1 : a.localeCompare(b)))
    .map((file, order) => ({ id: `${slug}-${file}`, url: assetUrl(slug, path.join("gallery", file)), alt: `${data.name ?? formatName(slug)} — ${path.parse(file).name.replace(/[-_]/g, " ")}`, order, createdAt: new Date(0) }));

  const validJsonSlug = data.slug === slug;
  const title = validJsonSlug ? (data.name ?? data.hero?.title ?? heroField(hero, "title") ?? formatName(slug)) : formatName(slug);
  const location = data.district ? `${data.district}, ${data.city ?? "Miami"}` : data.city ?? "Miami";
  const description = validJsonSlug ? (data.seo?.description ?? data.seoDescription ?? overview) : overview;

  return {
    id: `catalog-${slug}`,
    slug,
    title,
    description,
    price: 0,
    address: data.address ?? location,
    city: data.city ?? "Miami",
    state: data.state ?? "Florida",
    zipCode: "",
    latitude: data.coordinates?.lat ?? null,
    longitude: data.coordinates?.lng ?? null,
    bedrooms: bedroomCount(data.bedrooms),
    bathrooms: 0,
    squareFeet: 0,
    yearBuilt: data.year ?? (Number(data.completion) || undefined),
    type: "RESIDENTIAL",
    status: normalizeStatus(data.status),
    amenities: data.features ?? [],
    features: overview || undefined,
    images,
    agent: defaultAgent,
    agentId: defaultAgent.id,
    createdAt: new Date(0),
    updatedAt: new Date(0),
    resources: makeResources(slug, directory),
    seo: {
      title: validJsonSlug ? (data.seo?.title ?? data.seoTitle ?? title) : title,
      description: description || `${title} en ${location}.`,
    },
  };
}

export function getCatalogProperties(): CatalogProperty[] {
  if (!existsSync(catalogRoot)) return [];
  const properties: CatalogProperty[] = [];
  for (const district of readdirSync(catalogRoot)) {
    const districtPath = path.join(catalogRoot, district);
    if (!statSync(districtPath).isDirectory()) continue;
    for (const property of readdirSync(districtPath)) {
      const item = makeCatalogProperty(path.join(districtPath, property));
      if (item) properties.push(item);
    }
  }
  return properties;
}

export function getCatalogPropertyBySlug(slug: string) {
  return getCatalogProperties().find((property) => property.slug === slug.toLowerCase().trim()) ?? null;
}

export function resolveCatalogAsset(slug: string, relativePath: string) {
  const property = getCatalogPropertyBySlug(slug);
  if (!property || !relativePath || relativePath.includes("..")) return null;
  const propertyDirectory = readdirSync(catalogRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(catalogRoot, entry.name, slug))
    .find((directory) => existsSync(directory));
  if (!propertyDirectory) return null;
  const requestedPath = path.resolve(propertyDirectory, relativePath);
  if (!requestedPath.startsWith(`${path.resolve(propertyDirectory)}${path.sep}`) || !existsSync(requestedPath) || !statSync(requestedPath).isFile()) return null;
  return requestedPath;
}
