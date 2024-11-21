import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to main sections', async ({ page }) => {
    await page.goto('/');
    
    // Check if main page loads with correct title
    await expect(page).toHaveTitle(/CacheAdvance/);
    
    // Find the Introduction section and Installation link within it
    const introSection = page.getByRole('list').filter({ hasText: 'Introduction' });
    const installationLink = introSection.getByRole('link', { name: 'Installation' });
    
    // Click the Installation link and verify navigation
    await expect(installationLink).toBeVisible();
    await installationLink.click();
    await expect(page).toHaveURL(/installation/);
    
    // Verify content is loaded
    await expect(page.getByRole('heading', { name: /installation/i, level: 1 })).toBeVisible();
  });

  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/');
    
    // Find and click the theme selector
    const themeButton = page.getByRole('button', { name: /theme/i });
    await themeButton.click();
    
    // Select dark theme
    const darkOption = page.getByRole('option', { name: /dark/i });
    await expect(darkOption).toBeVisible();
    await darkOption.click();
    
    // Verify dark mode is applied
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('should use search functionality', async ({ page }) => {
    await page.goto('/');
    
    // Open search dialog (either by button or keyboard shortcut)
    await Promise.any([
      page.keyboard.press(process.platform === 'darwin' ? 'Meta+k' : 'Control+k'),
      page.getByRole('button', { name: /search/i }).click()
    ]);
    
    // Wait for search dialog
    const searchDialog = page.getByRole('dialog');
    await expect(searchDialog).toBeVisible();
    
    // Type search query
    await page.keyboard.type('installation');
    
    // Wait for and click search result
    const searchResult = page.getByRole('option', { name: /installation/i }).first();
    await expect(searchResult).toBeVisible();
    await searchResult.click();
    
    // Verify navigation
    await expect(page).toHaveURL(/installation/);
  });
});
