import express from "express";
import dotenv from "dotenv";
import adminUserRoute from "./routes/adminUserRoute.js";
import udemyRoute from "./routes/udemyRoute.js";

dotenv.config();

const app = express();

console.log(process.env.DATABASE_URL);
app.use(express.json());

app.use(adminUserRoute);

app.use(udemyRoute);


app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

