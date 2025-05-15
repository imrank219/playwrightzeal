const { test, expect } = require('@playwright/test');
import fs from 'fs';


const testDataPath = 'tests/testdata/datashopper.json';
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

export class Infosaucepage{


constructor(page){

  

    this.page = page;
    this.firstname = page.locator("xpath=//*[@data-test='firstName']");
    this.lastname = page.locator("xpath=//*[@data-test='lastName']");
    this.zipcode = page.locator("xpath=//*[@data-test='postalCode']");
    this.backpackprice = page.locator("xpath=//*[@class='inventory_item_price']");
    this.continuebutton = page.locator("xpath=//*[@id='continue']");

 
   
}

  InfoFlow = async () =>{
     const fs = require('fs');
     for (const shoppers of testData) {
      // Enter firstname
      console.log(shoppers.firstname);

    

      // Select firstname 
     
      await this.firstname.fill(shoppers.firstname);

    
      // Select last name 
      await this.lastname.fill(shoppers.lastname);

     //Select zipcode
      await this.zipcode.fill(shoppers.zipcode);
      await this.continuebutton.click();
     
   }

   




  }
}