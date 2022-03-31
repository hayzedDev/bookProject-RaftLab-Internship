const express = require("express");
const path = require("path");
const controller = require("./controller");

const app = express();

app.use(express.static(`${__dirname}/public`));

// app.engine("pug", require("pug").__express);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", controller.getOverview);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
