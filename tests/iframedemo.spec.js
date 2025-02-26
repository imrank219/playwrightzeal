import { test, expect } from '@playwright/test'

test('frame test', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/nested_frames');

    const frameContent = await page.$("frame[name='frame-top']");
    const parentContent = await frameContent.contentFrame();

    console.log( await parentContent.locator("frameset[name='frameset-middle']").isVisible());

    const childFrame= await parentContent.$("frame[src='/frame_middle']");
    const childContent = await childFrame.contentFrame();
    await childContent.locator
   

                    

  
  });
  
  