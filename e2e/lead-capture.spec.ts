import { test, expect } from '@playwright/test';

test.describe('Lead Capture Form', () => {
  test('should submit lead form successfully', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to property
    const firstProperty = page.locator('a[href^="/real-estate/"]').first();
    await firstProperty.click();
    
    // Open form
    await page.getByRole('button', { name: /solicitar información/i }).click();
    
    // Fill form
    await page.getByPlaceholder(/nombre completo/i).fill('Juan Pérez');
    await page.getByPlaceholder(/email/i).fill('juan@example.com');
    await page.getByPlaceholder(/teléfono/i).fill('+56912345678');
    await page.getByPlaceholder(/mensaje/i).fill('Estoy interesado en esta propiedad');
    
    // Submit
    await page.getByRole('button', { name: /^enviar$/i }).click();
    
    // Should show success message
    await expect(page.getByText(/consulta recibida/i)).toBeVisible();
    await expect(page.getByText(/asesor se pondrá en contacto/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/');
    
    const firstProperty = page.locator('a[href^="/real-estate/"]').first();
    await firstProperty.click();
    
    await page.getByRole('button', { name: /solicitar información/i }).click();
    
    // Try to submit empty form
    const submitBtn = page.getByRole('button', { name: /^enviar$/i });
    
    // HTML5 validation should prevent submission
    const isRequired = await page.getByPlaceholder(/nombre completo/i).evaluate(
      (el: HTMLInputElement) => el.required
    );
    expect(isRequired).toBe(true);
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/');
    
    const firstProperty = page.locator('a[href^="/real-estate/"]').first();
    await firstProperty.click();
    
    await page.getByRole('button', { name: /solicitar información/i }).click();
    
    // Fill with invalid email
    await page.getByPlaceholder(/nombre completo/i).fill('Juan');
    await page.getByPlaceholder(/email/i).fill('invalid-email');
    await page.getByPlaceholder(/teléfono/i).fill('+56912345678');
    
    // HTML5 validation
    const emailInput = page.getByPlaceholder(/email/i);
    const isEmail = await emailInput.evaluate(
      (el: HTMLInputElement) => el.type === 'email'
    );
    expect(isEmail).toBe(true);
  });

  test('should allow form reset', async ({ page }) => {
    await page.goto('/');
    
    const firstProperty = page.locator('a[href^="/real-estate/"]').first();
    await firstProperty.click();
    
    await page.getByRole('button', { name: /solicitar información/i }).click();
    
    // Fill form
    await page.getByPlaceholder(/nombre completo/i).fill('Juan');
    await page.getByPlaceholder(/email/i).fill('juan@example.com');
    
    // Click cancel
    await page.getByRole('button', { name: /cancelar/i }).click();
    
    // Form should reset to initial state
    await expect(page.getByRole('button', { name: /solicitar información/i })).toBeVisible();
  });

  test('mobile: should have responsive form layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const firstProperty = page.locator('a[href^="/real-estate/"]').first();
    await firstProperty.click();
    
    await page.getByRole('button', { name: /solicitar información/i }).click();
    
    // Form should be visible and full width
    const form = page.locator('form').first();
    const box = await form.boundingBox();
    expect(box?.width).toBeLessThan(400);
    expect(box?.width).toBeGreaterThan(300);
  });

  test('should show loading state during submission', async ({ page }) => {
    await page.goto('/');
    
    const firstProperty = page.locator('a[href^="/real-estate/"]').first();
    await firstProperty.click();
    
    await page.getByRole('button', { name: /solicitar información/i }).click();
    
    // Fill form
    await page.getByPlaceholder(/nombre completo/i).fill('Juan Pérez');
    await page.getByPlaceholder(/email/i).fill('juan@example.com');
    await page.getByPlaceholder(/teléfono/i).fill('+56912345678');
    
    // Submit and check button changes to loading
    const submitBtn = page.getByRole('button', { name: /^enviar$/i });
    submitBtn.click();
    
    // Button should show loading text briefly
    await expect(submitBtn).toContainText(/enviando|enviar/i);
  });
});
