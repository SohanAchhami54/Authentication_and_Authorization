      class Errorhandler extends Error{
         constructor(message,statusCode){
            super(message); 
            //here "this" is error object we are creating right now
            this.statusCode=statusCode; //store this value inside error object 
         }
      }

      const errorMiddleware=(err,req,res,next)=>{
         err.statusCode=err.statusCode || 500 
         err.message=err.message || "Internal Error"
         console.log('err:',err)

         if(err.name==="CastError"){
            const message=`Invalid ${err.path}`
            err= new Errorhandler(message,400)
         } 

         if(err.name==="JsonWebTokenError"){
            const message='Json Web Token is invalid, Try Again'
            err= new Errorhandler(message,400)
         }  
         
         if(err.name==="TokenExpiredError"){
            const message='Json Web Token is Expired, Try Again'
            err= new Errorhandler(message,400)
         }

             

         //err.keyValue is an object showing which field is duplicate.
         //err.keyValue = { email: "sohan@example.com" }
         //Object.keys(err.keyValue) → Gets the field name that caused the duplicate.
         if(err.code===11000){         
            const message=`Duplicate ${Object.keys(err.keyValue)} Entered`
            err=new Errorhandler(message,400)
         }

         return res.status(err.statusCode).json({
            success:false,
            message:err.message
         });
      }


      export {Errorhandler,errorMiddleware}