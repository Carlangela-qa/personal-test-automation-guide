import { BasePage } from './manage/basePage';
import { Page, Locator, expect } from '@playwright/test'
import { APIRequestContext } from "@playwright/test";

export async function getProducts(request: APIRequestContext): Promise<any> {
    const response = await request.get('https://api.practicesoftwaretesting.com/products', {
        params: {
            "page": 1,
            "between": "price,1,100",
            "is_rental": false
        },
    });
    const data = await response.json();
    return data;

    //test7891011
}

export class HomePage extends BasePage {
    readonly page: Page;
    readonly item: (id: string) => Locator;
    readonly productName: Locator;
    readonly addToCartButton: Locator;
    readonly cartButton: Locator;
    readonly header: Locator;
    readonly loginButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly salesTitle: Locator;
    readonly invalidLoginAlert: Locator;
    readonly userButton: Locator;
    readonly profileButton: Locator;
    readonly logoutButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.item = (id: string) => page.locator(`a[data-test="product-${id}"]`);
        this.productName = page.locator('h1[data-test="product-name"]');
        this.addToCartButton = page.locator('#btn-add-to-cart');
        this.cartButton = page.locator('a[data-test="nav-cart"]');
        this.header = page.locator('h1');
        this.loginButton = page.locator('input[value="Login"]');
        this.emailInput = page.getByPlaceholder('Your email');
        this.passwordInput = page.getByPlaceholder('Your password');
        this.salesTitle = page.locator('h1', { hasText: 'Sales over the years' });
        this.invalidLoginAlert = page.locator('div[data-test="login-error"]');
        this.userButton = page.locator('ul[class="dropdown-menu show"]');
        this.profileButton = page.locator('#menu');
        this.logoutButton = page.locator('a[data-test="nav-sign-out"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async goto() {
        await this.basePageGoTo('/');
    }

    async selectProduct() {
        const response = await getProducts(this.page.request);
        const product = response.data[0];
        const id = product.id;
        const productName = product.name;
        await this.basePageClick(this.item(id));
        await this.basePageExpectText(this.productName, productName);
    }

    async addToCart() {
        await this.basePageClick(this.addToCartButton);
        await this.basePageWaitFor(this.cartButton);
    }



}