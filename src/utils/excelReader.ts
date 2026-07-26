import * as XLSX from 'xlsx';
import path from 'path';

//the structure of the data we expect from the Excel sheet.
// This will help in ensuring that the data read from the Excel file matches our expectations and can be used effectively in our tests.
// export type LoginData = {
//     email: string;
//     password: string;
//     expected: string;
//     run: string;
// }

// Function to read data from an Excel file and return it as an array of LoginData objects.
export function readExcel(filePath: string, sheetName: string): any[]{

    const fullPath = path.resolve(filePath);
    console.log('Full Path is ', fullPath);

    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet) as any[];
    return data;
}