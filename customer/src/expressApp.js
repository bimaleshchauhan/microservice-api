import express from 'express'
import cors from 'cors'
import Users from './api/users.js'
import HandleErrors from './utils/errorHandler.js'
import path from 'path';
import AppEvents from './api/appEvents.js'
const __dirname = path.resolve();

export default async app => {
    app.use(express.json({limit:'1mb'}))
    app.use(express.urlencoded({extended:true, limit:'1mb'}))
    app.use(cors())
    app.use(express.static(__dirname+'/public'))
    // listen to Events
    AppEvents(app);
    //api
    Users(app);

    app.use(HandleErrors)
}