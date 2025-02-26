const { test, expect } = require('@playwright/test');
import { Loginpage } from '../pages/LoginPage.page';

test('invalid login', async ({ page }) => {
    const loginPage = new Loginpage(page)

    await loginPage.visit();
    
    await expect(page).toHaveTitle(/Boot Camps Enrollment Portal/);

    await loginPage.invalidlogin();
  })