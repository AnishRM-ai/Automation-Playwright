import { test, expect } from '@playwright/test';

test.describe('Auth API', () => {

    test('Valid login return success message', async({ request }) => {
        const response = await request.post('/api/login', {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                username: 'practice',
                password: 'SuperSecretPassword!'
            }
        });
        console.log('Status: ', response.status());

        const contentType = response.headers()['content-type'];
        console.log('CONTENT-TYPE: ', contentType);

        const bodyText = await response.text();
        console.log('Body Text: ', bodyText);


        const body = JSON.parse(bodyText);
        console.log('Body: ', body);
        // expect(response.status()).toBe(200);
        expect(body.message).toContain('You logged into a secure area!');
    });

    test('Invalid login returns error', async({request}) => {
        const response = await request.post('/api/login', {
            headers:{
                'Accept': 'application/json',
            },
            data:{
                username: 'wrongUser',
                password: 'wrongPassword'
            }
        });

           const body = await response.json();
        expect(response.status()).toBe(404);

     
        expect(body).toContain('Your username is invalid!');
    });
});