const { test, expect } = require('@playwright/test');
import { Destinationpage, Loginpage } from '../pages/Destination2.page';

import { Flightpage } from '../pages/Flight.page';
import { Reservationpage } from '../pages/Reservation.page';
import { Confirmationpage } from '../pages/Confirmation.page';




test('Book First Flight', async ({ page }) => {
  //  for (let i = 0; i < 5; i++) {
  //      console.log(`Running iteration ${i + 1}`);
  //  const {departureCity, desitinationCity} = flightData;
    const DestPage = new Destinationpage(page)
    const FlyPage = new Flightpage(page)
    const ReserPage = new Reservationpage(page)
    //const ConfirmPage = new Confirmationpage2(page)
    const ConfirmPage = new Confirmationpage(page)

    await DestPage.visit();
    await DestPage.selectflightDepart();
    await FlyPage.flightSelect();
    await ReserPage.addReservationData();
    await ConfirmPage.validateConfirmationPage();
    await ConfirmPage.validateScreenShot();
    //test//
  
    
  })
