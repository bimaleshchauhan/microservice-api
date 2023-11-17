import dotEnv from "dotenv"

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

export const PORT = process.env.PORT
export const DB_URL = process.env.MONGODB_URI
export const APP_SECRET = process.env.APP_SECRET
export const DBNAME = process.env.DBNAME

export const CUSTOMER_SERVICE = "customer_service";
export const SHOPPING_SERVICE = "shopping_service";

export const EXCHANGE_NAME = process.env.EXCHANGE_NAME
export const MSG_QUEUE_URL = process.env.MSG_QUEUE_URL
 
