import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Configuration
const BASE_URL = process.env.BASE_URL || 'https://www.blazedemo.com/';
const TEST_DATA_PATH = process.env.TEST_DATA_PATH || path.join(__dirname, 'testdata', 'dataflight.json');

// Default User Details (can be overridden by environment variables)
const DEFAULT_USER = {
    firstName: process.env.FIRST_NAME || 'Mike Redwood',
    address: process.env.ADDRESS || '123 Main Street',
    city: process.env.CITY || 'Plano',
    state: process.env.STATE || 'TX',
    zipCode: process.env.ZIP_CODE || '75036',
    creditCardNumber: process.env.CREDIT_CARD_NUMBER || '424242424242424',
    creditCardMonth: process.env.CREDIT_CARD_MONTH || '12',
    creditCardYear: process.env.CREDIT_CARD_YEAR || '2026',
    nameOnCard: process.env.NAME_ON_CARD || 'Mike Redwood'
};

// Helper Functions
async function fillInput(page, placeholder, value) {
    await page.getByPlaceholder(placeholder).click();
    await page.getByPlaceholder(placeholder).fill(value);
}

async function selectOption(page, selector, value) {
    await page.locator(selector).selectOption(value);
}

// Read and parse test data with error handling
let testData = [];
try {
    const data = fs.readFileSync(TEST_DATA_PATH, 'utf8');
    testData = JSON.parse(data);
    if (!Array.isArray(testData)) {
        throw new Error('Test data should be an array of flight objects.');
    }
} catch (error) {
    console.error(`Error reading or parsing ${TEST_DATA_PATH}:`, error);
    process.exit(1); // Exit to prevent running tests without valid data
}

// Augment testData with default user details if necessary
testData = testData.map(flight => ({
    ...flight,
    ...DEFAULT_USER
}));

// Describe block for grouping related tests
test.describe.serial('Flight Purchase Tests', () => {
    // Iterate over each flight in testData
    for (const flight of testData) {
        test(`Select flights from ${flight.fromPort} to ${flight.toPort}`, async ({ page }) => {
            // Navigate to the base URL
            await page.goto(BASE_URL);

            // Select 'From' and 'To' ports
            await selectOption(page, 'select[name="fromPort"]', flight.fromPort);
            await selectOption(page, 'select[name="toPort"]', flight.toPort);

            // Click 'Find Flights' button
            await page.getByRole('button', { name: 'Find Flights' }).click();

            // Verify navigation to the flights page
            await expect(page).toHaveURL(/reserve\.php/);

            // Choose the first available flight (adjust as necessary)
            await page.getByRole('button', { name: /Choose This Flight/i }).first().click();

            // Verify navigation to the purchase page
            await expect(page).toHaveURL(/purchase\.php/);

            // Fill in purchase form
            await fillInput(page, 'First Last', flight.firstName);
            await fillInput(page, 'Main St.', flight.address);
            await fillInput(page, 'Anytown', flight.city);
            await page.getByPlaceholder('Anytown').press('Tab'); // Navigate to 'State' field
            await fillInput(page, 'State', flight.state);
            await fillInput(page, '12345', flight.zipCode);
            await fillInput(page, 'Credit Card Number', flight.creditCardNumber);
            await fillInput(page, 'Month', flight.creditCardMonth);
            await fillInput(page, 'Year', flight.creditCardYear);
            await fillInput(page, 'John Smith', flight.nameOnCard);

            // Click 'Purchase Flight' button
            await page.getByRole('button', { name: 'Purchase Flight' }).click();

            // Assert that the confirmation page is displayed
            await expect(page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
        });
    }
});
