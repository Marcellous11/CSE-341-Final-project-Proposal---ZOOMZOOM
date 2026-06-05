import {Router} from 'express'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json' with {type:"json"}
import passport from 'passport'

const router = Router()

router.use('/api-docs',swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))

router.use("/truck",)
router.use("/user",)
//not sure likes will work like this, likes could be a feature of users. 
router.use("/suv",)
router.use("/car",)

router.get("/login",passport.authenticate('github'),(req,res)=>{})

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if (err){return next(err)}
        res.redirect("/")
    })
})
export {router}
