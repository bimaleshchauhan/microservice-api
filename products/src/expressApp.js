import express from 'express'
import cors from 'cors'
import HandleErrors from './utils/errorHandler.js'
import path from 'path';
import Product from './api/products.js'
import appEvents from './api/appEvents.js';
const __dirname = path.resolve();

export default async app => {
    app.use(express.json({limit:'1mb'}))
    app.use(express.urlencoded({extended:true, limit:'1mb'}))
    app.use(cors())
    app.use(express.static(__dirname+'/public'))

    appEvents(app)
    Product(app)

    app.use(HandleErrors)
}