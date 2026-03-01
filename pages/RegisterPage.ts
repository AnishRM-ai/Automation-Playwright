import { Page, Locator, expect } from '@playwright/test';
import { goTo } from '../utils/navigation';

export class RegisterPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPassword: Locator;
    readonly registerbtn: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;
    readonly invalidMessage: Locator;
    readonly existingMessage: Locator;

    constructor(page: Page){
        this.page = page;

        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.locator('#password');
        this.confirmPassword = page.locator('#confirmPassword');
        this.registerbtn = page.getByRole('button', {name:'Register'});
        
        this.successMessage = page.getByText('Successfully registered, you can log in now.');
        this.errorMessage = page.getByText('An error occurred during registration. Please try again.');
        this.invalidMessage = page.getByText('All fields are required.');
        this.existingMessage = page.getByText('Username is already taken.')
    };

    async goTo(){
        await goTo(this.page, '/register');
    };

    async register(username: string, password: string, confirmPassword:string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPassword.fill(confirmPassword);
        await this.registerbtn.click();
    };

    async assertSuccessMsg(){
        await expect(this.successMessage).toBeVisible()
    }

    async assertEmptyFieldErr(){
        await expect(this.invalidMessage).toBeVisible();
    }

    async assertInvalidMsg(){
        await expect(this.errorMessage).toBeVisible();
    };

    async assertAlreadyTakenMsg(){
        await expect(this.existingMessage).toBeVisible();
    }

};