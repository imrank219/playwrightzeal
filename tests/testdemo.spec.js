import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.msn.com/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'News', exact: true }).click();
  const page1 = await page1Promise;
  await expect(page1.getByRole('heading', { name: 'News' })).toBeVisible();
});