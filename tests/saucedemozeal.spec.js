const { test, expect } = require('@playwright/test');
import { Loginsaucepage} from '../pages/loginsauce.page';
import { Inventorysaucepage } from '../pages/inventory.page'
import { Cartsaucepage } from '../pages/Cart.page';
import { Infosaucepage } from '../pages/Info.page';

test.use({storageState: "authsauce.json"});
test('Zeal sauce demo', async ({ page }) => {

  const loginnew = new Loginsaucepage(page);
  const invent = new Inventorysaucepage(page);
  const cart = new Cartsaucepage(page);
  const inform = new Infosaucepage(page);

 // await loginnew.visitsauce();
 // await loginnew.loginflow();
  await loginnew.visitsauce2();
  await invent.selectbackPack();
  await cart.cartflow();
  await inform.InfoFlow();
    
  })
