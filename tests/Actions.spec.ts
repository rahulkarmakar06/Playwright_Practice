import {test, expect} from 'playwright/test';

test.setTimeout(60000);
test.beforeEach(async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

});
test('Textbox', async ({page}) => {
    
    const name = page.getByPlaceholder('Enter Name');
    await name.fill('Rahul Karmakar');
})

test("Radio Button", async ({page}) => {
    await expect(page.getByLabel('Male').first()).not.toBeChecked();

    await page.getByRole('radio', {name:"Male"}).first().check();

    const radio = await page.getByRole("radio");

    for(let ele of await radio.all())
    {
        if(!(await ele.isChecked()))
        {
            await ele.check();
        }
    }

});

test("Checkboxes", async({page})=> {

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const checkbox = days.map(index=> page.getByLabel(index));
    for(let day of checkbox)
    {
        expect(day).not.toBeChecked();
        await day.check();
        await page.waitForTimeout(2000);
    }
    
    page.waitForTimeout(3000);

    for(let ele of checkbox.slice(-3))
    {
        ele.uncheck();
        await page.waitForTimeout(2000);
    }

    page.waitForTimeout(5000);

    for(let element of checkbox)
    {
        if(await element.isChecked())
        {
            await element.uncheck();
            await page.waitForTimeout(2000);
        }
        else if(!(await element.isChecked()))
        {
            await element.check();
            await page.waitForTimeout(2000);
        }
    }
});

test("Dropdown Test", async ({page})=> {
    const dropdown = await page.locator('#country');

    const options = await dropdown.locator('option');
    const options_txt1 =  (await options.allTextContents()).map(txt => txt.trim());
    //const options_txt =  options.map(txt => txt.trim());

    console.log(options_txt1);

    expect(options_txt1).toContain('India');

    dropdown.selectOption('India');
    await page.waitForTimeout(2000);
    dropdown.selectOption({label:'Japan'});
    await page.waitForTimeout(2000);
    dropdown.selectOption({value : 'china'});
    await page.waitForTimeout(2000);
    //dropdown.selectOption({index : 5});
});

test('Multiselected Dropdown', async ({page})=>
{
    const dropdown = await page.locator('#colors');

    const options = await dropdown.locator('option');

    const options_txt = (await options.allTextContents()).map(txt => txt.trim());
    console.log(options_txt);

    const sorted = options_txt.sort();
    console.log(sorted);
});

