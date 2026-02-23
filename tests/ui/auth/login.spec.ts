import {test} from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';

test.describe('Login Feature', () => {

    test('@smoke Valid user can log in successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('practice', 'SuperSecretPassword!');
        await loginPage.assertLoginSuccess();
    });

    test('@regression Invalid user cannot log in', async ({page}) => {
        const logingPage = new LoginPage(page);

        await logingPage.goto();
        await logingPage.login('wrongUser', 'WrongPassword');
        await logingPage.assertLoginFailure();
    });

});