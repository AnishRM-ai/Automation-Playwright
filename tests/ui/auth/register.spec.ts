import { test } from '@playwright/test';
import { RegisterPage } from '../../../pages/RegisterPage';

test.describe('Register Feature', () => {
    test('User should be successfully register with all credentials', async ({page}) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goTo();
        await registerPage.register('practice123', 'SuperSecretPassword!', 'SuperSecretPassword!');
        await registerPage.assertSuccessMsg();
    });

    test('Invalid message should be displayed for empty fields.', async({page}) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goTo();
        await registerPage.register('jackson','','' );
        await registerPage.assertEmptyFieldErr();
    });

    test('User already exists.', async ({page}) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goTo();
        await registerPage.register('practice', 'SuperSecretPassword!', 'SuperSecretPassword!');
        await registerPage.assertAlreadyTakenMsg();
    });
})