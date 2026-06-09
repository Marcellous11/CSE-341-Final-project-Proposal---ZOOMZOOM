import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getUserModel } from '../data/db.js'

const SALT_ROUNDS = 10

// Strip the hashed password out before sending a user back to the client.
function sanitize(user) {
    return {
        _id: user._id,
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        favorite_vehicle: user.favorite_vehicle,
        created_at: user.created_at
    }
}

async function registerUser(req, res, next) {
    /* #swagger.tags=['Users'] */
    /* #swagger.summary = 'Create a new account. Password is hashed with bcrypt before storage.' */
    try {
        const userModel = await getUserModel()

        const existing = await userModel.findOne({ user_name: req.body.user_name })
        if (existing) {
            return res.status(409).json('That username is already taken.')
        }

        const hashedPassword = await bcrypt.hash(req.body.user_password, SALT_ROUNDS)

        const user = {
            user_name: req.body.user_name,
            user_password: hashedPassword,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            favorite_vehicle: req.body.favorite_vehicle
        }

        const response = await userModel.create(user)

        if (response && response._id) {
            res.status(201).json(sanitize(response))
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the user.' })
        }
    } catch (err) {
        next(err)
    }
}

async function loginUser(req, res, next) {
    /* #swagger.tags=['Users'] */
    /* #swagger.summary = 'Log in with a username and password. On success a session is created.' */
    try {
        const userModel = await getUserModel()

        const user = await userModel.findOne({ user_name: req.body.user_name })
        if (!user) {
            return res.status(401).json('Invalid username or password.')
        }

        const passwordMatches = await bcrypt.compare(req.body.user_password, user.user_password)
        if (!passwordMatches) {
            return res.status(401).json('Invalid username or password.')
        }

        const sanitizedUser = sanitize(user)
        // Sign a JWT the client sends back as `Authorization: Bearer <token>`.
        const token = jwt.sign(sanitizedUser, process.env.SESSION_SECRET, { expiresIn: '24h' })

        res.status(200).json({
            message: 'Logged in successfully.',
            token: token,
            user: sanitizedUser
        })
    } catch (err) {
        next(err)
    }
}

async function logoutUser(req, res, next) {
    /* #swagger.tags=['Users'] */
    /* #swagger.summary = 'Log out. JWTs are stateless, so the client should discard its token.' */
    /* #swagger.security = [{ "BearerAuth": [] }] */
    res.status(200).json('Logged out successfully. Please discard your token.')
}

async function getProfile(req, res, next) {
    /* #swagger.tags=['Users'] */
    /* #swagger.summary = 'Get the currently logged-in user. Requires authentication.' */
    /* #swagger.security = [{ "BearerAuth": [] }] */
    try {
        const userModel = await getUserModel()
        const user = await userModel.findOne({ user_name: req.user.user_name })

        if (!user) {
            return res.status(404).json('User not found.')
        }

        res.status(200).json(sanitize(user))
    } catch (err) {
        next(err)
    }
}

export { registerUser, loginUser, logoutUser, getProfile }
