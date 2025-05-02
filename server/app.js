import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorHandlerMiddleware from './middleware/errorHandler.middleware.js'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true,limit:"16kb"})); 
app.use(express.static("public"))
app.use(cookieParser());


//routes import
import userRouter from './routes/user.routes.js';
import videoRouter from './routes/video.routes.js';
import progressRouter from './routes/progress.routes.js';

//routes declaration

app.use("/api/v1/users",userRouter);
app.use("/api/v1/videos",videoRouter);
app.use("/api/v1/progress",progressRouter);

// Log all registered routes (move this after all routes are registered)



app.use(errorHandlerMiddleware);

export {app}










































