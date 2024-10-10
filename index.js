const express = require('express');
const dotenv =  require('dotenv');
const morgan = require('morgan');
const ApiError = require('./utils/ApiError');
const globalErrorHandler = require('./middlewares/errorMiddleware')
dotenv.config({path: './config.env'});

const connectToDatabase = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');

// starting the app and connecting to database
const app = express();
connectToDatabase();


// MIDDLEWARES
if(process.env.NODE_env == "development"){
    app.use(morgan('dev'))
}
app.use(express.json())



//routing
app.use('/api/v1/category', categoryRoute);

app.all('*', (req,res,next)=>{

    const {originalUrl} =req;
    let message = `the URL you asked for: ${originalUrl} is not found`; 
    let statuscode = 404;
    next(new ApiError(message , statuscode));
})



// global Error Handling middleware
app.use(globalErrorHandler)


// unhandled Errors middleware
process.on("unhandledRejection", async (err)=>{
    console.log(err);
    console.log("Server Is shutting down");
    await server.close();
    process.exit(1);
})


// Starting the server
const PORT = process.env.PORT ;
const server = app.listen(PORT, ()=>{
    console.log(`Started listening on port ${PORT}`);
})