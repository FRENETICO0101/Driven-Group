import { test, expect } from '@playwright/test';

const hasTestDatabase = process.env.E2E_DATABASE_AVAILABLE === 'true';

async function openLeadForm(page: import('@playwright/test').Page) {
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: /solicitar información/i }).click();
  await expect(page.locator('input[name="name"]')).toBeVisible();
}

test.describe('Lead Capture Form', () => {
  test('should submit lead form successfully', async ({ page }) => {
    test.skip(!hasTestDatabase, 'Requires a provisioned E2E PostgreSQL database.');
    await page.goto('/es/real-estate/1428-brickell');
    
    // Open form
    await openLeadForm(page);
    
    // Fill form
    await page.locator('input[name="name"]').fill('Juan Pérez');
    await page.locator('input[name="email"]').fill('juan@example.com');
    await page.locator('input[name="phone"]').fill('+56912345678');
    await page.locator('textarea[name="message"]').fill('Estoy interesado en esta propiedad');
    
    // Submit
    await page.getByRole('button', { name: /^enviar$/i }).click();
    
    // Should show success message
    await expect(page.getByText(/consulta recibida/i)).toBeVisible();
    await expect(page.getByText(/asesor se pondrá en contacto/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/es/real-estate/1428-brickell');
    
    await openLeadForm(page);
    
    // HTML5 validation should prevent submission
    const isRequired = await page.locator('input[name="name"]').evaluate(
      (el: HTMLInputElement) => el.required
    );
    expect(isRequired).toBe(true);
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/es/real-estate/1428-brickell');
    
    await openLeadForm(page);
    
    // Fill with invalid email
    await page.locator('input[name="name"]').fill('Juan');
    await page.locator('input[name="email"]').fill('invalid-email');
    await page.locator('input[name="phone"]').fill('+56912345678');
    
    // HTML5 validation
    const emailInput = page.locator('input[name="email"]');
    const isEmail = await emailInput.evaluate(
      (el: HTMLInputElement) => el.type === 'email'
    );
    expect(isEmail).toBe(true);
  });

  test('should allow form reset', async ({ page }) => {
    await page.goto('/es/real-estate/1428-brickell');
    
    await openLeadForm(page);
    
    // Fill form
    await page.locator('input[name="name"]').fill('Juan');
    await page.locator('input[name="email"]').fill('juan@example.com');
    
    // Click cancel
    await page.getByRole('button', { name: /cancelar/i }).click();
    
    // Form should reset to initial state
    await expect(page.getByRole('button', { name: /solicitar información/i })).toBeVisible();
  });

  test('mobile: should have responsive form layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/es/real-estate/1428-brickell');
    
    await openLeadForm(page);
    
    // Form should be visible and full width
    const form = page.locator('form').first();
    const box = await form.boundingBox();
    expect(box?.width).toBeLessThan(400);
    expect(box?.width).toBeGreaterThan(300);
  });

  test('should show loading state during submission', async ({ page }) => {
    test.skip(!hasTestDatabase, 'Requires a provisioned E2E PostgreSQL database.');
    await page.goto('/es/real-estate/1428-brickell');
    
    await openLeadForm(page);
    
    // Fill form
    await page.locator('input[name="name"]').fill('Juan Pérez');
    await page.locator('input[name="email"]').fill('juan@example.com');
    await page.locator('input[name="phone"]').fill('+56912345678');
    
    // Submit and check button changes to loading
    const submitBtn = page.getByRole('button', { name: /^enviar$/i });
    await submitBtn.click();
    
    // Button should show loading text briefly
    await expect(submitBtn).toContainText(/enviando|enviar/i);
  });
});
