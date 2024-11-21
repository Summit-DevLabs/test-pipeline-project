import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to main sections', async ({ page }) => {
    await page.goto('/');
    
    // Check if main page loads
    await expect(page).toHaveTitle(/CacheAdvance/);
    
    // Check navigation links
    const links = [
      { text: 'Installation', href: '/docs/installation' },
      { text: 'Testing', href: '/docs/testing' },
    ];

    for (const { text, href } of links) {
      const link = page.getByRole('link', { name: text });
      await expect(link).toBeVisible();
      await link.click();
      await expect(page).toHaveURL(new RegExp(href));
    }
  });

  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/');
    
    // Find and click the theme selector
    const themeButton = page.getByRole('button', { name: /theme/i });
    await themeButton.click();
    
    // Select dark theme
    const darkOption = page.getByRole('option', { name: /dark/i });
    await darkOption.click();
    
    // Verify dark mode is applied
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('should use search functionality', async ({ page }) => {
    await page.goto('/');
    
    // Open search dialog
    await page.keyboard.press('Control+k');
    
    // Type search query
    await page.keyboard.type('installation');
    
    // Wait for search results
    const searchResults = page.getByRole('listbox');
    await expect(searchResults).toBeVisible();
    
    // Click first result
    const firstResult = searchResults.getByRole('option').first();
    await firstResult.click();
    
    // Verify navigation
    await expect(page).toHaveURL(/installation/);
  });
});
