import { Locator, Page } from "@playwright/test";

export class MenuPage {
    
    readonly page: Page;
    readonly dashboardButton: Locator;
    readonly accountsButton: Locator;
    readonly transactionsButton: Locator;
    readonly viewrBadge: Locator;
    readonly roleIndicator: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.dashboardButton = page.getByTestId('nav-dashboard');
        this.accountsButton = page.getByTestId('nav-accounts');
        this.transactionsButton = page.getByTestId('nav-transactions');
        this.viewrBadge = page.locator('[data-testid="viewer-badge"]');
        this.roleIndicator = page.locator('[data-testid="role-indicator"]');
        
    }

    async clickOnMenuButton(button: string) {
        const buttons = {
            Dashboard: this.dashboardButton,
            Accounts: this.accountsButton,
            Transactions: this.transactionsButton
        } as const;
        
        const btn = buttons[button as keyof typeof buttons];
        await btn.click()
    }
}