const { test, expect } = require('@playwright/test');
import { Loginsaucepage} from '../pages/loginsauce.page';
import { Inventorysaucepage } from '../pages/inventory.page'

test('Zeal sauce demo', async ({ page }) => {

  const loginnew = new Loginsaucepage(page);
  const invent = new Inventorysaucepage(page);

  await loginnew.visitsauce();
  await loginnew.loginflow();
  await invent.selectbackPack();

    
  })
