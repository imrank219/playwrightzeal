const { test, expect } = require('@playwright/test');

export class Loginsaucepage{


constructor(page){

    this.page = page;
    this.username = page.locator('[data-test="username"]')
    this.password = page.locator('[data-test="password"]')
    this.loginbutton = page.locator('[data-test="login-button"]')


}


   visitsauce = async () => {

    await this.page.goto("https://www.saucedemo.com/")
   }

   loginflow_old = async () =>{

    await this.username.fill("standard_user");
    await this.password.fill("secret_sauce");
    await this.loginbutton.click();

   }

   loginflow = async () =>{

    await this.username.fill("standard_user");
    await this.password.fill("secret_sauce");
    await this.loginbutton.click();

    await this.page.context().storageState({path: 'authsauce.json' })

   }

   visitsauce2 = async () => {

    await this.page.goto("https://www.saucedemo.com/inventory.html")
   }




}