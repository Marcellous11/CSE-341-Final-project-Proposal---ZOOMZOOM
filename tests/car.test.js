import { jest } from '@jest/globals';
import { app } from '../server.js'
import request from 'supertest'

describe('Test getAll for cars', () => {
    it('Returns a 200 status', async () => {
        const res = await request(app).get('/car/')
        console.log(res)
        expect(res.statusCode).toBe(200)
    });
})