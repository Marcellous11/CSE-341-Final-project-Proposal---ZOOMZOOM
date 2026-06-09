import { rateLimit } from 'express-rate-limit'

// Limit for login and registration attempts
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // limit each IP to 15 attempts per 15 minutes
    message: {
        error: 'Too many authentication attempts from this IP. Please try again after 15 minutes.'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// General API limit to prevent general Denial of Service (DoS)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per 15 minutes
    message: {
        error: 'Too many requests from this IP. Please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
})

export { authLimiter, apiLimiter }
