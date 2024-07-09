require("dotenv").config();
const express = require("express");
const session = require("express-session");
const redis = require("redis");
const mongoose = require("mongoose");
const connectRedis = require("connect-redis");
const router = require("./routes/userRoutes");

const app = express();
const RedisStore = connectRedis(session);

let redisClient;

(async () => {
  redisClient = redis.createClient({
    port: 6379,
    host: "localhost",
  });
  await redisClient.connect();
})();

app.use(express.json());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "3EW$%sdfbg",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 10,
    },
  })
);

app.use("/api/user", router);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} .....`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to the database", err);
    process.exit(1);
  });
