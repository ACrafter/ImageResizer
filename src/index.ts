import Express from "express";
import router from "./router/index";
import path from "path";

const app = Express();
const port = 3000;

app.use("/", router);
app.use(Express.static(path.resolve("frontend")));
app.use(Express.urlencoded({ extended: true }));


app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});

export default app;
