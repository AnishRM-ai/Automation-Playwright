import {Page} from '@playwright/test';

export async function goTo(page: Page, path:string) {
    await page.goto(path);
}