// Core Module
const path = require("path");

// External Module
const express = require("express");

// Local Modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const pathDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(pathDir, "public")));

app.use(errorsController.get404);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running in address: http://localhost:${PORT}`);
});
