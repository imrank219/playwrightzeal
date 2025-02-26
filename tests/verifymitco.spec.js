const { test, expect } = require('@playwright/test');
import { Loginpage } from '../pages/LoginPage.page';

test('invalid login', async ({ page }) => {
    const loginPage = new Loginpage(page)

    await loginPage.visitmitco();
    
    await expect(page).toHaveTitle(/React App/);

    //await loginPage.invalidlogin();
  })