import { expect, test } from '@playwright/test';

test.describe('Language switcher', () => {
  test('switches between Spanish without a prefix and English with /en while preserving the route', async ({ page }) => {
    await page.goto('/en/real-estate');

    const header = page.getByRole('banner');
    const english = header.locator('button').filter({ hasText: /^EN$/ });
    const spanish = header.locator('button').filter({ hasText: /^ES$/ });
    await expect(english).toHaveAttribute('aria-current', 'page');
    await spanish.click();
    await expect(page).toHaveURL(/\/real-estate$/);
    await expect(spanish).toHaveAttribute('aria-current', 'page');

    await english.click();
    await expect(page).toHaveURL(/\/en\/real-estate$/);
    await expect(english).toHaveAttribute('aria-current', 'page');
  });

  test('keeps the three business division names in English in either locale', async ({ page, context }) => {
    await context.addCookies([{ name: 'NEXT_LOCALE', value: 'es', domain: 'localhost', path: '/' }]);
    await page.goto('/academy');
    await page.getByRole('banner').getByRole('button').first().click();
    const spanishMenu = page.getByRole('dialog');
    await expect(spanishMenu.getByRole('link', { name: 'Business' })).toBeVisible();
    await expect(spanishMenu.getByRole('link', { name: 'Real Estate' })).toBeVisible();
    await expect(spanishMenu.getByRole('link', { name: 'Academy' })).toBeVisible();

    await page.goto('/en/academy');
    await page.getByRole('banner').getByRole('button').first().click();
    const englishMenu = page.getByRole('dialog');
    await expect(englishMenu.getByRole('link', { name: 'Business' })).toBeVisible();
    await expect(englishMenu.getByRole('link', { name: 'Real Estate' })).toBeVisible();
    await expect(englishMenu.getByRole('link', { name: 'Academy' })).toBeVisible();
  });
});
