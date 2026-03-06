import { Page, Locator } from '@playwright/test';
import { goTo } from '../utils/navigation';

export class FlakyPage {
    readonly page: Page;
    readonly statusText: Locator;

    constructor(page: Page){
        this.page = page;
        this.statusText = page.getByText(/Error: Attempt \d+|Ready/i); // Matches both patterns
    }

    async goto(): Promise<void> {
        await goTo(this.page, '/flaky-test');
    }

    async reload(): Promise<void> {
        await this.page.reload({ waitUntil: 'networkidle' });
    }

    async getCurrentAttempt(): Promise<number> {
        const text = await this.statusText.textContent();
        if (!text) return 0;
        
        const match = text.match(/Attempt (\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }

    async isReady(): Promise<boolean> {
        const text = await this.statusText.textContent();
        return text?.includes('Ready') ?? false;
    }

    /**
     * Reload exactly 3 times as specified in the note
     */
    async reloadUntilReady(): Promise<void> {
        console.log('Starting flaky test. Current status:', await this.statusText.textContent());
        
        // Reload exactly 3 times as per the note
        for (let attempt = 1; attempt <= 3; attempt++) {
            await this.reload();
            console.log(`After reload ${attempt}:`, await this.statusText.textContent());
            
            // Small delay to ensure page updates (optional)
            await this.page.waitForTimeout(500);
        }
        
        // Verify we finally see "Ready"
        if (!(await this.isReady())) {
            throw new Error('Page did not show "Ready" after 3 reloads');
        }
        
        console.log('Success! Page is ready.');
    }

    /**
     * Alternative: Reload until we see "Ready" (more flexible)
     */
    async reloadUntilReadyFlexible(maxAttempts: number = 5): Promise<void> {
        let attempts = 0;
        
        while (!(await this.isReady()) && attempts < maxAttempts) {
            console.log(`Attempt ${attempts + 1}:`, await this.statusText.textContent());
            await this.reload();
            attempts++;
            await this.page.waitForTimeout(500);
        }
        
        if (!(await this.isReady())) {
            throw new Error(`Ready text not found after ${maxAttempts} attempts`);
        }
        
        console.log(`Success! Ready found after ${attempts} reloads`);
    }
}