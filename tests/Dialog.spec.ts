import {test, expect} from '@playwright/test';

test.beforeEach(async ({page})=> {
    await page.goto('https://testautomationpractice.blogspot.com/');
});

test('simple dialod', async ({page})=> {
    
    page.on('dialog',  (dialog)=> {
        console.log('Dialog is:', dialog.type());
        console.log('Dialog message:',dialog.message());
        dialog.accept();
    });

    await page.getByRole('button', {name: 'Simple Alert'}).click();
});

test('confirmation alert', async ({page})=> {
    page.on('dialog', (dialog)=> {
        console.log(`Dialog type: ${dialog.type()}`);
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toBe('Press a button!');
        dialog.dismiss();
    });

    await page.getByRole('button', {name: 'Confirmation Alert'}).click();

    await page.waitForTimeout(5000);

    await expect(page.locator('#demo')).toHaveText('You pressed Cancel!');
});

test.only('Prompt Alert', async ({page})=> {

    page.on('dialog', async (dialog)=> {
        console.log('Prompt Alert is displayed');
        dialog.accept('Playwright');
    });

    await page.getByRole('button', {name: 'Prompt Alert'}).click();

    await page.waitForTimeout(5000);

    await expect(page.locator('#demo')).toHaveText('Hello Playwright! How are you today?');
});