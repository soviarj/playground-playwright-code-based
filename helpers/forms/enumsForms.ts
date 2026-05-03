import { FormsLocators } from "../pages/formsPageLocators";

export const fieldConfig = {
    'Email': {
        key: 'email',
        value: (data: any) => data.emailInput.invalid,
        errorLocator: FormsLocators.errors.errorEmail
    },
    'Phone Number': {
        key: 'phone',
        value: (data: any) => data.phoneInput.invalid,
        errorLocator: FormsLocators.errors.errorPhone
    },
    'Password': {
        key: 'password',
        value: (data: any) => data.passwordInput.short,
        errorLocator: FormsLocators.errors.errorPassword
    },
    'Confirm Password': {
        key: 'confirmPassword',
        value: (data: any) => data.confirmPasswordInput.mismatch,
        errorLocator: FormsLocators.errors.errorConfirmPassword
    }   
} as const;

export type Field = keyof typeof fieldConfig;