import  ShoppingRepository  from "../database/controller/Shopping.js";
import { FormateData } from "../utils/index.js"

// All Business logic will be here
class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async GetCart({ _id }){
    const cartItems = await this.repository.Cart(_id);
    return FormateData(cartItems);
  }

  async PlaceOrder(userInput) {
    console.log("userInput", userInput)
    const { _id, txnId } = userInput;
    // Verify the txn number with payment logs
    try {
      const orderResult = await this.repository.CreateNewOrder(_id, txnId);
      console.log("orderResult", orderResult)
      return FormateData(orderResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      return FormateData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }  
  }
  async GetOrderDetails({ _id,orderId }){
    const orders = await this.repository.Orders(productId);
    return FormateData(orders)
  }

  async ManageCart(customerId, item,qty, isRemove){
    const cartResult = await this.repository.AddCartItem(customerId,item,qty, isRemove);
    return FormateData(cartResult);
  }
 

  async SubscribeEvents(payload){
    console.log("payload", payload)
   // payload = JSON.parse(payload);
    const { event, data } = payload;
    const { userId, product, qty } = data;
    console.log("payload", payload)
    switch(event){
      case 'ADD_TO_CART':
          this.ManageCart(userId,product, qty, false);
          break;
      case 'REMOVE_FROM_CART':
          this.ManageCart(userId,product, qty, true);
          break;
      default:
          break;
    }

  }


  async GetOrderPayload(userId,order,event){
    if(order){
          const payload = { 
            event: event,
            data: { userId, order }
        };
        return payload
    }else{
        return FormateData({error: 'No Order Available'});
    }
  }
}

export default ShoppingService;