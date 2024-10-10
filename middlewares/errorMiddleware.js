const globalErrorHandler = (err,req,res,next)=>{
    console.log(err.statusCode , err.message);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    if(process.env.ENV == "production"){
        productionErrorHandler(err,res)
    } else {
        developmentErrorHandler(err,res)
    } 
}


const developmentErrorHandler = (err,res)=>{
    res.status(err.statusCode).json({
        status : err.status ,
        statusCode : err.statusCode ,
        error : err ,
        message : err.message , 
        stack : err.stack ,
    })
}

const productionErrorHandler = (err,res)=>{
    res.status(err.statusCode).json({
        status : err.status ,
        statusCode : err.statusCode ,
        message : err.message , 
    })
}
module.exports = globalErrorHandler ;