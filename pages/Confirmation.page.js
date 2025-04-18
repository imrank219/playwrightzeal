const { test, expect } = require('@playwright/test');
import fs from 'fs';
import path from 'path';



// Read test data
const testDataPath = 'testdata/dataflight.json';
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

export class Confirmationpage {

  constructor(page) {
    this.page = page;
    this.confirmation = page.getByRole('heading', { name: 'Thank you for your purchase' })
    this.url = 'https://blazedemo.com/confirmation.php';
    this.header = page.locator('h1');
    this.confirmationTable = page.locator('.table');
    this.id = page.locator('td:has-text("Id") + td');
    this.status = page.locator('td:has-text("Status") + td');
    this.amount = page.locator('td:has-text("Amount") + td');
    this.cardNumber = page.locator('td:has-text("Card Number") + td');
    this.date = page.locator("xpath=/html/body/div[@class='container']//table[@class='table']/tbody/tr[7]")

  }

 
  validateConfirmationPage = async () => {
    const fs = require('fs');

    await expect(this.confirmation).toBeVisible();
    await expect(this.id).not.toBeEmpty();
    await expect(this.status).toHaveText(/Pending|Confirmed/);
    await expect(this.amount).not.toBeEmpty();
    await expect(this.cardNumber).toHaveText("xxxxxxxxxxxx1111");
    await expect(this.confirmationTable).toBeVisible();
    await expect(this.page).toHaveURL(/confirmation.php/);
    await this.page.screenshot({ path: `screenshots/confirmation.png`, fullPage: true });
    const content = await this.date.textContent();
    console.log(content)

    // Write content to a file
    fs.writeFileSync('F:/PWZealWork/playwrightzeal/testdata/output.txt', content, 'utf8');
    console.log('Content written to output.txt');

    ///C:/Playwright/testdata/output.txt

    const content2 = fs.readFileSync('F:/PWZealWork/playwrightzeal/testdata/output.txt', 'utf8');
    console.log('Content read from input.txt:', content);

    var datefield = fs.readFileSync('F:/PWZealWork/playwrightzeal/testdata/output.txt').toString();
    console.log(datefield);

    await expect(this.date).toContainText(datefield);

   
  }

  /**
   * Captures and compares a screenshot of the confirmation page
   * @param {string} screenshotName - Name of the screenshot file
   */
  validateScreenShot = async (screenshotName = 'confirmation-page.png') => {
    const screenshotDir = path.resolve('screenshots');
    const screenshotPath = path.join(screenshotDir, 'confirmation.png');

    // Ensure the screenshots directory exists
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }

    // Capture and compare the screenshot with baseline
    await expect(this.page).toHaveScreenshot({
        path: screenshotPath, // Save screenshot to screenshots/confirmation.png
        fullPage: true,  // Capture the full page
        threshold: 0.9,  // Allow minor visual differences (50% pixel difference allowed)
    });

    console.log(`✅ Screenshot verification passed: ${screenshotPath}`);
  }
}