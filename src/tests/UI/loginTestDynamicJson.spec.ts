import { test, expect } from '../../fixtures/fixtures';
import loginData from '../../test-data/loginData.json';

// test.describe('Practice Software Testing Tests', () => {

//   test('Login after each test', async ({ pom }) => {
//     await pom.LoginPage.goto();
//     await pom.LoginPage.login(process.env.email!, process.env.password!);
//     await pom.LoginPage.verifyLoginSuccess();
//     await pom.LoginPage.clickUserButton();
//     await pom.LoginPage.clickLogoutButton();
//   });

// });

test.describe('Practice Dynamic DDT Tests', () => {
  loginData.forEach((data) => {

    if (!data.run) return;

    test(`Login Test - ${data.email}`, async ({ pom }) => {

      await pom.LoginPage.goto();
      await pom.LoginPage.login(data.email, data.password);

      if (data.expected === 'success') {
        await pom.LoginPage.verifyLoginSuccess();
        await pom.LoginPage.clickUserButton();
        await pom.LoginPage.clickLogoutButton();
      } else {
        await pom.LoginPage.verifyInvalidLoginAlert();
      }

    });
  });
});