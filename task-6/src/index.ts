import express, { Request, Response, Application, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import userRoutes from "./user/user.routes";
import productRoutes from "./product/product.routes";
import orderRoutes from "./order/order.routes";
import cartRoutes from "./cart/cart.routes";
import bodyParser from "body-parser";

const app: Application = express();
const port = 8000;

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.status(500);
  res.send({ message: err.message });
};

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

const authChecker = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers);

  const userId = req.header("x-user-id");

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorized: User ID not provided in the x-user-id header",
    });
  }

  next();
};

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use("/api", authChecker);

app.use("/api/profile", userRoutes, errorHandler);
app.use("/api/products", productRoutes, errorHandler);
app.use("/api/profile/order", orderRoutes, errorHandler);
app.use("/api/profile/cart", cartRoutes, errorHandler);
