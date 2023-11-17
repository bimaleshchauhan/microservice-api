import CustomerService from "../services/userService.js";
import UserAuth from "./middlewares/auth.js";

export default (app) => {
  const service = new CustomerService();

  app.post("/signup", async (req, res, next) => {
    try {
      const { email, password, phone } = req.body;
      const { data } = await service.SignUp({ email, password, phone });
      return res.json(data);
    } catch (err) {
      //next(err);
    }
  });

  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { data } = await service.SignIn({ email, password });

      return res.json(data);
    } catch (err) {
      //next(err);
    }
  });

  app.post("/address", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      console.log("_id", _id)
      const { street, postalCode, city, country } = req.body;

      const { data } = await service.AddNewAddress(_id, {
        street,
        postalCode,
        city,
        country,
      });

      return res.json(data);
    } catch (err) {
      //next(err);
    }
  });

  app.get("/profile", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetProfile({ _id });
      return res.json(data);
    } catch (err) {
      //next(err);
    }
  });

  app.get("/shoping-details", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetShopingDetails(_id);

      return res.json(data);
    } catch (err) {
      //next(err);
    }
  });

  app.get("/wishlist", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetWishList(_id);
      return res.status(200).json(data);
    } catch (err) {
      //next(err);
    }
  });
  app.delete('/address/:id',UserAuth, async (req,res,next) => {
    const { _id } = req.user;
    const addressId = req.params.id;
  
    try {
        const { data } = await service.DeleteAddress(_id, {addressId}, true)
       //PublishCustomerEvent(data)
        return res.status(200).json(data.data);
    } catch (err) {
       // next(err)
    }
  });
  app.put('/address/:id',UserAuth, async (req,res,next) => {
    const { _id } = req.user;
    const addressId = req.params.id;
    const { street, postalCode, city, country } = req.body;
    try {
      console.log("street", street)
        const { data } = await service.DeleteAddress(_id, {addressId, street, postalCode,city,country}, false)
       //PublishCustomerEvent(data)
        return res.status(200).json(data.data);
    } catch (err) {
       // next(err)
    }
  });
};



