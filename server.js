const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const items = require("./routes/api/items");
const users = require("./routes/api/Users");
const auth = require("./routes/api/Auth");

const app = express();

//bodyparser
app.use(express.json());

//db connf
const db = config.get("mongoURI");

//connect to db
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("++++connected to MongoDB"))
  .catch(err => console.log(err));

//use routes routes/api.items
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`+++++server started at ${port}`));
