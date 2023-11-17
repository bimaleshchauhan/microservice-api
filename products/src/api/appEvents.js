import ProductService from '../services/productService.js';

export default (app) => {
    const service = new ProductService()
    app.use('/app-events', async (req, res, next) => {
        const { payload } = req.body
        service.SubscribeEvents(payload);

        console.log("=========Product service recieved events=======");
        return res.status(200).json(payload)
    })
}