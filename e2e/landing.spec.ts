import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should load home page with hero section', async ({ page }) => {
    await page.goto('/');
    
    // Hero section visible
    await expect(page.getByRole('heading', { name: /donde el patrimonio toma forma/i })).toBeVisible();
    
    // CTA buttons present
    await expect(page.getByRole('link', { name: /explorar portfolio/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /agendar consulta/i })).toBeVisible();
  });

  test('should navigate to real estate from hero CTA', async ({ page }) => {
    await page.goto('/');
    
    // Click explore portfolio button
    await page.getByRole('link', { name: /explorar portfolio/i }).click();
    
    // Should reach real-estate page
    await expect(page).toHaveURL('/real-estate');
  });

  test('should display featured properties section', async ({ page }) => {
    await page.goto('/');
    
    // Featured section heading
    await expect(page.getByRole('heading', { name: /investment opportunities/i })).toBeVisible();
    
    // Property cards visible (check for at least one)
    const propertyCards = await page.locator('[href^="/real-estate/"]').first();
    await expect(propertyCards).toBeVisible();
  });

  test('should display stats section', async ({ page }) => {
    await page.goto('/');
    
    // Stats visible
    await expect(page.getByText(/15\+/)).toBeVisible();
    await expect(page.getByText(/120\+/)).toBeVisible();
    await expect(page.getByText(/35\+/)).toBeVisible();
  });

  test('should display CTA section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: /transforma tu visión en inversión/i })).toBeVisible();
  });

  test('mobile: should display responsive navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Logo visible
    await expect(page.getByText(/driven group/i)).toBeVisible();
    
    // Navigation visible
    await expect(page.getByRole('button', { name: /agendar/i })).toBeVisible();
  });

  test('mobile: should display responsive hero text', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Heading visible and readable
    const heading = page.getByRole('heading', { name: /donde el patrimonio toma forma/i });
    await expect(heading).toBeVisible();
    
    // Font size should be responsive (not huge on mobile)
    const boxModel = await heading.boundingBox();
    expect(boxModel?.width).toBeLessThan(400);
  });
});
