import { expect, Locator, Page } from "@playwright/test";
import { AccountType, mandatoryFields } from "../helpers/enums";
import { AccountsLocators } from "./accountsPageLocators";

export class AccountsPage {
    
    constructor(private page: Page) {}

    getButton(name: keyof typeof AccountsLocators.updateAccountButtons) {
        const selector = AccountsLocators.updateAccountButtons[name];

        if (!selector) {
        throw new Error(`Button "${name}" does not exist`);
        }

        return this.page.locator(selector).first();
    }

    async fillMandatoryFields(type: keyof typeof mandatoryFields) {
        const data = mandatoryFields[type];

        await this.page.locator(AccountsLocators.accountNameInput).fill(data.accountName);
        await this.page.locator(AccountsLocators.accountTypeSelector).click();

        const accountTypeLocator = this.page.locator(AccountsLocators.accountTypeSelected(data.accountType));
        await accountTypeLocator.click();
        await this.page.locator(AccountsLocators.initialBalance).fill(data.initialBalance);

    }

    getAccountType(accType: string) {
        const map = {
            Savings: "Savings",
            Checking: "Checking",
            Credit: "Credit",
        } as const;

        const accountType = map[accType as keyof typeof map];

        if (!accountType) {
            throw new Error(`Account type "${accType}" does not exist`);
        }

        return accountType;
    }

    async selectAccountType(accType: string) {
        await this.page.locator(AccountsLocators.accountTypeFilter).click();
        const selectedOption = this.getAccountType(accType);
        await this.page.locator(AccountsLocators.accountTypeSelected(selectedOption)).click();
        
    }

    async verifyOtherAccountTypesNotVisible(accType: AccountType) {
        const accountMap = {
            Savings: this.page.locator(AccountsLocators.typeChips).getByText('Savings'),
            Checking: this.page.locator(AccountsLocators.typeChips).getByText('Checking'),
            Credit: this.page.locator(AccountsLocators.typeChips).getByText('Credit'),
        } as const;

        for (const [type, locator] of Object.entries(accountMap)) {
            if (type !== accType) {
                await expect(locator).toHaveCount(0);
            }
    }
    
}

}