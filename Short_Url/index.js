const express = require("express");
const path = require("path");
const { connectDB } = require("./config/db");

const urlRoute = require("./routes/url.route");
const userRoute = require("./routes/user.route");
const staticRouter = require("./routes/staticRouter"); // adjust path if needed

const app = express();
const PORT = 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount routers
app.use("/", staticRouter);      // now /signup and /test work
app.use("/user", userRoute);
app.use("/url", urlRoute);

connectDB("mongodb://localhost:27017/short-url");

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});