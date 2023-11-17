import ShoppingService from '../services/shoppingService.js';

export default (app) => {
    const service = new ShoppingService()
    app.use('/app-events', async (req, res, next) => {
        const { payload } = req.body
        service.SubscribeEvents(payload);
        console.log("payload", payload)
        console.log("=========Shopping service recieved events=======");
        return res.status(200).json(payload)
    })
}