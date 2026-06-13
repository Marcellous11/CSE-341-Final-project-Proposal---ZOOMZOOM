const mongoose = require('mongoose');
const { getAllUsers, getOneUser } = require('./user.js');
const { getUserModel } = require('../data/db.js');

// Mock the model loader
jest.mock('../data/db.js');

describe('User Controller Tests', () => {
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

    // =======================
    // getAllUsers
    // =======================
    describe('getAllUsers', () => {
        it('should return all users with status 200', async () => {
            const mockUsers = [{ name: 'Alice' }, { name: 'Bob' }];

            getUserModel.mockResolvedValue({
                find: jest.fn().mockResolvedValue(mockUsers)
            });

            await getAllUsers(req, res);

            expect(getUserModel).toHaveBeenCalled();
            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUsers);
        });

        it('should return 400 on error', async () => {
            getUserModel.mockRejectedValue(new Error('DB error'));

            await getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({ message: expect.any(Error) })
            );
        });
    });

    // =======================
    // getOneUser
    // =======================
    describe('getOneUser', () => {
        it('should return 400 for invalid ObjectId', async () => {
            req.params.id = 'invalid-id';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(false);

            await getOneUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith('Must use a valid ID.');
        });

        it('should return 404 if user not found', async () => {
            req.params.id = '507f1f77bcf86cd799439011';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);

            getUserModel.mockResolvedValue({
                findById: jest.fn().mockResolvedValue(null)
            });

            await getOneUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(
                'This user is not found in the database.'
            );
        });

        it('should return a user with status 200', async () => {
            const mockUser = { name: 'Alice' };
            req.params.id = '507f1f77bcf86cd799439011';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);

            getUserModel.mockResolvedValue({
                findById: jest.fn().mockResolvedValue(mockUser)
            });

            await getOneUser(req, res);

            expect(getUserModel).toHaveBeenCalled();
            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 400 on error', async () => {
            req.params.id = '507f1f77bcf86cd799439011';

            jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);

            getUserModel.mockRejectedValue(new Error('DB error'));

            await getOneUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({ message: expect.any(Error) })
            );
        });
    });
});