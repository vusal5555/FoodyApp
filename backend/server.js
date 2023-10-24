import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connect from "./db/db.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import ProductRouter from "./routes/ProductRoutes.js";
import UserRouter from "./routes/UserRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

connect();

const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/products", ProductRouter);
app.use("/api/users", UserRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server is listening");
});
