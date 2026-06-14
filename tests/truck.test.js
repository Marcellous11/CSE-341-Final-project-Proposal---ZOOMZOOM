import { app } from '../server.js'
import { ConnectDatabase, closeDatabase } from '../data/db.js'
import request from 'supertest'

beforeAll(async () => {
    await ConnectDatabase()
})

afterAll(async () => {
    await closeDatabase()
})

describe('Test getAll for trucks', () => {
    it('Returns a 200 status', async () => {
        const res = await request(app).get('/truck/')
        expect(res.statusCode).toBe(200)
    })

    it('Returns an array of trucks', async () => {
        const res = await request(app).get('/truck/')
        expect(Array.isArray(res.body)).toBe(true)
    })
})

describe('Test getById for trucks', () => {
    it('Returns a 200 status', async () => {
        const res = await request(app).get(`/truck/6a22458ecd3370fe157f561f`)
        expect(res.statusCode).toBe(200)
    })

    it('Returns a 400 status for an invalid id', async () => {
        const res = await request(app).get('/truck/not-a-valid-id')
        expect(res.statusCode).toBe(400)
    })

    it('Returns a 404 status when the truck is not found', async () => {
        // Well-formed ObjectId that does not exist in the database.
        const res = await request(app).get('/truck/000000000000000000000000')
        expect(res.statusCode).toBe(404)
    })
})

