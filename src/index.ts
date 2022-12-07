import Express from "express";
import router from "./router/index";

const app = Express();
const port = 3000;

app.use("/", router);

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});

export default app;
