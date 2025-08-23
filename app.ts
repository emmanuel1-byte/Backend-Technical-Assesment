import express, { Request, Response } from "express";
import {
  routeNotFoundErrorHandler,
  globalErrorHandler,
} from "./src/middlewares/error";
import product from "./src/modules/product/route";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "API is running...." });
});

app.use("/api/v1/products", product);

app.use(routeNotFoundErrorHandler);
app.use(globalErrorHandler);

export default app;
