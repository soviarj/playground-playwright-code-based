import { FORMS_URL } from "../helpers/helpers-general/constants";
import { test, expect } from '../helpers/helpers-general/fixtures';
import { formData } from '../helpers/forms/formData';
import { FormsLocators } from "../pages/forms/formsPageLocators";
import { fieldConfig, Field } from "../helpers/forms/enumsForms";

test.beforeEach(async ({ page }) => {
    await test.step('The user is navigated to the forms page', async () => {
        await page.goto(FORMS_URL);
    });
});

test.describe('Filling Forms Test Scenarios @forms @regress', () => {

    test('[TC-FORMS-01] Fill All Fields In The Form With Valid Data And Submit It @smoke', async ({ formsPage, page }) => {
        
        await test.step('The user fills in all fields with valid data', async () => {
            await formsPage.fillForm(formData);
            await page.waitForTimeout(1000); // Wait for form to be processed before submitting
            await page.locator(FormsLocators.submitFormBtn).click();
        });

        await test.step('The form is submitted successfully', async () => {
            await expect(page.locator(FormsLocators.successIcon)).toBeVisible();
        });        
    });

    test('[TC-FORMS-02] Verify required field error messages appear on empty submit @smoke', async ({ page }) => {
        
        await test.step('The user submits empty form', async () => {
            await page.waitForTimeout(1000); // Wait for form to be fully loaded
            await page.locator(FormsLocators.submitFormBtn).click();  
        });

        await test.step('The required field error messages are displayed', async () => {
            await expect.soft(page.locator(FormsLocators.errors.errorFirstName)).toBeVisible({timeout: 2000});
            await expect.soft(page.locator(FormsLocators.errors.errorLastName)).toBeVisible();
            await expect.soft(page.locator(FormsLocators.errors.errorEmail)).toBeVisible();
            await expect.soft(page.locator(FormsLocators.errors.errorPhone)).toBeVisible();
            await expect.soft(page.locator(FormsLocators.errors.errorDob)).toBeVisible();
            await expect.soft(page.locator(FormsLocators.errors.errorGender)).toBeVisible();
            await expect.soft(page.locator(FormsLocators.errors.errorCountry)).toBeVisible();
            await expect.soft(page.locator(FormsLocators.errors.errorCity)).toBeVisible();
            await expect.soft(page.locator(FormsLocators.errors.errorPassword)).toBeVisible();
            await expect.soft(page.locator(FormsLocators.errors.errorConfirmPassword)).toBeVisible();
            await expect.soft(page.locator(FormsLocators.errors.errorTerms)).toBeVisible();
        });        
    });

    for (
        const [field, data] of Object.entries(fieldConfig) as [
            Field, 
            typeof fieldConfig[Field]
        ][]
    ) {
        test(`[TC-FORMS-03] Verify invalid field format shows validation error message for ${field} field`, async ({ page, formsPage }) => {
            
            await test.step(`The user fills the form with invalid "${field}" format and submits it`, async () => {
                const config = fieldConfig[field];
                await formsPage.fillForm(formData, {[config.key]: config.value(formData)});
                await page.locator(FormsLocators.submitFormBtn).click();
            });

            await test.step(`The appropriate validation error message is displayed for "${field}" field`, async () => {
                const config = fieldConfig[field];
                await expect(page.locator(config.errorLocator)).toBeVisible({timeout: 2000});
            });
        });
    }
});