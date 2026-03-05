import {Page, expect, Locator} from '@playwright/test';
import { goTo} from '../utils/navigation';

export class ForgotPasswordPage{
    readonly page: Page;
    readonly emailInput: Locator;
    readonly submitBtn: Locator;
    readonly successMsg: Locator;
    readonly invaliderrorMsg: Locator;

    constructor(page:Page){
        this.page = page;
        this.emailInput = page.locator('#email');
        this.submitBtn = page.getByRole('button', {name:'Retrieve password'});
        this.successMsg = page.getByText('An e-mail has been sent to you which explains how to reset your password.');
        this.invaliderrorMsg = page.getByText('Please enter a valid email address.');
    }

    async goto(){
        await goTo(this.page, '/forgot-password');
    };

    async fillEmail(email: string){
        await this.emailInput.fill(email);
        await this.submitBtn.click();
    };

    async assertSuccess(){
        await expect(this.successMsg).toBeVisible();
    };

    async invalidMesg(){
        await expect(this.invaliderrorMsg).toBeVisible();
    };

};