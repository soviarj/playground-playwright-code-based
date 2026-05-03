import { Locator, Page } from "@playwright/test";
import { BANK_URL } from "../../general-helpers/constants";

export class LoginPage {
    
    readonly page: Page;
    readonly userInput: Locator;
    readonly passInput: Locator;
    readonly loginButton: Locator;
    readonly toggleButton: Locator;
    readonly loginAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userInput = page.getByTestId('username-input');
        this.passInput = page.getByTestId('password-input');
        this.loginButton = page.getByTestId('login-button');
        this.toggleButton = page.getByTestId('toggle-password-btn');
        this.loginAlert = page.getByTestId('login-alert');
    }

    async navigateToLogingPage(url: string) {
        await this.page.goto(url)
    }

    async fillUserCredentials(user: string, passwd: string) {
        await this.userInput.fill(user);
        await this.passInput.fill(passwd);
    }

    getButton(name: string) {
        const buttons = {
            LOGIN: this.loginButton,
            TOGGLE: this.toggleButton,
        } as const;

        return buttons[name as keyof typeof buttons];
    }

}