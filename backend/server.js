import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js"
import colors from "colors"
import path from "path";
import productRoutes from "./routes/productRoutes.js"
import userRouters from "./routes/userRouters.js"
import filterRouters from "./routes/filterRouters.js"
import dialogFlowRouters from "./routes/dialogFlowRouters.js"
import getNewCritiquedProductRoutes from "./routes/getNewCritiquedProductRoutes.js"
import interactionTrackRouters from "./routes/interactionTrackRouters.js"
import {notFound,errorHandler} from "./middlewares/errorMiddleware.js"
import morgan from 'morgan'
import compression from "compression"
import helmet from "helmet" 

dotenv.config()
connectdb();

const app = express()

// app.use(helmet());
// app.use(compression()); //Compress all routes

app.use(express.json())
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.get('/', (req,res)=>{
    res.send("API is runing")
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRouters)
app.use('/api/filters',filterRouters)
app.use('/api/dialogflow',dialogFlowRouters)
app.use('/api/critique', getNewCritiquedProductRoutes)
app.use('/api/interactions', interactionTrackRouters)

const __dirname = path.resolve();
// app.use("/static", express.static(path.join(__dirname, "images")));
app.use("/staticL", express.static(path.join(__dirname, "images_L_amazon_uk")));


app.use(notFound)
app.use(errorHandler)

// node default ports is 3000
const PORT = process.env.PORT || 5001


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.underline.bold))



