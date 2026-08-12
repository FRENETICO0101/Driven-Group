import { expect, test } from '@playwright/test';

test.describe('Footer and Business page', () => {
  test('renders the current Spanish footer and business division navigation', async ({ page, context }) => {
    await context.addCookies([{ name: 'NEXT_LOCALE', value: 'es', url: 'http://localhost:3000' }]);
    await page.goto('/business');

    await expect(page.getByRole('heading', { name: 'NUESTRAS DIVISIONES' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Explorar divisiones' }).getByRole('link', { name: /01.*Comercio Digital/ })).toBeVisible();

    const footer = page.getByRole('contentinfo');
    await expect(footer.getByText('Divisions', { exact: true })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Real Estate' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Business' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Academy', exact: true })).toBeVisible();
    await expect(footer.getByRole('link', { name: /pol.tica de privacidad/i })).toBeVisible();
  });
});
