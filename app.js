import express from "express";
import adminUserRoute from "./routes/adminUserRoute.js";
import udemyRoute from "./routes/udemyRoute.js";

const app = express();

app.use(express.json());

app.use("/admin/user", adminUserRoute);

app.use("/admin/udemy", udemyRoute);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

