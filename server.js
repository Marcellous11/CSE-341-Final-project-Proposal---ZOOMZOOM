import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {router} from './routes/index.js'
import {ConnectDatabase,closeDatabase} from './data/db.js'
import passport from 'passport'
import session from 'express-session'
import githubPassport from 'passport-github2'

const GitHubStrategy = githubPassport.Strategy

const app = express()
let port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())
app.set('trust proxy', 1); 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(router)


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL:process.env.CALL_BACK_URL
},
function(accessToken,refreshToken,profile,done){
    return done(null,profile)
}
))

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)   
})

app.get("/",(req,res) => {
    res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}` : "Logged Out") 
})

app.get("/github/callback",passport.authenticate("github",{
    failureRedirect: `/api-docs`,session:false
}),
(req,res)=>{
    req.session.user = req.user;
    res.redirect("/")
}
)

app.use((req,res,next)=>{
    const error = new Error("Page not found")
    error.status = 404
    next(error) 
})

app.use((err,req,res,next)=>{
    console.log(err)
    const status = err.status || 500
    res.status(status).json({error:err.message})
})

export { app }

ConnectDatabase().then(()=>{
    app.listen(port,()=>{
        console.log(`Connected at port ${port}`)
    })
}).catch((err)=>{
    console.log(`Start up failure. ${err}`)
    process.exit(1)

})

async function gracefulShutdown(){
    console.log('Shuting down...')
    //need to close db here
    await closeDatabase()
    process.exit(0)
}

process.on('SIGINT',gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)