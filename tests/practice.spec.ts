import{test, expect} from '@playwright/test';

test('Practicing programing', async ({page})=> {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const sort = [...days].sort();

    console.log(sort);

    if(days === sort)
    {
        console.log("The array is sorted");
    }
    else    {
        console.log("The array is not sorted");
    }
    
});

test("Find duplicate from Array", async ({page})=> {
    const numbers = [1, 2, 3, 2, 4, 5, 3, 6];

    const remove_duplicate = new Set();
    const duplicate  = [];

    for(let num of numbers)
    {
        if(remove_duplicate.has(num))
        {
            duplicate.push(num);
        }
        else{
            remove_duplicate.add(num);
        }
    }
    if(duplicate.length === 0)
    {
        console.log("No duplicate found");
    }
    else{   
        console.log("Duplicate number is :"+ duplicate);
    }
    console.log(remove_duplicate);
    console.log("After removing duplicates :"+ [...remove_duplicate]);
});