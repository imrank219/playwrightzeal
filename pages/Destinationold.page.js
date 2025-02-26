const { test, expect } = require('@playwright/test');
import fs from 'fs';
const testDataPath = 'testdata/dataflight.json'
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'))


export class Destinationpage{

    constructor(page){

        this.page = page;
        this.departure = page.locator("form[method='post'] > select[name='fromPort']")
        this.phildelphia = page.locator('select[name="fromPort"]')
        this.destination = page.locator('select[name="toPort"]')
        this.findflightbutton = page.getByRole('button', { name: 'Find Flights' })
        
        
    }

    visit = async () =>{


        await this.page.goto("https://blazedemo.com/")
    }

    selectflightDepart = async () =>{
        for (const flight of testData){
   
        console.log(flight.departureCity);
       
  
    //  const cities = ["Paris", "Boston", "Portland", "San Diego", "Mexico City"];
    //  const cities2 = ["Rome", "London", "Berlin", "New York", "Dublin"];

   //   const brandonNumber = Math.floor(Math.random() * 4) + 1;

   //    console.log(brandonNumber);
   //    var fromCity = (cities[brandonNumber]);
   //    console.log(fromCity);


      await this.departure.click();

      await this.phildelphia.selectOption(flight.departureCity);
  
      await this.destination.selectOption(flight.destinationCity);
      await this.findflightbutton.click();
}

}
}
    
