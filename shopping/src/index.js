import express  from 'express'
import { PORT } from './config/index.js'
import dataBase from './database/index.js'
import expressApp from './expressApp.js'

const StartServer = async () => {
    const app = express();

    await dataBase();

    await expressApp(app)
    
    app.listen(PORT, () => {
        console.log(`listing to port ${PORT}`)
    })
    .on('error', (err) => {
       console.log(err)
       process.exit()
    })
}

StartServer()