import "dotenv/config";
import connectDB from "./config/db.config.js";
import { app } from "./app.js";




connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(` Server is running at port : ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGO db conneection failed !!!",err); 
    
})