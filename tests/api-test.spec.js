const { test, expect } = require("@playwright/test")
const { Ajv } = require("ajv");
const exp = require("constants");

const ajv = new Ajv()
test('Test Case 1', async ({request}) => {
   
    const response = await request.get('https://api.restful-api.dev/objects/7');
    expect(response.status()).toBe(200) //test 200ms

    const responseData = await response.json()
    expect(responseData.id).toBe("7") // 7 string bukan integer
    expect(responseData.name).toBe("Apple MacBook Pro 16") //string
    expect(responseData.data.year).toBe(2019) //2019 int bukan string
    expect(responseData.data["CPU model"]).toBe("Intel Core i9") 
    //https://www.liquid-technologies.com/online-json-to-schema-converter (PAKE INI BUAT CEK)

    const valid = ajv.validate(require('./jsonschema/get-object-schema.json'), responseData)
    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
    }
    expect(valid).toBe(true);
    //cara baca: 
    //1) ajv(json validator) melakukan validasi dari "responseData",
    //2) yang di valdiasi melalui file "get-object-schema.json" pada folder "jsconschema"
    //NOTE: const valid berfungsi HANYA RETURN TRUE OR FALSE (TEST),
    //jika error AJV Validation Errors
    //jika valid = true atau benar (sesuai dengan schema)
});


test('Test Case 2', async ({ request }) => {
   
    const bodyData = {
            "name": "Laptop DS Batch 7",
            "data": {
               "year": 2019,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }
         }

    const headerData = {
        Accept: 'application/json'
    }

    const response = await request.post('https://api.restful-api.dev/objects', {
        headers: headerData,
        data: bodyData
    })

    expect(response.status()).toBe(200) //test 200ms
    expect(response,ok()).toBeTruthy() //boolean (kalau 200 ok, kalau 400 false).
});



// test("Test Case 3", ( ) => {
    
// });