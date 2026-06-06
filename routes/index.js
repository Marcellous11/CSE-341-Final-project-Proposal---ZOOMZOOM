import {Router} from 'express'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json' with {type:"json"}
import passport from 'passport'

const router = Router()

router.use('/api-docs',swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))

//import truckRouter from './truck.js'
//import userRouter from './user.js'
//import suvRouter from './suv.js'
import carRouter from  './car.js'

//router.use("/truck", truckRouter)
//router.use("/user", userRouter)
//router.use("/suv", suvRouter)
router.use("/car", carRouter)

router.get("/login",passport.authenticate('github'),(req,res)=>{})

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if (err){return next(err)}
        res.redirect("/")
    })
})
export {router}
