const mongoose = require('mongoose');
const { getAllTrucks, getOneTruck } = require('./truck.js');
const { getTruckModel } = require('../data/db.js');

// Mock dependencies
jest.mock('../data/db.js');

describe('Truck Controller Tests', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            params: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            setHeader: jest.fn()
        };

        jest.clearAllMocks();
    });

    // ===== getAllTrucks =====
    describe('getAllTrucks', () => {
        it('should return all trucks with status 200', async () => {
            const mockTrucks = [{ name: 'Truck1' }, { name: 'Truck2' }];

            getTruckModel.mockResolvedValue({
                find: jest.fn().mockResolvedValue(mockTrucks)
            });

            await getAllTrucks(req, res);

            expect(getTruckModel).toHaveBeenCalled();
            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockTrucks);
        });

        it('should handle errors and return 400', async () => {
            getTruckModel.mockRejectedValue(new Error('DB error'));

            await getAllTrucks(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled();
        });
    });

    // ===== getOneTruck =====
    describe('getOneTruck', () => {
        it('should return 400 for invalid ObjectId', async () => {
            req.params.id = 'invalid-id';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(false);

            await getOneTruck(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith('Must use a valid ID.');
        });

        it('should return 404 if truck not found', async () => {
            req.params.id = '507f1f77bcf86cd799439011';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);

            getTruckModel.mockResolvedValue({
                findById: jest.fn().mockResolvedValue(null)
            });

            await getOneTruck(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith('This truck is not found in the database.');
        });

        it('should return a truck with status 200', async () => {
            const mockTruck = { name: 'Truck1' };
            req.params.id = '507f1f77bcf86cd799439011';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);

            getTruckModel.mockResolvedValue({
                findById: jest.fn().mockResolvedValue(mockTruck)
            });

            await getOneTruck(req, res);

            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockTruck);
        });

        it('should handle errors and return 400', async () => {
            req.params.id = '507f1f77bcf86cd799439011';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);

            getTruckModel.mockRejectedValue(new Error('DB error'));

            await getOneTruck(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled();
        });
    });
});