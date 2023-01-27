const express = require("express");
const mongoose = require('mongoose');
const session = require("express-session");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);
var cors = require('cors')
 



const { 
  MONGO_USER, 
  MONGO_PASSWORD, 
  MONGO_IP, 
  MONGO_PORT,
  MONGO_DB, 
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET
} = require("./config/config");

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
})
const postRouter = require("./routes/postRoutes")
const userRouter =  require("./routes/userRoutes")

const app = express()
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

const connectWithRetry = () => {
  mongoose.
  connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
  })
  .then(() => console.log('Connected to the database!'))
  .catch((e) => {
    console.log(e)
    setTimeout(connectWithRetry, 5000)
  });
};

connectWithRetry();

app.enable("trust proxy");
app.use(cors({}));
app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: SESSION_SECRET,
  cookie: {
    secure:false,
    resave:false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 700000,
  }
}))

app.use(express.json());

app.get("/api/v1/", (req, res) => {
    res.send("<h2>Docker Compose 2:55!</h2>");
    console.log('yeah it ran!');
});

//localhost:3000/api/v1/post/
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listning on port ${port}`));
