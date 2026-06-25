import { test, expect } from '../../fixtures/fixtures';
import { getProducts } from '../../pages/homePage';

test('Purchase Tests', async ({ pom }) => {
    await pom.HomePage.goto();
    await pom.HomePage.selectProduct();
    await pom.HomePage.addToCart();
});