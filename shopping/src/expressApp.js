import express from 'express'
import cors from 'cors'
import Shopping from './api/shopping.js'
import appEvents from './api/appEvents.js'
import HandleErrors from './utils/errorHandler.js'
import path from 'path';
const __dirname = path.resolve();

export default async app => {
    app.use(express.json({limit:'1mb'}))
    app.use(express.urlencoded({extended:true, limit:'1mb'}))
    app.use(cors())
    app.use(express.static(__dirname+'/public'))
    appEvents(app)
    Shopping(app)

    app.use(HandleErrors)
}