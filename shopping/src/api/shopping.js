import ShoppingService  from "../services/shoppingService.js"
import { PublishCustomerEvent } from "../utils/index.js";
import  UserAuth from './middlewares/auth.js'
import { CUSTOMER_SERVICE } from '../config/index.js'

export default (app, channel) => {
    
    const service = new ShoppingService();

    //SubscribeMessage(channel, service)

    app.post('/order',UserAuth, async (req,res,next) => {
        const { _id } = req.user;
        const { txnId } = req.body;
      try {
        console.log("txnNumber", txnId)
        const { data } = await service.PlaceOrder({_id, txnId});
       console.log("data", data)
        const payload = await service.GetOrderPayload(_id, data, 'CREATE_ORDER')

        PublishCustomerEvent(payload)
        ///PublishMessage(channel,CUSTOMER_SERVICE, JSON.stringify(payload))

        return res.status(200).json(data);
      } catch (err) {
        //next(err)
      }

    });

    app.get('/orders',UserAuth, async (req,res,next) => {

        const { _id } = req.user;

        try {

        const { data } = await service.GetOrders(_id);
        
        return res.status(200).json(data);
    } catch (err) {
        //next(err)
      }

    });

    // app.put('/cart',UserAuth, async (req,res,next) => {

    //     const { _id } = req.user;
    //     console.log("_id", _id)
    //     console.log("req.body._id", req.body._id)
    //   try {
    //     const { data } = await service.AddToCart(_id, req.body._id);
    //     return res.status(200).json(data);
    //   } catch (err) {
    //     //next(err)
    //   }

    // });

    // app.delete('/cart/:id',UserAuth, async (req,res,next) => {
    //     const { _id } = req.user;
    //   try {
    //     const { data } = await service.AddToCart(_id, req.body._id);
    //    return res.status(200).json(data);
    //   } catch (err) {
    //     //next(err)
    //   }
    // });
    
    app.get('/cart', UserAuth, async (req,res,next) => {
        const { _id } = req.user;
        try {
        const { data } = await service.GetCart({ _id });
        return res.status(200).json(data);
        } catch (err) {
           // next(err)
          }
    });

    app.get('/whoami', (req,res,next) => {
        return res.status(200).json({msg: '/shoping : I am Shopping Service'})
    })
 
}