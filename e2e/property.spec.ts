import { test, expect } from '@playwright/test';

test.describe('Property Detail Page', () => {
  test('should render Mandarin PDF renderings in the gallery', async ({ page }) => {
    await page.goto('/en/real-estate/mandarin-oriental-residences');

    const rendering = page.locator('iframe[title*="Mandarin Oriental"]');
    await expect(rendering).toBeVisible();
    await expect(rendering).toHaveAttribute('src', /mandarin-oriental-miami-hero\.pdf/);
  });

  test('should render interactive maps for mapped properties', async ({ page }) => {
    await page.goto('/en/real-estate/1428-brickell');
    await expect(page.locator('.leaflet-container')).toBeVisible();

    await page.goto('/en/real-estate');
    await expect(page.locator('.leaflet-container')).toBeVisible();
  });

  test('should support property map markers, zoom controls, and expanded view', async ({ page }) => {
    await page.goto('/en/real-estate');

    const map = page.locator('.leaflet-container').first();
    await map.scrollIntoViewIfNeeded();
    await expect(map).toBeVisible();
    await expect(page.getByText('10 locations available')).toBeVisible();
    await expect(map.locator('.leaflet-marker-icon')).toHaveCount(10);

    const zoomIn = map.locator('.leaflet-control-zoom-in');
    const zoomOut = map.locator('.leaflet-control-zoom-out');
    await expect(zoomIn).toBeVisible();
    await expect(zoomOut).toBeVisible();
    await zoomIn.click();
    await expect(map.locator('.leaflet-marker-icon')).toHaveCount(10);
    await zoomOut.click();
    await expect(map.locator('.leaflet-marker-icon')).toHaveCount(10);

    await map.locator('.leaflet-marker-icon').last().click();
    await expect(map.locator('.leaflet-popup-content')).toContainText('NoMad Residences Wynwood');

    await page.getByRole('button', { name: 'Expand map' }).click();
    const expandedMap = page.getByRole('dialog');
    await expect(expandedMap).toBeVisible();
    await expect(expandedMap.locator('.leaflet-marker-icon')).toHaveCount(10);
    await expect(expandedMap.locator('.leaflet-control-zoom-in')).toBeVisible();

    await page.getByRole('button', { name: 'Reduce map' }).click();
    await expect(expandedMap).toBeHidden();
  });

  test('should load property detail page', async ({ page }) => {
    // Navigate through featured properties to find a slug
    await page.goto('/');
    
    // Click first property card
    const firstProperty = page.locator('main a[href*="/real-estate/"]').first();
    await firstProperty.click();
    
    // Should be on a property detail page
    await expect(page).toHaveURL(/\/(en\/)?real-estate\/[^/]+$/);
    
    // Property details visible
    await expect(page.getByRole('heading', { name: /especificaciones/i })).toBeVisible();
  });

  test('should display property gallery', async ({ page }) => {
    await page.goto('/');
    
    const firstProperty = page.locator('main a[href*="/real-estate/"]').first();
    await firstProperty.click();
    
    // Gallery image visible
    const galleryImage = page.locator('img').first();
    await expect(galleryImage).toBeVisible();
  });

  test('should display property CTA form', async ({ page }) => {
    await page.goto('/');
    
    const firstProperty = page.locator('main a[href*="/real-estate/"]').first();
    await firstProperty.click();
    
    // CTA section visible
    await expect(page.getByRole('heading', { name: /agendar consulta/i })).toBeVisible();
    
    // Form button visible
    await expect(page.getByRole('button', { name: /solicitar información/i })).toBeVisible();
  });

  test('should expand form when clicking request info', async ({ page }) => {
    await page.goto('/');
    
    const firstProperty = page.locator('main a[href*="/real-estate/"]').first();
    await firstProperty.click();
    
    // Click request info
    await page.getByRole('button', { name: /solicitar información/i }).click();
    
    // Form inputs visible
    await expect(page.getByPlaceholder(/nombre completo/i)).toBeVisible();
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/teléfono/i)).toBeVisible();
  });

  test('should navigate back to listings', async ({ page }) => {
    await page.goto('/');
    
    const firstProperty = page.locator('main a[href*="/real-estate/"]').first();
    await firstProperty.click();
    
    // Click back link
    await page.getByRole('link', { name: /volver al catálogo/i }).click();
    
    // Should be back on real-estate page
    await expect(page).toHaveURL(/\/(en\/)?real-estate$/);
  });

  test('mobile: should display sticky CTA sidebar', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const firstProperty = page.locator('main a[href*="/real-estate/"]').first();
    await firstProperty.click();
    
    // CTA sidebar should be visible
    const ctaSection = page.locator('.sticky').last();
    await expect(ctaSection).toBeVisible();
  });

  test('mobile: should have responsive form inputs', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const firstProperty = page.locator('main a[href*="/real-estate/"]').first();
    await firstProperty.click();
    
    await page.getByRole('button', { name: /solicitar información/i }).click();
    
    // Inputs should be full width on mobile
    const nameInput = page.getByPlaceholder(/nombre completo/i);
    const box = await nameInput.boundingBox();
    expect(box?.width).toBeGreaterThan(300);
  });
});
