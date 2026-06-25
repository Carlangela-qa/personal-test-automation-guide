// BasePage stores Playwright `Page` instance. Class is protected, so only extending classes can access it.
import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
    constructor(protected readonly page: Page) { }

    /* ─────────── Navigation ─────────── */
    /** Navigate to a specific URL path. */
    protected async basePageGoTo(path: string) {
        await this.page.goto(path, { waitUntil: 'commit' });
    }

    protected async basePageWaitForData(selector: string | Locator, context?: string) {
        await this.toLocator(selector).first().waitFor({ state: 'visible', timeout: 60000 });
        const rowCount = await this.toLocator(selector).count();
        expect(rowCount).toBeGreaterThan(0);
    }

    protected async basePageWaitFor(
        selector: string | Locator, 
        options: { state?: 'attached' | 'detached' | 'visible' | 'hidden'; timeout?: number } = {}
    ) {
        await this.toLocator(selector).waitFor({ 
            state: options.state || 'visible', 
            timeout: options.timeout || 30000 
        });
    }

    /* ── Low-level helpers (protected) ── */
    protected async basePageClick(selector: string | Locator, context?: string) {
        await this.toLocator(selector).click();
    }

    protected async basePageFill(selector: string | Locator, value: string, context?: string) {
        if (value === undefined || value === null) {
            console.warn(`[basePageFill] Skipping fill - value is ${value}`);
            return;
        }
        
        await this.toLocator(selector).click();
        await this.toLocator(selector).fill(String(value));
    }

    protected async basePageExpectVisible(selector: string | Locator) {
        //await this.page.waitForTimeout(9000); // Wait for 9000ms (9 seconds) to allow the page to stabilize
        await expect(this.toLocator(selector)).toBeVisible();
    }

    protected async basePageExpectText(selector: string | Locator, text: string) {
        await expect(this.toLocator(selector)).toContainText(text);
    }

    protected async basePageNewPage(selector: string | Locator): Promise<Page> {
        // We expect a new page to open after clicking some element.
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            await this.toLocator(selector).click(),
        ]);
        await newPage.bringToFront();
        await newPage.waitForLoadState('domcontentloaded');
        await newPage.waitForLoadState('networkidle');
        return newPage;
    }

    protected async basePageCheck(selector: string | Locator) {
        await this.toLocator(selector).check();
    }

    protected async basePageUncheck(selector: string | Locator) {
        await this.toLocator(selector).uncheck();
    }

    /* ───────────── Added in lesson/01-fixtures ────────────── */
    /** Quick helper for tests:
     * If you need a quick selector in a .spec test file
     * This will keep `page` protected but lets grab elements without adding a dedicated method for every page.
     */
    public locator(selector: string | Locator): Locator {
        return this.toLocator(selector);
    }

    /* ───────────── Utility ───────────── */
    /** Cast a string selector or Locator-like object to a Locator. */
    protected toLocator(selector: string | Locator): Locator {
        return typeof selector === 'string'
            ? this.page.locator(selector)   // string → Locator
            : selector;                     // already a Locator
    }

}