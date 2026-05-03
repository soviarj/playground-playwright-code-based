import { Page } from "@playwright/test";
import { FormsLocators } from "./formsPageLocators";

export class FormsPage {
    constructor(private page: Page) {}

    async fillForm(formData: any, overrides: any = {}) {
        const data = {
            email: formData.emailInput.valid,
            phone: formData.phoneInput.valid,
            password: formData.passwordInput.valid,
            confirmPassword: formData.confirmPasswordInput.valid,
            ...overrides
        };

        await this.page.locator(FormsLocators.firstNameInput).fill(formData.firstNameInput);
        await this.page.locator(FormsLocators.lastNameInput).fill(formData.lastNameInput);
        await this.page.locator(FormsLocators.emailInput).fill(data.email);
        await this.page.locator(FormsLocators.phoneInput).fill(data.phone);
        await this.page.locator(FormsLocators.dobInput).fill(formData.dobInput);
        await this.page.locator(FormsLocators.maleGenderRadio).check();
        await this.page.locator(FormsLocators.countrySelect).click();
        await this.page.locator(FormsLocators.countryOptionUSA).click();
        await this.page.locator(FormsLocators.cityInput).fill(formData.cityInput);
        await this.page.locator(FormsLocators.bioTextarea).fill(formData.bioTextarea);
        await this.page.locator(FormsLocators.playwrightCheckbox).check();
        await this.page.locator(FormsLocators.passwordInput).fill(data.password);
        await this.page.locator(FormsLocators.confirmPasswordInput).fill(data.confirmPassword);
        await this.page.locator(FormsLocators.termsCheckbox).check();
    
    }
}