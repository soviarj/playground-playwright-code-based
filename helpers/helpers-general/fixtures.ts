import { test as base } from 'playwright/test';
import { LoginPage } from '../../pages/banking/loginPage';
import { DashboardPage } from '../../pages/banking/dashboardPage';
import { AccountsPage } from '../../pages/banking/accountsPage';
import { MenuPage } from '../../pages/banking/menuPage';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  accountsPage: AccountsPage;
  menuPage: MenuPage;
  contextData: {
    accNo?: string;
    listedAcc?: string;
  }
};

export const test = base.extend<Fixtures>({
  
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  accountsPage: async ({ page }, use) => {
    await use(new AccountsPage(page));
  },

  menuPage: async ({ page }, use) => {
    await use(new MenuPage(page));
  },

  contextData: async ({}, use) => {
    await use({});
  },

});

export { expect } from '@playwright/test';