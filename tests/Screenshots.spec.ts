import {test,expect} from'@playwright/test';

test('ScreenshotTest', async ({page})=> {
    await page.goto('https://demowebshop.tricentis.com/');

    console.log('Taking screenshot of Home page')
    const timestamp = Date.now();
    await page.screenshot({path: 'screenshots/HomePage'+timestamp+'.png' , fullPage: true});

    console.log('Taking screenshot of Logo');
    const logo = await page.getByAltText('Tricentis Demo Web Shop');
    await logo.screenshot({path: 'screenshots/Logo'+timestamp+'.png'});

    await page.locator('.header-menu').screenshot({path: 'screenshots/HeaderMenu'+timestamp+'.png'});   
});