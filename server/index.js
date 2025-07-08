/**
|--------------------------------------------------
| Project: MERN E-commerce Web App
| Author: Md. Suruj Miah
| Description: This is E-commerce web application.
| Date: 05/07/2025
|--------------------------------------------------
*/


//dependence 
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/authRoutes');
const authProductsRouter = require("./routes/admin/products-routes");
const featureRouter = require("./routes/feature-routes");
//init app
const app = express();
dotenv.config();

//database connection
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce_web_app_db";
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) 
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection failed:", err));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));


app.use("/api/auth", authRouter);
app.use("/api/admin/products", authProductsRouter);

app.use("/api/feature", featureRouter);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
});
