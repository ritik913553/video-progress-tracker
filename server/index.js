import "dotenv/config";
import connectDB from "./config/db.config.js";
import { app } from "./app.js";
import path from "path";


// ----------------code for deployment------------------
if (process.env.NODE_ENV === "production") {
    const dirPath = path.resolve();
    app.use(express.static("./client/dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(dirPath, "./client/dist", "index.html"));
    });
  }



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(` Server is running at port : ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGO db conneection failed !!!",err); 
    
})