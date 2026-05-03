export const AccountsLocators = {

    updateAccountButtons: {
        EDIT: '[data-testid^="edit-account-id"]',
        DELETE: '[data-testid^="delete-account-id"]',
        CANCEL: '[data-testid="cancel-delete-button"]',
        CONFIRM_DELETE: '[data-testid="confirm-delete-button"]',
    },
    accountNameInput: '[data-testid^="account-name-input"]',
    accountTypeSelector: '[data-testid^="account-type-select"]',
    accountTypeSelected: (name: string) => `role=option[name="${name}"]`,
    initialBalance: '[data-testid^="initial-balance-input"]',
    activeStatus: '[data-testid^="status-active-radio"]',
    inactiveStatus: '[data-testid^="status-inactive-radio"]',
    overdraftCheckbox: '[data-testid^="overdraft-checkbox"]',
    saveAccountButton: '[data-testid^="save-account-button"]',
    successAccountMessage: '[data-type="success"]',
    accountTitle: '[data-testid="account-name"]',
    accountNumber: '[data-testid="account-number"]',
    errorMessageAccountName: '[id="account-name-error"]',
    errorMessageAccountType: '[id="account-type-error"]',
    errorMessageValidBalance: '[id="initial-balance-error"]',
    typeChips: '[id^="account-type-badge-id"]',
    filteredAccounsSummary: '[data-testid^="summary-filtered-accounts"]',
    accountTypeFilter: '[data-testid^="filter-type-select"]',
    resetAccountsFilter: '[data-testid^="reset-filters-button"]',

} as const;