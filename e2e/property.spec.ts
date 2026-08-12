import { expect, test } from '@playwright/test';

test.describe('Property experience', () => {
  test('provides residential, commercial, and location portfolio filters', async ({ page }) => {
    await page.goto('/en/real-estate');
    await expect(page.getByRole('button', { name: 'Residential' })).toBeVisible();
    const commercial = page.locator('summary[aria-label="Commercial"]');
    await commercial.click();
    await expect(page.getByRole('button', { name: 'Retail Spaces' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Warehouses' })).toBeVisible();
    const location = page.locator('summary[aria-label="Location"]');
    await location.click();
    await expect(page.getByRole('button', { name: 'Miami' })).toBeVisible();
  });

  test('renders converted Mandarin gallery assets instead of PDF renderings', async ({ page }) => {
    await page.goto('/en/real-estate/mandarin-oriental-residences');
    await expect(page.locator('main img[src*="mandarin-oriental-miami"]').first()).toBeVisible();
    await expect(page.locator('main iframe')).toHaveCount(0);
  });

  test('supports maps, markers, zoom controls, and expanded view', async ({ page }) => {
    await page.goto('/en/real-estate');
    const map = page.locator('.leaflet-container').first();
    await map.scrollIntoViewIfNeeded();
    await expect(map).toBeVisible();
    await expect(map.locator('.leaflet-marker-icon')).toHaveCount(10);
    await map.locator('.leaflet-control-zoom-in').click();
    await expect(map.locator('.leaflet-marker-icon')).toHaveCount(10);
    await page.getByRole('button', { name: 'Expand map' }).click();
    const expandedMap = page.getByRole('dialog');
    await expect(expandedMap).toBeVisible();
    await expect(expandedMap.locator('.leaflet-marker-icon')).toHaveCount(10);
    await page.getByRole('button', { name: 'Reduce map' }).click();
    await expect(expandedMap).toBeHidden();
  });

  test('displays the property gallery, details and consultation form', async ({ page }) => {
    await page.goto('/es/real-estate/1428-brickell');
    await expect(page.getByRole('heading', { name: /especificaciones/i })).toBeVisible();
    await expect(page.locator('main img').first()).toBeVisible();
    await page.getByRole('button').filter({ hasText: /solicitar/i }).click();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
  });

  test('keeps property detail responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/es/real-estate/1428-brickell');
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.getByRole('button').filter({ hasText: /solicitar/i }).click();
    const form = page.locator('form').first();
    await expect(form).toBeVisible();
    const box = await form.boundingBox();
    expect(box?.width).toBeGreaterThan(280);
  });
});
