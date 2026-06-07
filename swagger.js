import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title : "Zoom Zoom",
        description: "An API that gives users access to 4 different vehicle types."
    },
    host: "cse-341-final-project-proposal-zoomzoom-iy13.onrender.com",
    schemes: ["https"]
}

const outFile= "./swagger.json"
const endpointsFiles = ['./routes/index.js']

swaggerAutogen()(outFile,endpointsFiles,doc)