const { test, expect } = require('@playwright/test');

export class Flightpage {

    constructor(page){

        this.page = page;
        this.chooseflightvirgin = page.getByRole('row', { name: 'Choose This Flight 43 Virgin' }).getByRole('button')

        
        
    }

    flightSelect = async() =>{
       await this.chooseflightvirgin.click();
       

    }
}