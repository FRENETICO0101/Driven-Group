import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "assets", "properties");
const publicRoot = path.join(root, "public", "property-assets");
const manifestPath = path.join(root, "src", "lib", "generated", "property-catalog.json");
const imageExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);

function files(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).filter((name) => statSync(path.join(directory, name)).isFile());
}

function readContent(directory, filename) {
  const filePath = path.join(directory, "content", filename);
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
}

function plainText(markdown) {
  return markdown
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\*\*/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function heroField(content, field) {
  return content.match(new RegExp(`^${field}:\\s*(.+)$`, "mi"))?.[1]?.trim();
}

function formatName(slug) {
  return slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function normalizeStatus(value) {
  const normalized = value?.toLowerCase().replace(/[\s-]/g, "_");
  if (normalized === "sold") return "SOLD";
  if (normalized === "pending") return "PENDING";
  if (normalized === "inactive") return "INACTIVE";
  return "ACTIVE";
}

function bedroomCount(value) {
  return Math.max(0, ...(value ?? []).map((entry) => Number(entry.match(/\d+/)?.[0] ?? 0)));
}

function copyAsset(directory, relativePath, assetBase, assetFiles) {
  const normalized = relativePath.split(path.sep).join("/");
  const source = path.join(directory, normalized);
  const destination = path.join(publicRoot, assetBase, normalized);
  mkdirSync(path.dirname(destination), { recursive: true });
  cpSync(source, destination);
  assetFiles.push(normalized);
  return `/property-assets/${assetBase}/${normalized.split("/").map(encodeURIComponent).join("/")}`;
}

function buildProperty(district, slug) {
  const directory = path.join(sourceRoot, district, slug);
  const jsonPath = path.join(directory, "property.json");
  if (!existsSync(jsonPath)) return null;

  const data = JSON.parse(readFileSync(jsonPath, "utf8"));
  const assetBase = `${district}/${slug}`;
  const assetFiles = [];
  const assetUrl = (relativePath) => copyAsset(directory, relativePath, assetBase, assetFiles);
  const hero = readContent(directory, "hero.md");
  const overview = plainText(readContent(directory, "overview.md"));
  const galleryDirectory = path.join(directory, "gallery");
  const galleryAssets = files(galleryDirectory).filter((file) => imageExtensions.has(path.extname(file).toLowerCase()));
  const webpBasenames = new Set(galleryAssets.filter((file) => path.extname(file).toLowerCase() === ".webp").map((file) => path.parse(file).name.toLowerCase()));
  const galleryFiles = galleryAssets.filter((file) => path.extname(file).toLowerCase() === ".webp" || !webpBasenames.has(path.parse(file).name.toLowerCase()));
  const configuredHero = data.hero?.image ?? data.heroImage ?? heroField(hero, "hero_image");
  const configuredHeroFilename = configuredHero ? path.basename(configuredHero) : undefined;
  const configuredHeroWebp = configuredHeroFilename ? `${path.parse(configuredHeroFilename).name}.webp` : undefined;
  const heroFile = [configuredHeroWebp, configuredHeroFilename, ...galleryFiles].find((file) => file && galleryFiles.includes(file));
  const images = galleryFiles
    .sort((a, b) => (a === heroFile ? -1 : b === heroFile ? 1 : a.localeCompare(b)))
    .map((file, order) => ({
      id: `${slug}-${file}`,
      url: assetUrl(path.join("gallery", file)),
      alt: `${data.name ?? formatName(slug)} — ${path.parse(file).name.replace(/[-_]/g, " ")}`,
      order,
    }));

  const floorplanFiles = files(path.join(directory, "floorplans"));
  const floorplans = floorplanFiles
    .filter((file) => path.extname(file).toLowerCase() === ".pdf")
    .map((file) => {
      const basename = path.parse(file).name.trim();
      const preview = floorplanFiles.find((candidate) => path.parse(candidate).name.trim() === basename && imageExtensions.has(path.extname(candidate).toLowerCase()));
      return {
        name: basename,
        documentUrl: assetUrl(path.join("floorplans", file)),
        ...(preview ? { previewUrl: assetUrl(path.join("floorplans", preview)) } : {}),
      };
    });
  const brochures = files(path.join(directory, "brochure"))
    .filter((file) => path.extname(file).toLowerCase() === ".pdf")
    .map((file) => ({ name: path.parse(file).name, url: assetUrl(path.join("brochure", file)) }));
  const galleryDocuments = files(galleryDirectory)
    .filter((file) => path.extname(file).toLowerCase() === ".pdf")
    .map((file) => ({ name: path.parse(file).name, url: assetUrl(path.join("gallery", file)) }));

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
    resources: { floorplans, brochures, galleryDocuments },
    seo: {
      title: validJsonSlug ? (data.seo?.title ?? data.seoTitle ?? title) : title,
      description: description || `${title} en ${location}.`,
    },
    assetBase,
    assetFiles,
  };
}

if (!existsSync(sourceRoot)) throw new Error(`Property source directory not found: ${sourceRoot}`);
rmSync(publicRoot, { recursive: true, force: true });
mkdirSync(publicRoot, { recursive: true });

const properties = [];
for (const district of readdirSync(sourceRoot)) {
  const districtPath = path.join(sourceRoot, district);
  if (!statSync(districtPath).isDirectory()) continue;
  for (const slug of readdirSync(districtPath)) {
    const propertyPath = path.join(districtPath, slug);
    if (!statSync(propertyPath).isDirectory()) continue;
    const property = buildProperty(district, slug);
    if (property) properties.push(property);
  }
}

mkdirSync(path.dirname(manifestPath), { recursive: true });
writeFileSync(manifestPath, `${JSON.stringify(properties, null, 2)}\n`);
console.log(`Generated ${properties.length} catalog entries and ${properties.reduce((total, property) => total + property.assetFiles.length, 0)} static property assets.`);
