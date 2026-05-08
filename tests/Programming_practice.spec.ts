import{test} from '@playwright/test';

test('Practice', ()=> {
   //sorted array in ascending order
 /*   const arr = [10, 45, 67, 89, 34];
    const sorted = arr.sort((a,b) => a - b);
    console.log(sorted); */

/*
    const str = 'abcba';
    const rev = str.split('').reverse().join('');
    console.log(rev);

    if(str === rev)
    {
        console.log(`Palindrome ${str}`);
    }
    else{
        console.log(`Not Palindrome ${str}`);
    } */
   
        const str = ['Rahul', 'Rakesh', 'Rahul','Rakesh', 'Rahul'];
        const unique = new Set(str);
        console.log(unique);
    
});