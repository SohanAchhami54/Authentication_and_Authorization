 class Errorhandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}

const errorMiddleware=((err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Error";
    //console.log(err); 

    if(err.name==="CastError"){
        const message= `Invalid ${err.path}`;
        err=new Errorhandler(message,400);
    }

    if(err.name==="JsonWebTokenError"){
        const message=`Json Web Token is Invalid`;
        err=new Errorhandler(message,400);
    }
    if(err.name==="TokenExpiredError"){
        const message="Json Web Token is Expired";
        err=new Errorhandler(message,400);
    }
     
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err=new Errorhandler(message,400);
    }
    return res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
});
module.exports={
    Errorhandler,
    errorMiddleware,
}