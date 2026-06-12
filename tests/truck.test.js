const request = require('supertest');


describe('GET alltruck - Retrieve All Items', () => {
  it('should return a 200 status', async () => {
    const truck = '../controllers/truck';

    const response = await request(truck).get('getAllTrucks()');

    // 2. Assert: Check status code
    expect(response.status).toBe(200);

  });
});