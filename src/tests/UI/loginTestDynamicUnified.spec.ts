import { test, expect } from '../../fixtures/fixtures';
import { readData } from '../../utils/dataReader';

//const testData = readData('./src/test-data/loginData.json');
//const testData = readData('./src/test-data/LoginData.csv');
const testData = readData('./src/test-data/LoginData.xlsx', 'Sheet1');

test.describe('Login Tests', () => {

    for (const data of testData) {

        // if (data.run !== 'yes') continue;

        test(`Login test for - ${data.email}`, async ({ pom }) => {

            test.skip(data.run !== 'yes');

            await test.step('Go to login page', async () => {
                await pom.LoginPage.goto();
            });

            await test.step('Perform Login', async () => {
                await pom.LoginPage.login(data.email, data.password);
            });

            await test.step('Validate Result', async () => {
                if (data.expected === 'success') {
                    await pom.LoginPage.verifyLoginSuccess();
                    await pom.LoginPage.clickUserButton();
                    await pom.LoginPage.clickLogoutButton();
                } else {
                    await pom.LoginPage.verifyInvalidLoginAlert();
                }
            });
        });
    }

});