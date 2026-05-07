import{test,expect} from "@playwright/test";

test.setTimeout(120000);
test("Static WebTable", async ({page})=> {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const table = await page.locator("table[name='BookTable'] tbody");

    const row = await table.locator('tr');
    await expect(row).toHaveCount(7);

    const column = await row.locator('th');
    expect(await column.count()).toBe(4);

    const rows = await row.all()
    for(let ele of rows.slice(1))
    {
        const text = await ele.locator('td').allInnerTexts();
        //console.log(text);
        console.log(text.join('\t'));
    }
});

test("Book Name", async ({page})=> {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const table = await page.locator("table[name='BookTable'] tbody");

    const row = await table.locator('tr');
    await expect(row).toHaveCount(7);

    const column = await row.locator('th');
    expect(await column.count()).toBe(4);

    const Books = [];
    let total_price = 0;
    const rowdata = await row.all();
    for(let data of rowdata.slice(1))
    {
        const cells = await data.locator('td').allInnerTexts();
        const Author = cells[1];
        if(Author === 'Mukesh')
        {
            Books.push(cells[0]);
            total_price = total_price + parseInt(cells[3]);
        }
    }

    console.log(Books);
    expect(Books).toHaveLength(2);
    console.log(`Total price of books : ${total_price}`);
});

test('Dynamic WebTable', async ({page})=> {
    await page.goto('https://practice.expandtesting.com/dynamic-table');

    const table = await page.locator('table.table tbody');

    const rows =  await table.locator('tr').all();

    for(let row of rows)
    {
        const cells = await row.locator('td').allTextContents();

        if(cells[0].toLowerCase()=== ('chrome'))
        {
            const cpu = await row.locator('td:has-text("MB/s")').innerText();
            console.log(`Browser : ${cells[0]}  CPU : ${cpu}`);
            break;
        }
    }

});

test('Pagination Table', async ({page}) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    let morepages = true;

    while(morepages)
    {
        const table_rows = await page.locator('.display tbody tr').all();
        for(let row of table_rows)
        {
            const cells = await row.locator('td').allTextContents();
            console.log(cells.join('\t'));
        }

        const next_button = page.getByRole('button', {name: 'next'});
        const isDisabled = await next_button.getAttribute('class');

        if (isDisabled?.includes('disabled')) {
             break;
        }
        else{
            await next_button.click();
        }
    }
    
});