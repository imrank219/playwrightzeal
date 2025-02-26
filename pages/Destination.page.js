const { test, expect } = require('@playwright/test');
import fs from 'fs';

// Read test data
const testDataPath = 'testdata/dataflight.json';
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

export class Destinationpage {

  constructor(page) {
    this.page = page;
    this.departure = page.locator("form[method='post'] > select[name='fromPort']");
    this.phildelphia = page.locator('select[name="fromPort"]');
    this.destination = page.locator('select[name="toPort"]');
    this.findflightbutton = page.getByRole('button', { name: 'Find Flights' });
  }

  visit = async () => {
    await this.page.goto("https://blazedemo.com/");
    // Optionally, take a screenshot of the landing page
    await this.page.screenshot({ path: `screenshots/landing_page.png`, fullPage: true });
  }

  selectflightDepart = async () => {
    // Create a directory for screenshots if it doesn't exist
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }

    for (const flight of testData) {
      // Log the city to console
      console.log(flight.departureCity);

      // Screenshot before selecting departure
      await this.page.screenshot({
        path: `screenshots/before_select_${flight.departureCity}.png`,
        fullPage: true
      });

      // Select departure city
      await this.departure.click();
      await this.phildelphia.selectOption(flight.departureCity);

      // Screenshot after selecting departure
      await this.page.screenshot({
        path: `screenshots/after_select_departure_${flight.departureCity}.png`,
        fullPage: true
      });

      // Select destination city
      await this.destination.selectOption(flight.destinationCity);

      // Screenshot after selecting destination
      await this.page.screenshot({
        path: `screenshots/after_select_destination_${flight.destinationCity}.png`,
        fullPage: true
      });

      // Click 'Find Flights'
      await this.findflightbutton.click();

      // Screenshot after clicking 'Find Flights'
      await this.page.screenshot({
        path: `screenshots/after_click_${flight.departureCity}_${flight.destinationCity}.png`,
        fullPage: true
      });
    }
  }
}

    
