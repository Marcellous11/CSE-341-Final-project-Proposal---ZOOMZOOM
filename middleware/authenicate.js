import jwt from 'jsonwebtoken'

const isAuthenticated = (req, res, next) => {
    // Require a JWT bearer token in the Authorization header.
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json("You do not have access.")
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.SESSION_SECRET)
        req.user = decoded
        return next()
    } catch (err) {
        return res.status(401).json("Invalid or expired token.")
    }
}

export {isAuthenticated}
