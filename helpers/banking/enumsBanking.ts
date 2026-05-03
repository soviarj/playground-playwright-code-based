export const mandatoryFields = {
  Savings: {
    accountName: "Testing Account - Savings",
    accountType: "Savings Account",
    initialBalance: "10000"
  },

  Checking: {
    accountName: "Testing Account - Checking",
    accountType: "Checking Account",
    initialBalance: "23000"
  },

  Credit_Card: {
    accountName: "Testing Account - Credit Card",
    accountType: "Credit Card",
    initialBalance: "7500"
  }

} as const;

export type AccountType = 'Savings' | 'Checking' | 'Credit';