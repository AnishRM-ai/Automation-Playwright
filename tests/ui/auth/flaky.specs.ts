import { test, expect } from '@playwright/test';
import { FlakyPage } from '../../../pages/FlakyPage';

test.describe('Flaky test automation', () => {
    test('should get Ready text after exactly 3 reloads', async ({ page }) => {
        const flakypage = new FlakyPage(page);
        await flakypage.goto();
        
        // Verify initial state shows Attempt 1
        const initialAttempt = await flakypage.getCurrentAttempt();
        expect(initialAttempt).toBe(1);
        console.log('Initial state verified: Attempt 1');
        
        // Method 1: Simple - reload exactly 3 times
        await flakypage.reloadUntilReady();
        
        // Verify final state
        expect(await flakypage.isReady()).toBe(true);
        
        // Optional: Verify we can see the Ready text
        await expect(page.getByText('Ready')).toBeVisible();
    });

    test('should track attempt numbers increasing', async ({ page }) => {
        const flakypage = new FlakyPage(page);
        await flakypage.goto();
        
        // Track attempts through reloads
        for (let i = 1; i <= 3; i++) {
            const attemptNumber = await flakypage.getCurrentAttempt();
            console.log(`Before reload ${i}: Attempt ${attemptNumber}`);
            
            await flakypage.reload();
            await page.waitForTimeout(500);
        }
        
        // After 3 reloads, should be Ready
        expect(await flakypage.isReady()).toBe(true);
        await expect(page.getByText('Ready')).toBeVisible();
    });

    test('should use flexible reload method', async ({ page }) => {
        const flakypage = new FlakyPage(page);
        await flakypage.goto();
        
        // This will reload until it sees "Ready" (max 5 attempts)
        await flakypage.reloadUntilReadyFlexible();
        
        await expect(page.getByText('Ready')).toBeVisible();
    });
});