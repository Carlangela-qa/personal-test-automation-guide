import { BasePage } from './manage/basePage';
import { Page, Locator, expect } from '@playwright/test'

export class LoginPage extends BasePage {
    readonly page: Page;
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
        await this.basePageGoTo('/auth/login');
    }

    async login(email: string, password: string) {
        await this.basePageFill(this.emailInput, email);
        await this.basePageFill(this.passwordInput, password);
        await this.basePageClick(this.loginButton);
    }

    async verifyLoginSuccess() {
        await this.basePageExpectVisible(this.salesTitle);
    }

    async verifyInvalidLoginAlert() {
        await this.basePageExpectVisible(this.invalidLoginAlert);
    }

    async clickUserButton() {
        await this.basePageClick(this.profileButton);
        await this.basePageExpectVisible(this.userButton);
    }

    async clickLogoutButton() {
        await this.basePageClick(this.logoutButton);
        await this.basePageExpectVisible(this.loginButton);
    }
}