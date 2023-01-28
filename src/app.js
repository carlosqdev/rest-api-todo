import Express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";

const app = Express();
app.use(Express.json());
app.use(cors());

app.use("/api", todoRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

export default app;
