import { expect, test } from '@playwright/test';

test.describe('Landing page', () => {
  test('renders the current carousel and its primary action', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'DRIVEN REAL ESTATE' }).click();
    const action = page.getByRole('link', { name: /explore properties|explorar propiedades/i }).first();
    await expect(action).toBeVisible();
    await expect(page.getByRole('button', { name: 'DRIVEN BUSINESS' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'DRIVEN ACADEMY' })).toBeVisible();
  });

  test('navigates to the portfolio from the real-estate carousel action', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'DRIVEN REAL ESTATE' }).click();
    await page.getByRole('link', { name: /explore properties|explorar propiedades/i }).first().click();
    await expect(page).toHaveURL(/\/real-estate$/);
  });

  test('renders featured properties and the lead capture CTA', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /exceptional properties|propiedades\s+excepcionales/i })).toBeVisible();
    await expect(page.locator('main a[href*="/real-estate/"]').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /schedule consultation|agendar consulta/i })).toBeVisible();
  });

  test('keeps the public landing routes inside the mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    for (const route of ['/', '/real-estate', '/business', '/academy', '/contact', '/about']) {
      await page.goto(route);
      await expect(page.getByRole('banner', { name: /main navigation|navegaci.n principal/i })).toBeVisible();
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    }
  });

  test('applies night mode without horizontal overflow', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('driven-theme', 'night'));
    await page.goto('/academy');

    await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe('night');
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.getByRole('button', { name: /open preferences|abrir preferencias/i }).click();
    await expect(page.getByRole('button', { name: /switch to day mode|cambiar a modo diurno/i })).toHaveAttribute('aria-pressed', 'true');
  });
});
