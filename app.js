import express from "express";
import dotenv from "dotenv";
import adminUserRoute from "./routes/adminUserRoute.js";
import udemyRoute from "./routes/udemyRoute.js";
import crypto from "crypto";

dotenv.config();

const app = express();

app.use(express.json());

app.use(adminUserRoute);

app.use(udemyRoute);

// console.log(crypto.randomBytes(64).toString('hex'));
app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

