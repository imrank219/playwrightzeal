const { test, expect } = require('@playwright/test');

export class Inventorysaucepage{

    constructor(page){
     this.page = page;
    this.productpage = page.locator("xpath=//*[text()='Products']");
    this.backpack = page.locator("xpath=//*[text()='Sauce Labs Backpack']");
    this.backpackprice = page.locator("xpath=//*[@class='inventory_details_price']");
    this.addtocartbutton = page.locator("xpath=//*[@id='add-to-cart']")
    this.addcarticon = page.locator("xpath=//*[@class='shopping_cart_link']//*[text()='1']")
    this.shoppingcartlink = page.locator("xpath=//*[@class='shopping_cart_link']")

    }


    selectbackPack = async () => {
        const fs = require('fs');
        await expect(this.productpage).toBeVisible();
        await this.backpack.click();
       //Grab value of backpack
        const backpackpricevalue = await this.backpackprice.textContent();
        console.log(backpackpricevalue);
        // Write content to a file
        fs.writeFileSync('tests/testdata/price.txt', backpackpricevalue, 'utf8');
        console.log('Content written to output.txt');
        await this.addtocartbutton.click();
        await expect(this.addcarticon).toBeVisible();
        await this.shoppingcartlink.click();
       


    }






}