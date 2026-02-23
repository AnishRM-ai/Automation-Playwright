import {Page, Locator, expect } from '@playwright/test';
import { goTo } from '../utils/navigation';
export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page){
        this.page = page;

        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.successMessage = page.getByText('You logged into a secure area!');
        this.errorMessage = page.getByText('Your username is invalid!');
    }

    async goto() {
        await goTo(this.page, '/login');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async assertLoginSuccess() {
        await expect(this.successMessage).toBeVisible();
    }

    async assertLoginFailure() {
        await expect(this.errorMessage).toBeVisible();
    }
}