// ManagePage acts as a central hub for all page objects in the app.
// It uses lazy getters to create each page object only when needed.
// This saves resources in large test suites, as unused pages are not built.
// For small projects, you could create all page objects up front instead.

import { Page } from '@playwright/test';
import { LoginPage } from '../loginPage';
import { HomePage } from '../homePage';

export default class ManagePage {
    constructor(private readonly page: Page) { }

    // private caches (undefined until first access)
    private _login?: LoginPage;

    // Lazy getter: creates the page object only on first use, then reuses it.
    get LoginPage(): LoginPage {
        return this._login ??= new LoginPage(this.page);
    }

    get HomePage(): HomePage {
        return new HomePage(this.page);
    }

}
