const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection.js");
const Session = require("./models/SessionModel.js"); // Ensure correct import
const bodyParser = require('body-parser');
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const authRoute = require("./routes/AuthRoute.js");
const userRoute = require("./routes/UserRoute.js");

dotenv.config();

const port = process.env.APP_PORT || 3000;

const sessionStore = new SequelizeStore({
  db: sequelize,
  table: 'sessions',
  model: Session, // Specify the model if necessary
});

const app = express();

// Middleware
app.use(
  session({
    secret: process.env.SESS_SECRET || 'default_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        `http://10.10.101.146:${port}`,
        `http://192.168.231.91:${port}`,
        `http://localhost:${port}`,
        "http://10.10.101.146:3000",
        "http://192.168.231.91:3000",
        "http://localhost:3000",
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Deny the request
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: "Content-Type, Authorization",
  })
);


// Routes
app.post("/ping", (req, res) => {
  res.send("pong");
});

app.use(authRoute);
app.use(userRoute);

// sequelize.sync({ alter: true }).then(() => {
//   sessionStore.sync(); // Ensure the session store is synchronized
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
