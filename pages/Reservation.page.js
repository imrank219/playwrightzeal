const { test, expect } = require('@playwright/test');
import fs from 'fs';
const testDataPath = 'testdata/datareservation.json'
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'))


export class Reservationpage{

    constructor(page){

        this.page = page;
     /*   
        this.reservationpage = page.getByText('Please submit the form below')
        this.name = page.getByRole('textbox', { name: 'Name', exact: true })
        this.address = page.getByRole('textbox', { name: 'Address' })
        this.city = page.getByRole('textbox', { name: 'City' })
        this.state = page.getByRole('textbox', { name: 'State' })
        this.zipcode = page.getByRole('textbox', { name: 'Zip Code' })
        this.cardno = page.getByRole('textbox', { name: 'Credit Card Number' })
        this.month = page.getByRole('textbox', { name: 'Month' })
        this.year = page.getByRole('textbox', { name: 'Year' })
        this.namecard = page.getByRole('textbox', { name: 'Name on Card' })
        this.purchaseflight = page.getByRole('button', { name: 'Purchase Flight' })
*/
        this.name = page.locator('#inputName')
        this.reservationpage = page.getByText('Please submit the form below')
this.address = page.locator('#address')
this.city = page.locator('#city')
this.state = page.locator('#state')
this.zipcode = page.locator('#zipCode')
this.cardno = page.locator('#creditCardNumber')
this.month = page.locator('#creditCardMonth')
this.year = page.locator('#creditCardYear')
this.namecard = page.locator('#nameOnCard')

this.purchaseflight = page.locator('input[type="submit"][value="Purchase Flight"]')





        
        
    }

 
    addReservationData = async () =>{
        for (const reserve of testData){
         await expect (this.reservationpage).toBeVisible();
         await this.name.fill(reserve.name);
         //await this.delay(4000);
         await this.address.fill(reserve.address);
         await this.city.fill(reserve.city);
         await this.state.fill(reserve.state);
         await this.zipcode.fill(reserve.zip);
         await this.cardno.fill(reserve.cardno);
         await this.month.clear();
         await this.month.fill(reserve.month);
         await this.year.clear();
         await this.year.fill(reserve.year);
         await this.namecard.fill(reserve.nameoncard);
         await this.purchaseflight.click();
         await this.page.screenshot({ path: `screenshots/reservation_page.png`, fullPage: true });
       
  
}

}
}
    
