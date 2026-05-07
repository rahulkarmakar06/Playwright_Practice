import{test, expect} from '@playwright/test';
import fs from 'fs';
import * as XLSX from 'xlsx';

test('JSON Test', async ()=> {
    const excelpath = 'TestData/TestData.xlsx';
    const workbook = XLSX.readFile(excelpath);
    const sheetname = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetname];

    const jsondata = XLSX.utils.sheet_to_json(worksheet);

    console.log(jsondata);
})