import express from "express";
import morgan from "morgan";
import { connectDb } from "./config/db.js";
import { trimQueryMiddleware } from "./middlewares/trimQuery.middleware.js";

import productsRoutes from "./routes/products.routes.js";
import categoriesRoute from './routes/category.routes.js';
import usersRoute from './routes/users.routes.js'

import dotenv from "dotenv";
dotenv.config();

connectDb();

const app = express();

app.use(express.json());
app.use(trimQueryMiddleware);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/products", productsRoutes);
app.use('/api/categories', categoriesRoute);
app.use('/api/users', usersRoute);

export default app;
