import { test, expect } from '@playwright/test'
import fs from 'fs';
const testDataPath = 'testdata/dataflight.json'
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'))

for (const flight of testData){
    test(`Select flights ${flight.fromPort}`, async({page})=>{
        await page.goto('https://www.blazedemo.com/');
        await page.locator('select[name="fromPort"]').selectOption(flight.fromPort);
        await page.locator('select[name="toPort"]').selectOption(flight.toPort);
        await page.getByRole('button', { name: 'Find Flights' }).click();
        await page.getByRole('row', { name: 'Choose This Flight 43 Virgin' }).getByRole('button').click();
        await page.getByPlaceholder('First Last').click();
        await page.getByPlaceholder('First Last').fill('Mike Redwood');
        await page.getByPlaceholder('Main St.').click();
        await page.getByPlaceholder('Main St.').fill('123 main street');
        await page.getByPlaceholder('Anytown').click();
        await page.getByPlaceholder('Anytown').fill('Plano');
        await page.getByPlaceholder('Anytown').press('Tab');
        await page.getByPlaceholder('State').fill('TX');
        await page.getByPlaceholder('12345').click();
        await page.getByPlaceholder('12345').fill('75036');
        await page.getByPlaceholder('Credit Card Number').click();
        await page.getByPlaceholder('Credit Card Number').fill('424242424242424');
        await page.getByPlaceholder('Month').click();
        await page.getByPlaceholder('Year').click();
        await page.getByPlaceholder('Year').fill('2026');
        await page.getByPlaceholder('John Smith').click();
        await page.getByPlaceholder('John Smith').fill('Mike Redwood');
        await page.getByRole('button', { name: 'Purchase Flight' }).click();
        await expect(page.getByRole('heading', { name: 'Thank you for your purchase' })).toBeVisible();

    })
}