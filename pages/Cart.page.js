const { test, expect } = require('@playwright/test');

export class Cartsaucepage{


constructor(page){

  

    this.page = page;
    this.cartlocation = page.locator("xpath=//*[text()='Your Cart']");
    this.backpack = page.locator("xpath=//*[text()='Sauce Labs Backpack']");
    this.backpackprice = page.locator("xpath=//*[@class='inventory_item_price']");
    this.checkout = page.locator("xpath=//*[@id='checkout']");

 
   
}

  cartflow = async () =>{
     const fs = require('fs');
     await expect(this.cartlocation).toBeVisible();
     //Verify the backpack amount is correct

     var backpackamount = fs.readFileSync('tests/testdata/price.txt', 'utf8').trim(); // Trim to remove unwanted spaces or newlines
     console.log(`Backpack Amount from file: ${backpackamount}`);
     
     // Ensure the element contains the expected text
     await expect(this.backpackprice).toHaveText(backpackamount);

     await this.checkout.click();
   }




}