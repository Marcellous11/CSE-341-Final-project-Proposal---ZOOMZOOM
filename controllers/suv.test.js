const mongoose = require('mongoose');
const { getAllSuvs, getOneSuv } = require('./suv.js');
const { getSuvModel } = require('../data/db.js');

// Mock dependencies
jest.mock('../data/db.js');

describe('Suv Controller Tests', () => {
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

    // ===== getAllSuvs =====
    describe('getAllSuvs', () => {
        it('should return all trucks with status 200', async () => {
            const mockSuvs = [{ name: 'Suv1' }, { name: 'Suv2' }];

            getSuvModel.mockResolvedValue({
                find: jest.fn().mockResolvedValue(mockSuvs)
            });

            await getAllSuvs(req, res);

            expect(getSuvModel).toHaveBeenCalled();
            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSuvs);
        });

        it('should handle errors and return 400', async () => {
            getSuvModel.mockRejectedValue(new Error('DB error'));

            await getAllSuvs(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled();
        });
    });

    // ===== getOneSuv =====
    describe('getOneSuv', () => {
        it('should return 400 for invalid ObjectId', async () => {
            req.params.id = 'invalid-id';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(false);

            await getOneSuv(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith('Must use a valid ID.');
        });

        it('should return 404 if suv not found', async () => {
            req.params.id = '507f1f77bcf86cd799439011';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);

            getSuvModel.mockResolvedValue({
                findById: jest.fn().mockResolvedValue(null)
            });

            await getOneSuv(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith('This suv is not found in the database.');
        });

        it('should return a suv with status 200', async () => {
            const mockSuv = { name: 'Suv1' };
            req.params.id = '507f1f77bcf86cd799439011';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);

            getSuvModel.mockResolvedValue({
                findById: jest.fn().mockResolvedValue(mockSuv)
            });

            await getOneSuv(req, res);

            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSuv);
        });

        it('should handle errors and return 400', async () => {
            req.params.id = '507f1f77bcf86cd799439011';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);

            getSuvModel.mockRejectedValue(new Error('DB error'));

            await getOneSuv(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled();
        });
    });
});