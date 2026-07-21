import { expect, test } from '@playwright/test';

test.describe('Language switcher', () => {
  test('switches between Spanish without a prefix and English with /en while preserving the route', async ({ page }) => {
    await page.goto('/en/real-estate');

    await expect(page.getByRole('button', { name: 'Switch to English' })).toHaveAttribute('aria-current', 'page');
    await page.getByRole('button', { name: 'Cambiar a español' }).click();
    await expect(page).toHaveURL(/\/real-estate$/);
    await expect(page.getByRole('button', { name: 'Cambiar a español' })).toHaveAttribute('aria-current', 'page');

    await page.getByRole('button', { name: 'Switch to English' }).click();
    await expect(page).toHaveURL(/\/en\/real-estate$/);
    await expect(page.getByRole('button', { name: 'Switch to English' })).toHaveAttribute('aria-current', 'page');
  });

  test('uses the selected locale for the global navigation labels', async ({ page }) => {
    await page.context().addCookies([{ name: 'NEXT_LOCALE', value: 'es', domain: 'localhost', path: '/' }]);
    await page.goto('/academy');
    await page.getByRole('button', { name: /abrir menú/i }).click();
    const spanishMenu = page.locator('nav');
    await expect(spanishMenu.getByRole('link', { name: /Negocios/ })).toBeVisible();
    await expect(spanishMenu.getByRole('link', { name: /Bienes raíces/ })).toBeVisible();
    await expect(spanishMenu.getByRole('link', { name: /Academia/ })).toBeVisible();

    await page.goto('/en/academy');
    await page.getByRole('button', { name: /open menu/i }).click();
    const englishMenu = page.locator('nav');
    await expect(englishMenu.getByRole('link', { name: /Business/ })).toBeVisible();
    await expect(englishMenu.getByRole('link', { name: /Real Estate/ })).toBeVisible();
    await expect(englishMenu.getByRole('link', { name: /Academy/ })).toBeVisible();
  });
});
