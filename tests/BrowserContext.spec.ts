import{test, expect, chromium, firefox, webkit} from'@playwright/test';
test.setTimeout(120000);

test('Broswer context', async ({})=> {

    const browser = await chromium.launch();
    //const browser = await firefox.launch();
    //const browser = await webkit.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const page2 = await context.newPage();

    await page.goto('https://www.google.com/');
    await page2.goto('https://www.bing.com/');

    await page.waitForTimeout(5000);
    await page2.waitForTimeout(5000);
});

test.only('Tab Haldling', async ({page, context})=> {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForTimeout(5000);

    const [newPage] = await Promise.all([context.waitForEvent('page'), await page.getByRole('button', {name: 'New Tab'}).click()]);

    await newPage.waitForTimeout(5000);

    const pages = context.pages();
    console.log('Total number of pages:', pages.length);
    console.log(`page1 - ${pages[0].url()}  page2 - ${pages[1].url()}`);
    console.log(`page1 Title - ${await pages[0].title()}  page2 Title - ${await pages[1].title()}`);

    await page.bringToFront();
    await page.waitForTimeout(5000);

    await newPage.close();
    await page.waitForTimeout(5000);
    
});

test('Practice', async ({page,context})=> {
    const[newpage] = await Promise.all([context.waitForEvent('page'), await page.locator('loc').click()]);

    await newpage.waitForLoadState('networkidle');
});