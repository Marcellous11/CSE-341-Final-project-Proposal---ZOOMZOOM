import {Router} from 'express'
import {carRoutes} from './car.js'
import {userRoutes} from './user.js'
import {truckRoutes} from './truck.js'
import { suvRoutes } from './suv.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json' with {type:"json"}
import passport from 'passport'

const router = Router()

router.use('/api-docs',swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))

router.use("/user", userRoutes)
router.use("/car",carRoutes)
router.use("/truck",truckRoutes)
router.use("/suv",suvRoutes)

router.get("/login",passport.authenticate('github'),(req,res)=>{})

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if (err){return next(err)}
        res.redirect("/")
    })
})
export {router}
