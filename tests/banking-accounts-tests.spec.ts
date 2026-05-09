import { ADMIN_PWD, ADMIN_USER, BANK_URL, VIEWER_PWD, VIEWER_USER, WRONG_PWD, WRONG_USER } from "../helpers/helpers-general/constants";
import { test, expect } from '../helpers/helpers-general/fixtures';
import { AccountsLocators } from '../pages/banking/accountsPageLocators';
import { mandatoryFields, AccountType } from '../helpers/banking/enumsBanking';

// This beforeEach is used to navigate to the homepage and log in before each test in this file.
test.beforeEach(async ({ loginPage}) => { 

    await test.step('The user is navigated to the bank homepage', async () => {
        await loginPage.navigateToLogingPage(BANK_URL);
    });

    await test.step('The Admin User logs in with correct Credentials', async () => {
            await loginPage.fillUserCredentials(ADMIN_USER, ADMIN_PWD);
            await loginPage.loginButton.click();
    });
});

test.describe('Accounts Page Test Scenarios @accounts @banking', () => {

    // This loop creates a test for each account type defined in the mandatoryFields object. 
    // It uses the data from that object to fill in the account creation form and verify that the account was created successfully.
    for (const [type, data] of Object.entries(mandatoryFields) as 
        [AccountType, typeof mandatoryFields[AccountType]][]) 
    {
        test(`[TC-ACC-01] Create A New ${type} Account @regress @smoke`, async ({ page, dashboardPage, accountsPage }) => {
            await test.step('The user is redirected to the Dashboard Page', async () => {
                await expect(dashboardPage.totalBalance).toBeVisible();
            });

            await test.step('The user opens the create account form', async () => {
                const btn = dashboardPage.getButton('ADD_ACCOUNT');
                await btn.click();
            });

            await test.step('The user fills in the account details and saves the form', async () => {
                await accountsPage.fillMandatoryFields(type);
                await page.locator(AccountsLocators.saveAccountButton).click();
            });

            await test.step(`The new account ${type} is created successfully`, async () => {
                await expect(page.locator(AccountsLocators.successAccountMessage)).toBeVisible();
                const account = page.locator(AccountsLocators.accountTitle).filter({ hasText: data.accountName });
                await expect(account).toHaveCount(1);
            });
        });
    }

    test('[TC-ACC-02] Create New Account Is Not Possible Without Filling Mandatory Fields @regress', async ({ page, dashboardPage }) => {
        await test.step('The user is redirected to the Dashboard Page', async () => {
            await expect(dashboardPage.totalBalance).toBeVisible();
        });

        await test.step('The user opens the create account form', async () => {
            const btn = dashboardPage.getButton('ADD_ACCOUNT');
            await btn.click();
        });

        await test.step('The user tries to save the form only with optional fields filled in', async () => {
            await page.locator(AccountsLocators.inactiveStatus).click();
            await page.locator(AccountsLocators.overdraftCheckbox).click();
            await page.locator(AccountsLocators.saveAccountButton).click();
        });

        await test.step('The system writes error messages under the empty mandatory fields', async () => {
            await expect(page.locator(AccountsLocators.errorMessageAccountName)).toBeVisible();
            await expect(page.locator(AccountsLocators.errorMessageAccountType)).toBeVisible();
            await expect(page.locator(AccountsLocators.errorMessageValidBalance)).toBeVisible();
        });
    });

    test('[TC-ACC-03] Edit Account Name With Edit Button @regress @smoke', async ({ page, menuPage, accountsPage }) => {
        await test.step('The user navigates to the Accounts Page', async () => {
            await menuPage.clickOnMenuButton('Accounts');
            await expect(page.locator(AccountsLocators.updateAccountButtons.EDIT).first()).toBeVisible();
        });

        await test.step('The user updates the account name', async () => {
            const btn = accountsPage.getButton('EDIT');
            await btn.click();
            await page.locator(AccountsLocators.accountNameInput).fill('Updated Account Name')
            await page.keyboard.press('Enter')
        });

        await test.step('Verify the account is updated', async () => {
            await expect(page.locator(AccountsLocators.successAccountMessage)).toBeVisible()
            const account = page.locator(AccountsLocators.accountTitle).filter({ hasText: 'Updated Account Name' });
            await expect(account).toHaveCount(1);
        });
    });

    test('[TC-ACC-04] Delete Account And Verify It Is Removed @regress @smoke', async ({ page, menuPage, accountsPage, contextData }) => {
        
        const deleteButton = accountsPage.getButton('DELETE');
        const cancelButton = accountsPage.getButton('CANCEL');
        const confirmButton = accountsPage.getButton('CONFIRM_DELETE');

        await test.step('The user navigates to the Accounts Page', async () => {
            await menuPage.clickOnMenuButton('Accounts');
            await expect(page.locator(AccountsLocators.updateAccountButtons.EDIT).first()).toBeVisible();
        });

        await test.step('Selecting account number for deletion', async () => {
            contextData.accNo = await page.locator(AccountsLocators.accountNumber).first().innerText();
        });

        await test.step('Cancelling the deletion', async () => {
            await deleteButton.click();
            await cancelButton.click();
        });

        await test.step('Confirming the deletion', async () => {
            await deleteButton.click();
            await confirmButton.click();
        });

        await test.step('Verifying the account is deleted', async () => {
            await expect(page.locator(AccountsLocators.successAccountMessage)).toBeVisible({timeout : 2000});
            await expect(page.locator(AccountsLocators.successAccountMessage)).toBeHidden({timeout : 10000});
            await expect(page.locator(AccountsLocators.accountNumber).filter({ hasText: contextData.accNo })).toHaveCount(0);
        });
    });

    for (const [type, data] of Object.entries(mandatoryFields) as 
        [AccountType, typeof mandatoryFields[AccountType]][]) 
    {
        test(`[TC-ACC-05] Filter Accounts by Type ${type} @regress @smoke`, async ({ page, dashboardPage, accountsPage, menuPage, contextData }) => {
            await test.step('The user is redirected to the Dashboard Page', async () => {
                await expect(dashboardPage.totalBalance).toBeVisible();
            });

            await test.step('Creating all account types', async () => {
                const types = Object.keys(mandatoryFields) as (keyof typeof mandatoryFields)[];

                for (const type of types) {
                    await menuPage.dashboardButton.click();
                    const btn = dashboardPage.getButton('ADD_ACCOUNT');
                    await btn.click();
                    await accountsPage.fillMandatoryFields(type);
                    await page.locator(AccountsLocators.saveAccountButton).click();
                    await page.waitForTimeout(300)
                }
            });

            await test.step('Checking number of accounts listed on the page', async () => {
                contextData.listedAcc = await page.locator(AccountsLocators.filteredAccounsSummary).textContent() || '';
            });

            await test.step(`Selecting account ${type} type`, async () => {
                await accountsPage.selectAccountType(type);
            });

            await test.step(`Verification that only ${type} type accounts are listed`, async () => {
                await accountsPage.verifyOtherAccountTypesNotVisible(type);
                const accountChips = accountsPage.getAccountType(type)
                const accountType = page.locator(AccountsLocators.typeChips).getByText(accountChips);
                const count = await accountType.count();
                expect(count).toBeGreaterThan(0);
            });

            await test.step('Reseting filter', async () => {
                await page.locator(AccountsLocators.resetAccountsFilter).click();
            });

            await test.step('Verification all accounts type are visible after filterreset', async () => {
                const numberOfListedAccounts = await page.locator(AccountsLocators.filteredAccounsSummary).textContent() || '';
                expect(contextData.listedAcc).toEqual(numberOfListedAccounts);
            });
        });
    }

});