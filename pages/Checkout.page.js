const { test, expect } = require('@playwright/test');

export class Checksaucepage{


constructor(page){

  

    this.page = page;
    this.checkoutpage =  page.locator("xpath=//*[text()='Checkout: Overview']");
    this.backpackprice = page.locator("xpath=//*[@class='inventory_item_price']");
    this.totalamount = page.locator("xpath=//*[text()='32.39']")
    this.finish = page.locator("xpath=//*[@id='finish']")
    this.checkoutmessage = page.locator("xpath=//*[text()='Thank you for your order!']")


 
   
}

  checkflow = async () =>{
     const fs = require('fs');
     await expect(this.checkoutpage).toBeVisible();
     //Verify the backpack amount is correct

     var backpackamount = fs.readFileSync('tests/testdata/price.txt', 'utf8').trim(); // Trim to remove unwanted spaces or newlines
     console.log(`Backpack Amount from file: ${backpackamount}`);
     
     // Ensure the element contains the expected text
     await expect(this.backpackprice).toHaveText(backpackamount);
     await expect(this.totalamount).toBeVisible();

     await this.finish.click();

     //Checkout message
     await expect(this.checkoutmessage).toBeVisible();
   }




}
