import {test, expect} from "@playwright/test";

test("Dropdown test", async ({page})=> {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder("Username").fill('Admin');
    await page.getByRole('textbox', {name: 'password'}).fill('admin123');
    await page.getByRole('button', {name: 'Login'}).click();

    await page.getByText('PIM').click();

    await page.locator('form i').nth(2).click();

    
});