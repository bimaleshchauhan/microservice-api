import mongoose from 'mongoose'
import { DB_URL, DBNAME} from '../config/index.js'

export default async () => {
    console.log("DB_URL", DB_URL)
    try {
        await mongoose.connect(`${DB_URL}/${DBNAME}`);
        console.log('Connected successfully to server');
        return "connected"
    } catch (err) {
        console.log(`${err} did not connect`)
        return "failed"
    }
}