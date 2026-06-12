import { app } from '../server.js'
import { ConnectDatabase, closeDatabase } from '../data/db.js'
import request from 'supertest'

// Shared across describe blocks so the id created below can be reused.
let truckId

const newTruck = {
    make: 'Toyota',
    model: 'Tacoma',
    year: '2022',
    miles: '15000',
    color: 'Silver',
    drive_type: '4WD',
    new: false,
    country: 'Japan'
}

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

describe('Test create for trucks', () => {
    it('Returns a 201 status and stores the new id', async () => {
        const res = await request(app)
            .post('/truck/')
            .send(newTruck)
        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('id')

        // Store the id for the getById / update / delete tests below.
        truckId = res.body.id
    })
})

describe('Test getById for trucks', () => {
    it('Returns a 200 status', async () => {
        const res = await request(app).get(`/truck/${truckId}`)
        expect(res.statusCode).toBe(200)
    })

    it('Returns the created truck object', async () => {
        const res = await request(app).get(`/truck/${truckId}`)
        expect(res.body).toHaveProperty('_id', truckId)
        expect(res.body).toHaveProperty('make', newTruck.make)
        expect(res.body).toHaveProperty('model', newTruck.model)
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

describe('Test update for trucks', () => {
    // The PUT route is guarded by isAuthenticated, so without a logged-in
    // session it returns 401. To assert a real 204 update, set up a session
    // (e.g. supertest agent + login) and send authenticated cookies here.
    it('Returns a 401 status when not authenticated', async () => {
        const res = await request(app)
            .put(`/truck/${truckId}`)
            .send({ ...newTruck, color: 'Black' })
        expect(res.statusCode).toBe(401)
    })
})

describe('Test delete for trucks', () => {
    it('Returns a 204 status', async () => {
        const res = await request(app).delete(`/truck/${truckId}`)
        expect(res.statusCode).toBe(204)
    })
})
