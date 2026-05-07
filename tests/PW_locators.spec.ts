import{test, expect} from '@playwright/test';

test('Verify Playwright locators', async ({page}) =>{
   
    await page.goto('https://demo.nopcommerce.com');

    const logo = page.getByAltText('nopCommerce demo store');

    expect(logo).toBeVisible();

    await expect(page.getByText(/welcome to our store/i)).toBeVisible();
    await expect(page.getByText('Welcome to')).toHaveText('Welcome to our store');

    await page.getByRole('link', {name: 'Register'}).click();

    expect(await page.getByRole('heading', {name: 'Register'})).toBeVisible();

    await page.getByRole('radio', {name: 'Male', checked:false}).nth(0  ).check();

    await page.getByRole('textbox', {name: 'First Name'}).fill('Rahul');
    await page.getByRole('textbox', {name: 'Last Name'}).fill('Karmakar');


});