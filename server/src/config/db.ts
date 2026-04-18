import mongoose from 'mongoose';
import "dotenv/config";

const dbUrl:string= process.env.DB_URL || "";
const connectDB = async () => {
    try{
        await mongoose.connect(dbUrl).then((data:any)=>{
            console.log(`Mongodb connected with server: ${data.connection.host}`);
   })
    }catch(error){
        console.log(`Error: ${error}`);
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;

