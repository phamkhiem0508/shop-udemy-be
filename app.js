import express from "express";
import adminUserRoute from "./routes/adminUserRoute.js";
import {adminUserController} from "./controllers/adminUserController.js";

const app = express();

app.use("/admin/user", adminUserRoute);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
