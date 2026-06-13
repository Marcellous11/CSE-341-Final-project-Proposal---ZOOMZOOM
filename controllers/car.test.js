const mongoose = require('mongoose');
const { getAllCars, getOneCar } = require('./car.js');
const { getCarModel } = require('../data/db.js');

// Mock dependencies
jest.mock('../data/db.js');

describe('Car Controller Tests', () => {
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

    // ===== getAllCars =====
    describe('getAllCars', () => {
        it('should return all trucks with status 200', async () => {
            const mockCars = [{ name: 'Car1' }, { name: 'Car2' }];

            getCarModel.mockResolvedValue({
                find: jest.fn().mockResolvedValue(mockCars)
            });

            await getAllCars(req, res);

            expect(getCarModel).toHaveBeenCalled();
            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCars);
        });

        it('should handle errors and return 400', async () => {
            getCarModel.mockRejectedValue(new Error('DB error'));

            await getAllCars(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled();
        });
    });

    // ===== getOneCar =====
    describe('getOneCar', () => {
        it('should return 400 for invalid ObjectId', async () => {
            req.params.id = 'invalid-id';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(false);

            await getOneCar(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith('Must use a valid ID.');
        });

        it('should return 404 if car not found', async () => {
            req.params.id = '507f1f77bcf86cd799439011';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);

            getCarModel.mockResolvedValue({
                findById: jest.fn().mockResolvedValue(null)
            });

            await getOneCar(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith('This car is not found in the database.');
        });

        it('should return a car with status 200', async () => {
            const mockCar = { name: 'Car1' };
            req.params.id = '507f1f77bcf86cd799439011';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);

            getCarModel.mockResolvedValue({
                findById: jest.fn().mockResolvedValue(mockCar)
            });

            await getOneCar(req, res);

            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCar);
        });

        it('should handle errors and return 400', async () => {
            req.params.id = '507f1f77bcf86cd799439011';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);

            getCarModel.mockRejectedValue(new Error('DB error'));

            await getOneCar(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled();
        });
    });
});