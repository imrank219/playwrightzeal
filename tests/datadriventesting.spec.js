import { test, expect } from '@playwright/test'
import fs from 'fs';
const testDataPath = 'testdata/data.json'
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'))

for (const user of testData){
    test(`Login with user ${user.username}`, async({page})=>{
     await page.goto('https://www.saucedemo.com/')
     await page.fill('#user-name',user.username)
     await page.fill('#password',user.password)
     await page.click('#login-button');

    })
}