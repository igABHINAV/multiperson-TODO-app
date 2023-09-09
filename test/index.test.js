const request = require("supertest");
const app = require("../app"); // Import your Express app

describe('POST /user/login', function () {
    it('responds with json and success message', function (done) {
        request(app) // Create a request using your Express app
            .post('/user/login') // Send a POST request to the /user/login endpoint
            .send({ username: 'admin', password: 'admin' }) // Send request body with username and password
            .expect(200) // Expect a 200 status code in the response
            .expect('Content-Type', /json/) // Expect a JSON response
            .expect(res => {
                // Add custom assertions based on your application's response
                const { body } = res;
                if (!body || !body.message || body.message !== 'Login successful') {
                    throw new Error('Expected "Login successful" message in response');
                }
            })
            .end(done); // End the request and call the done() callback to complete the test
    });
});
