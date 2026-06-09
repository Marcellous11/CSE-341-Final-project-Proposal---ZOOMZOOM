import {Router} from 'express'
import {carRoutes} from './car.js'
import {truckRoutes} from './truck.js'
import {userRoutes} from './user.js'
import { suvRoutes } from './suv.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json' with {type:"json"}

const router = Router()

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', (req, res, next) => {
    const host = req.get('host')
    const protocol = req.protocol // e.g. 'http' or 'https'
    
    const dynamicSwaggerDocument = {
        ...swaggerDocument,
        host: host,
        schemes: [protocol]
    }
    swaggerUi.setup(dynamicSwaggerDocument)(req, res, next)
})

router.use("/car",carRoutes)
router.use("/truck",truckRoutes)
router.use("/user",userRoutes)
router.use("/suv",suvRoutes)

export {router}
