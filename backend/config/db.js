import mongoose from "mongoose"

const connectdb = async () => {
    try {

        var DB_URI = ""

        if(process.env.NODE_ENV === "development"){
            DB_URI = process.env.MONGO_URI_DEVELOPMENT
        } else{
            DB_URI = process.env.MONGO_URI_PRODUCTION
        }
        
        const conn = await mongoose.connect(DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold)
    }catch(error){
        console.log(`Error: ${error}`.red.underline.bold)
        process.exit(1)
    }
    
}

export default connectdb;

