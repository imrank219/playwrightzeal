import { test, expect } from '@playwright/test';
import fs from 'fs';

const testDataPath = 'testdata/dataflight.json';
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

export class Destinationpage {
  constructor(page) {
    this.page = page;

    // =====================
    // Primary Locators (CSS / getByRole)
    // =====================
    this.departurePrimary = page.locator("form[method='post'] > select[name='fromPort']");
    this.philadelphiaPrimary = page.locator('select[name="fromPort"]');
    this.destinationPrimary = page.locator('select[name="toPortz"]');
    this.findflightbuttonPrimary = page.getByRole('button', { name: 'Find Flights' });

    // =====================
    // Fallback Locators (XPath)
    // =====================
    this.departureFallback = page.locator("//form[@method='post']//select[@name='fromPort']");
    this.philadelphiaFallback = page.locator("//select[@name='fromPort']");
    this.destinationFallback = page.locator("//select[@name='toPort']");
    // BlazeDemo uses an <input type="submit" value="Find Flights">
    this.findflightbuttonFallback = page.locator("//input[@value='Find Flights']");
  }

  /**
   * Helper function: attempts to click the primary locator; if not visible or fails,
   * logs a warning and uses the fallback locator.
   */
  async clickWithFallback(primaryLocator, fallbackLocator) {
    try {
      // Wait for the primary locator to appear and be visible
      await primaryLocator.waitFor({ state: 'visible', timeout: 2000 });
      await primaryLocator.click();
    } catch (err) {
      console.warn(`Primary locator failed or wasn't visible. Falling back... \nError: ${err}`);
      // Ensure fallback is visible, then click
      await fallbackLocator.waitFor({ state: 'visible', timeout: 3000 });
      await fallbackLocator.click();
    }
  }

  /**
   * Helper function: attempts to select an option in the primary locator; if it fails,
   * logs a warning and uses the fallback locator.
   */
  async selectOptionWithFallback(primaryLocator, fallbackLocator, value) {
    try {
      // Wait for the primary locator to appear
      await primaryLocator.waitFor({ state: 'attached', timeout: 2000 });
      await primaryLocator.selectOption(value);
    } catch (err) {
      console.warn(`Primary locator failed to select option. Falling back... \nError: ${err}`);
      // Wait for fallback, then select option
      await fallbackLocator.waitFor({ state: 'attached', timeout: 3000 });
      await fallbackLocator.selectOption(value);
    }
  }

  async visit() {
    await this.page.goto("https://blazedemo.com/");
  }

  async selectflightDepart() {
    for (const flight of testData) {
      console.log(`Selecting flight from: ${flight.departureCity} to ${flight.destinationCity}`);

      // Click on the departure dropdown (primary → fallback)
      await this.clickWithFallback(this.departurePrimary, this.departureFallback);

      // Select departure city (primary → fallback)
      await this.selectOptionWithFallback(
        this.philadelphiaPrimary,
        this.philadelphiaFallback,
        flight.departureCity
      );

      // Select destination city (primary → fallback)
      await this.selectOptionWithFallback(
        this.destinationPrimary,
        this.destinationFallback,
        flight.destinationCity
      );

      // Click the "Find Flights" button (primary → fallback)
      await this.clickWithFallback(this.findflightbuttonPrimary, this.findflightbuttonFallback);
    }
  }
}


    
