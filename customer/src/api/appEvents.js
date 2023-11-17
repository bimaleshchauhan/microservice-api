import CustomerService from '../services/userService.js';

export default (app) => {
    const service = new CustomerService()
    app.use('/app-events', async (req, res, next) => {
        const { payload } = req.body
        service.SubscribeEvents(payload);

        console.log("=========shopping service recieved events=======");
        return res.status(200).json(payload)
    })
}