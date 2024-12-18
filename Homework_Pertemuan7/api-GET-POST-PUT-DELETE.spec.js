const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const ajv = new Ajv();

test('GET', async ({ request }) => {
    const headerData = {
        "Accept": "application/json",
    };

    const response = await request.get('https://reqres.in/api/users/2', { headers: headerData });
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    expect(responseData.data.id).toBe(2);
    expect(responseData.data.email).toBe("janet.weaver@reqres.in");
    expect(responseData.data.first_name).toBe("Janet");
    expect(responseData.data.last_name).toBe("Weaver");

    const valid = ajv.validate(require('./Jsonschema/gethomework-object-schema.json'), responseData);
    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
    }
    expect(valid).toBe(true);
});

test('POST', async ({ request }) => {
    const bodyData1 = {
        "name": "morpheus",
        "job": "leader"
    };

    const headerData1 = {
        Accept: 'application/json'
    };

    const response = await request.post('https://reqres.in/api/users', {
        headers: headerData1,
        json: bodyData1
    });

    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    const responseData = await response.json();
    responseData.name = bodyData1.name;
    responseData.job = bodyData1.job;

    expect(responseData).toHaveProperty('id');
    expect(responseData).toHaveProperty('createdAt');
    expect(responseData).toHaveProperty('name');
    expect(responseData).toHaveProperty('job');

    const valid = ajv.validate(require('./Jsonschema/posthomework-object-schema.json'), responseData);
    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
    }
    expect(valid).toBe(true);
});

test('PUT ', async ({ request }) => {
    const bodyData2 = {
        "name": "morpheus",
        "job": "zion resident"
    };

    const headerData2 = {
        "Accept": "application/json",
    };

    const response = await request.put('https://reqres.in/api/users/2', { headers: headerData2 });
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    responseData.name = bodyData2.name;
    responseData.job = bodyData2.job;

    expect(responseData).toHaveProperty('updatedAt');
    expect(responseData).toHaveProperty('name');
    expect(responseData).toHaveProperty('job');

    const valid = ajv.validate(require('./Jsonschema/puthomework-object-schema.json'), responseData);
    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
    }
    expect(valid).toBe(true);
});

test('DELETE', async ({ request }) => {
    const headerData4 = {
        "Accept": "application/json",
    };

    const response = await request.delete('https://reqres.in/api/users/2', { headers: headerData4 });
    expect(response.status()).toBe(204);
});

