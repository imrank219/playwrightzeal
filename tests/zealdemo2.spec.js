import { test, expect } from '@playwright/test';

test('should successfully book a flight from Philadelphia to London', async ({ page }) => {
  await page.goto('https://www.blazedemo.com/');

  // Select departure and destination
  await page.locator('select[name="fromPort"]').selectOption('Philadelphia');
  await page.locator('select[name="toPort"]').selectOption('London');
  await page.getByRole('button', { name: 'Find Flights' }).click();

  // Choose the first available flight dynamically
  const firstFlightButton = page.locator('table tbody tr').first().getByRole('button');
  await firstFlightButton.click();

  // Fill passenger details
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Mike Tester');
  await page.getByRole('textbox', { name: 'Address' }).fill('2323 West Way Rd');
  await page.getByRole('textbox', { name: 'City' }).fill('Plano');
  await page.getByRole('textbox', { name: 'State' }).fill('TX');
  await page.getByRole('textbox', { name: 'Zip Code' }).fill('75036');

  // Fill payment details
  const creditCardNumber = process.env.CREDIT_CARD || '424242424242424';
  await page.getByRole('textbox', { name: 'Credit Card Number' }).fill(creditCardNumber);
  await page.getByRole('textbox', { name: 'Name on Card' }).fill('Mike Tester');

  // Submit purchase
  await page.getByRole('button', { name: 'Purchase Flight' }).click();

  // Validate success message
  await expect(page.locator('h1')).toContainText('Thank you for your purchase');
});
