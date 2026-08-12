import { expect, test } from '@playwright/test';

const hasTestDatabase = process.env.E2E_DATABASE_AVAILABLE === 'true';

async function openLeadForm(page: import('@playwright/test').Page) {
  await page.waitForLoadState('networkidle');
  await page.getByRole('button').filter({ hasText: /solicitar/i }).click();
  await expect(page.locator('input[name="name"]')).toBeVisible();
}

test.describe('Lead capture form', () => {
  test('submits a lead when an E2E database is configured', async ({ page }) => {
    test.skip(!hasTestDatabase, 'Requires a provisioned E2E PostgreSQL database.');
    await page.goto('/es/real-estate/1428-brickell');
    await openLeadForm(page);
    await page.locator('input[name="name"]').fill('Juan Perez');
    await page.locator('input[name="email"]').fill('juan@example.com');
    await page.locator('input[name="phone"]').fill('+56912345678');
    await page.getByRole('button', { name: /^enviar$/i }).click();
    await expect(page.getByText(/consulta recibida/i)).toBeVisible();
  });

  test('marks the required fields and validates email input', async ({ page }) => {
    await page.goto('/es/real-estate/1428-brickell');
    await openLeadForm(page);
    await expect(page.locator('input[name="name"]')).toHaveAttribute('required', '');
    await expect(page.locator('input[name="email"]')).toHaveAttribute('type', 'email');
  });

  test('allows cancelling a draft and restores the request action', async ({ page }) => {
    await page.goto('/es/real-estate/1428-brickell');
    await openLeadForm(page);
    await page.locator('input[name="name"]').fill('Juan');
    await page.getByRole('button', { name: /cancelar/i }).click();
    await expect(page.getByRole('button').filter({ hasText: /solicitar/i })).toBeVisible();
  });

  test('keeps the form inside the mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/es/real-estate/1428-brickell');
    await openLeadForm(page);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  });
});
