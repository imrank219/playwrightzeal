// tests/api.spec.js
const { test, expect } = require('@playwright/test');

test.describe('API Testing with Playwright (JavaScript)', () => {
  test('should fetch a list of items successfully', async ({ request }) => {
    // Send GET request using Playwright’s built-in request context
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    // Check status code
    expect(response.status()).toBe(200);

    // Parse response body as JSON
    const data = await response.json();

    // Validate the response payload
    expect(data).toHaveProperty('id', 1);
    expect(data).toHaveProperty('title');
    console.log(data);
  });



  test('should handle a POST request', async ({ request }) => {
    const postData = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    // Send POST request
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: postData,
    });

    // Validate response status
    expect(response.status()).toBe(201);

    // Validate response body
    const responseBody = await response.json();
    expect(responseBody).toMatchObject(postData);
    expect(responseBody).toHaveProperty('id');
  });
});
