import { test as base } from 'playwright-bdd';
import { LoginPage } from '../banking/pages/loginPage';
import { DashboardPage } from '../banking/pages/dashboardPage';

type Fixtures = {
  login: LoginPage;
  dashboard: DashboardPage;
  contextData: {
    accNo?: string;
    listedAcc?: string;
  }
};

export const test = base.extend<Fixtures>({
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  
  dashboard: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  contextData: async ({}, use) => {
    await use({});
  },
});