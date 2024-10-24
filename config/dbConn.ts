import mongoose, { Mongoose } from "mongoose";
import { variables } from "./envLoader";
import logger from "../utils/logger";

class Database{
    static instance:Mongoose
    static async createConnection(){
        const {DB_NAME,DB_URL}=variables

        const dbConnURL = DB_URL;
        const dbName = DB_NAME as string;

        try{
            const connectionInstance = await mongoose.connect(dbConnURL, {
                autoIndex: true,
                dbName,
              });
              console.log("Database Connection Established");
        
              Database.instance = connectionInstance;
        }
        catch(error){
            logger?.error(error);
            logger?.error(`Error connecting to db`);
        }
    }
}

export default Database