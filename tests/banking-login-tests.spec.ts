import { ADMIN_PWD, ADMIN_USER, BANK_URL, VIEWER_PWD, VIEWER_USER, WRONG_PWD, WRONG_USER } from "../helpers/helpers-general/constants";
import { test, expect } from '../helpers/helpers-general/fixtures';
import { AccountsLocators } from '../pages/banking/accountsPageLocators';

test.beforeEach(async ({loginPage}) => {
    await test.step('The user is navigated to the bank homepage', async () => {
        await loginPage.navigateToLogingPage(BANK_URL);
    });
});

test.describe('Banking Login Page Test Scenarios @login @banking', () => {

    test('[TC-LOGIN-01] Successful Login With Admin Credentials @smoke', async ({ loginPage, dashboardPage }) => {
        await test.step('The Admin User logs in with correct Credentials', async () => {
            await loginPage.fillUserCredentials(ADMIN_USER, ADMIN_PWD);
            await loginPage.loginButton.click();
        });

        await test.step('The user is redirected to the bank dashboard', async () => {
            await expect(dashboardPage.totalBalance).toBeVisible()
        });        
    });

    test('[TC-LOGIN-02] Failed Login Shows Error Alert For Invalid Credentials @regress', async ({ loginPage }) => {
        await test.step('The User logs in with incorrect Credentials', async () => {
            await loginPage.fillUserCredentials(WRONG_USER, WRONG_PWD);
            await loginPage.loginButton.click();
        });

        await test.step('The system generates an error alert', async () => {
            await expect(loginPage.loginAlert).toContainText('Invalid username or password. Please try again.')
        });        
    });

    test('[TC-LOGIN-03] Toggle Password Visibility @regress', async ({ loginPage }) => {
        await test.step('The User fills in Credentials', async () => {
            await loginPage.fillUserCredentials(WRONG_USER, WRONG_PWD);
        });

        await test.step('The password field type is toggled - password', async () => {
            await expect(loginPage.passInput).toHaveAttribute('type', 'password');
        });

        await test.step('The user toggles the password visibility', async () => {
            await loginPage.toggleButton.click();            
            await expect(loginPage.passInput).toHaveAttribute('type', 'text');
        });

        await test.step('The user toggles the password visibility again', async () => {
            await loginPage.toggleButton.click();            
            await expect(loginPage.passInput).toHaveAttribute('type', 'password');
        });       
    });

    test('[TC-LOGIN-04] Pressing Enter In The Password Field Submits The Login Form', async ({ page, loginPage, dashboardPage }) => {
        await test.step('The Admin User logs in with correct Credentials by pressing Enter', async () => {
            await loginPage.fillUserCredentials(ADMIN_USER, ADMIN_PWD);
            await page.keyboard.press('Enter');
        });

        await test.step('The user is redirected to the bank dashboard', async () => {
            await expect(dashboardPage.totalBalance).toBeVisible()
        });     
    });

    test('[TC-LOGIN-05] Read-Only Viewer Login Grants Restricted Access @regress', async ({ page, loginPage, dashboardPage, menuPage }) => {
        await test.step('The Read-Only User logs in with correct Credentials', async () => {
            await loginPage.fillUserCredentials(VIEWER_USER, VIEWER_PWD);
            await loginPage.loginButton.click();
        });

        await test.step('The user is redirected to the bank dashboard', async () => {
            await expect(dashboardPage.totalBalance).toBeVisible()
        });   
        
        await test.step('The Read-Only user can see the viewer badge and correct role indicator', async () => {
            await expect(menuPage.viewrBadge).toContainText('Read-only')
            await expect(menuPage.roleIndicator).toContainText('Read-only Viewer')
        });

        await test.step('The Read-Only user cannot see Edit and Delete Accounts buttons', async () => {
            await menuPage.clickOnMenuButton('Accounts');
            await expect(page.locator(AccountsLocators.updateAccountButtons.EDIT)).not.toBeVisible()
            await expect(page.locator(AccountsLocators.updateAccountButtons.DELETE)).not.toBeVisible()
        });
    });
});