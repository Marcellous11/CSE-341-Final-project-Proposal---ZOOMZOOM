import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title : "Zoom Zoom",
        description: "An API that gives users access to 4 different vehicle types. " +
            "Accounts are created with a username and password (passwords are hashed " +
            "with bcrypt). Logging in returns a JWT; routes that read, create, update, " +
            "or delete data require that token in the Authorization header."
    },
    host: "cse-341-final-project-proposal-zoomzoom-iy13.onrender.com",
    schemes: ["https"],
    securityDefinitions: {
        BearerAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "JWT token for API authentication. Input format: Bearer <token>"
        }
    }
}

const outFile= "./swagger.json"
const endpointsFiles = ['./routes/index.js']

swaggerAutogen()(outFile,endpointsFiles,doc)