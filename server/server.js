const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

/* ROUTES */

const taskRoutes =
  require("./routes/taskRoutes");

const projectRoutes =
  require("./routes/projectRoutes");

const authRoutes =
  require("./routes/authRoutes");

const app = express();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

/* TEST ROUTE */

app.get("/", (req, res) => {

  res.send("GTR Backend Running");

});

/* API ROUTES */

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

/* DATABASE */

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {

    console.log(
      "MongoDB Connected"
    );

    app.listen(5000, () => {

      console.log(
        "Server running on port 5000"
      );

    });

  })

  .catch((err) => {

    console.log(err);

  });