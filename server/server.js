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

    const PORT =
      process.env.PORT || 5000;

    app.listen(PORT, () => {

      console.log(
        `Server running on port ${PORT}`
      );

    });

  })

  .catch((err) => {

    console.log(err);

  });
