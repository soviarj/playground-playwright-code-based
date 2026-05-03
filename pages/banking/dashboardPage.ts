import { Locator, Page } from "@playwright/test";

export class DashboardPage {
    
    readonly page: Page;
    readonly totalBalance: Locator;
    readonly accountsCount: Locator;
    readonly transactionsCount: Locator;
    readonly quickAddAcount: Locator;
    readonly roleIndicator: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.totalBalance = page.getByTestId('total-balance');
        this.accountsCount = page.getByTestId('accounts-count');
        this.transactionsCount = page.getByTestId('transactions-count');
        this.quickAddAcount = page.getByTestId('quick-add-account');
        this.roleIndicator = page.locator('[data-testid="role-indicator"]');
        
    }

    getButton(name: string) {
        const buttons = {
            ADD_ACCOUNT: this.quickAddAcount,
        } as const;

        return buttons[name as keyof typeof buttons];
    }
}