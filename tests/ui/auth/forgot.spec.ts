import {test} from '@playwright/test';
import { ForgotPasswordPage } from '../../../pages/ForgotPasswordPage.ts';

test.describe('Forgot password functionality test', () => {
    test('User should get email code upon proceeding with forgot password link.', async ({page}) => {
        const forgotPage = new ForgotPasswordPage(page);
        await forgotPage.goto();
        await forgotPage.fillEmail('radom@gmail.com');
        await forgotPage.assertSuccess();
    });

    test('Invalid email should be showned error', async({page}) => {
        const forgotPage = new ForgotPasswordPage(page);
        await forgotPage.goto();
        await forgotPage.fillEmail('adgmail.com');
        await forgotPage.invalidMesg();
    });
});