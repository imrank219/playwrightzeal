const { test, expect } = require('@playwright/test');
import { Loginsaucepage} from '../pages/loginsauce.page';

test('Zeal sauce demo', async ({ page }) => {

  const loginnew = new Loginsaucepage(page);

  await loginnew.visitsauce();
  await loginnew.loginflow();

    
  })
