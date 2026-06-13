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

describe('Test getAll for suvs', () => {
    it('Returns a 200 status', async () => {
        const res = await request(app).get('/user/')
        expect(res.statusCode).toBe(200)
    })
})
