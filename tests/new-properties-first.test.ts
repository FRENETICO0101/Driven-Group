import assert from "node:assert/strict";
import test from "node:test";
import { getCatalogProperties } from "../src/lib/property-catalog";
import { mergePropertySources } from "../src/server/services/property-catalog-merge";
import type { Property } from "../src/lib/types";

test("new database properties appear before the static catalog", () => {
  const source = getCatalogProperties()[0]!;
  const created = {
    ...source,
    id: "new-property-id",
    slug: "new-miami-residence",
    title: "New Miami Residence",
    images: [],
  } as Property;
  const properties = mergePropertySources(getCatalogProperties(), [created]);
  assert.equal(properties[0]?.slug, "new-miami-residence");
});
