import { expect, test } from '@playwright/test';

test.describe('Localized footer and Business page', () => {
  test('renders the Spanish footer and interactive division navigation', async ({ page, context }) => {
    await context.addCookies([{ name: 'NEXT_LOCALE', value: 'es', url: 'http://localhost:3000' }]);
    await page.goto('/business');

    await expect(page.getByRole('heading', { name: 'NUESTRAS DIVISIONES' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Explorar divisiones' }).getByRole('link', { name: /01.*Comercio Digital/ })).toBeVisible();

    const footer = page.getByRole('contentinfo');
    await expect(footer.getByText('Divisiones', { exact: true })).toBeVisible();
    await expect(footer.getByText(/Holding verticalmente integrado/)).toBeVisible();
    await expect(footer.getByText('Política de privacidad')).toBeVisible();
  });
});
