import { test, expect } from '@playwright/test'
import fs from 'fs';
const testDataPath = 'testdata/data.json'
const config = { baseURL: 'https://www.saucedemo.com/' };

let testData = [];
try {
    const rawData = fs.readFileSync(testDataPath, 'utf8');
    testData = JSON.parse(rawData);
    if (!Array.isArray(testData) || testData.length === 0) {
        throw new Error('Test data is empty or invalid');
    }
} catch (error) {
    console.error(`Error reading test data: ${error.message}`);
    testData = []; // Gracefully handle by setting an empty array to avoid crashing
}

for (const user of testData){
    test(`Login with user ${user.username}`, async({page})=>{
     await page.goto(config.baseURL);
     await page.fill('#user-name',user.username)
     await page.fill('#password',user.password)
     await page.click('#login-button');
     
     await expect(page).toHaveURL(/inventory\.html/); // Verify successful login
     await expect(page.locator('.inventory_list')).toBeVisible(); // Ensure inventory page loads
     await expect(page.locator('.shopping_cart_link')).toBeVisible(); // Ensure shopping cart is available
    })
}