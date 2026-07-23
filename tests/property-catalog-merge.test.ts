import assert from "node:assert/strict";
import test from "node:test";
import { getCatalogProperties } from "../src/lib/property-catalog";
import { mergePropertySources } from "../src/server/services/property-catalog-merge";
import type { Property } from "../src/lib/types";

const catalog = getCatalogProperties();
const sourceProperty = catalog.find((property) => property.slug === "viceroy-brickell")!;

if (!sourceProperty) throw new Error("Expected Viceroy to be present in the local property catalog");

function databaseProperty(overrides: Partial<Property>): Property {
  return {
    ...sourceProperty,
    id: "database-property-id",
    images: [],
    ...overrides,
  };
}

test("an editorial database override updates catalog metadata while preserving source assets", () => {
  const override = databaseProperty({ title: "Viceroy Brickell", description: "Updated from the CMS." });
  const properties = mergePropertySources(catalog, [override]);
  const merged = properties.find((property) => property.slug === sourceProperty.slug);

  assert.equal(merged?.title, "Viceroy Brickell");
  assert.equal(merged?.description, "Updated from the CMS.");
  assert.deepEqual(merged?.images, sourceProperty.images);
  assert.ok("resources" in (merged ?? {}));
});

test("an inactive override hides a source property from the public catalog", () => {
  const hidden = databaseProperty({ status: "INACTIVE" });
  const publicProperties = mergePropertySources(catalog, [hidden]);
  const managedProperties = mergePropertySources(catalog, [hidden], {}, true);

  assert.equal(publicProperties.some((property) => property.slug === sourceProperty.slug), false);
  assert.equal(managedProperties.find((property) => property.slug === sourceProperty.slug)?.status, "INACTIVE");
});

test("a database-only property remains available to management but is excluded from the public catalog", () => {
  const created = databaseProperty({ id: "new-property-id", slug: "new-miami-residence", title: "New Miami Residence", status: "ACTIVE", images: [] });
  const publicProperties = mergePropertySources(catalog, [created], {}, false, false);
  const managedProperties = mergePropertySources(catalog, [created], {}, true, true);

  assert.equal(publicProperties.some((property) => property.slug === "new-miami-residence"), false);
  assert.equal(managedProperties.find((property) => property.slug === "new-miami-residence")?.title, "New Miami Residence");
});

test("filters apply consistently after catalog and CMS records are merged", () => {
  const created = databaseProperty({ id: "new-property-id", slug: "new-miami-residence", title: "New Miami Residence", city: "Miami", status: "ACTIVE", images: [] });
  const properties = mergePropertySources(catalog, [created], { type: "RESIDENTIAL", city: "Miami", status: "ACTIVE" }, false, true);

  assert.ok(properties.length > 0);
  assert.ok(properties.every((property) => property.type === "RESIDENTIAL" && property.city === "Miami" && property.status === "ACTIVE"));
});

test("location filters support grouped cities for a single market", () => {
  const properties = mergePropertySources(catalog, [], {
    type: "RESIDENTIAL",
    cities: ["Miami", "Miami Beach"],
    status: "ACTIVE",
  });

  assert.ok(properties.length > 0);
  assert.ok(properties.some((property) => property.city === "Miami Beach"));
  assert.ok(properties.every((property) => ["Miami", "Miami Beach"].includes(property.city)));
});
