import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should load home page with hero section', async ({ page }) => {
    await page.goto('/');
    
    // Hero section visible
    await expect(page.getByRole('heading', { name: /leading international luxury real estate brokerage/i })).toBeVisible();
    
    // CTA buttons present
    await expect(page.getByRole('link', { name: /view details/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /contact/i }).first()).toBeVisible();
  });

  test('should navigate to real estate from hero CTA', async ({ page }) => {
    await page.goto('/');
    
    // Click explore portfolio button
    await page.getByRole('link', { name: /view details/i }).click();
    
    // Should reach real-estate page
    await expect(page).toHaveURL(/\/(en\/)?real-estate$/);
  });

  test('should display featured properties section', async ({ page }) => {
    await page.goto('/');
    
    // Featured section heading
    await expect(page.getByRole('heading', { name: /exceptional properties/i })).toBeVisible();
    
    // Property cards visible (check for at least one)
    const propertyCards = await page.locator('main a[href*="/real-estate/"]').first();
    await expect(propertyCards).toBeVisible();
  });

  test('should display stats section', async ({ page }) => {
    await page.goto('/');
    
    // Stats visible
    await expect(page.getByText(/3\+/)).toBeVisible();
    await expect(page.getByText(/50\+/)).toBeVisible();
    await expect(page.getByText(/4\+/)).toBeVisible();
  });

  test('should display CTA section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: /transform your vision into investment/i })).toBeVisible();
  });

  test('mobile: should display responsive navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Logo visible
    await expect(page.getByRole('link', { name: /driven group/i })).toBeVisible();
    
    // Navigation visible
    await expect(page.getByRole('link', { name: /contact/i })).toBeVisible();
  });

  test('mobile: should display responsive hero text', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Heading visible and readable
    const heading = page.getByRole('heading', { name: /leading international luxury real estate brokerage/i });
    await expect(heading).toBeVisible();
    
    // Font size should be responsive (not huge on mobile)
    const boxModel = await heading.boundingBox();
    expect(boxModel?.width).toBeLessThan(400);
  });
});
