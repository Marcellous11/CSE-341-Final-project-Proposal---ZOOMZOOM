import { jest } from '@jest/globals'
import { app } from '../server.js'
import { ConnectDatabase, closeDatabase } from '../data/db.js'
import request from 'supertest'

beforeAll(async () => {
    await ConnectDatabase()
})

afterAll(async () => {
    await closeDatabase()
})

describe('Test getAll for cars', () => {
    it('Returns a 200 status', async () => {
        const res = await request(app).get('/car/')
        expect(res.statusCode).toBe(200)
    })
})

describe('Test getById for cars', () => {
    it('Returns a 200 status', async () => {
        const res = await request(app).get(`/car/6a22454bcd3370fe157f560d`)
        expect(res.statusCode).toBe(200)
    })

    it('Returns a 400 status for an invalid id', async () => {
        const res = await request(app).get('/car/not-a-valid-id')
        expect(res.statusCode).toBe(400)
    })

    it('Returns a 404 status when the car is not found', async () => {
        // Well-formed ObjectId that does not exist in the database.
        const res = await request(app).get('/car/000000000000000000000000')
        expect(res.statusCode).toBe(404)
    })
})

