const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const hbs = require("hbs");
const { registerPartials } = require("hbs");
require("./src/db/conn");
const User = require("./src/models/user_feedback");
const app = express();

const port = process.env.Port || 3000;

//setting up path
const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "./templates/views");
const partialpath = path.join(__dirname, "./templates/partials");

//middleware
app.use(
  `/css`,
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  `/js`,
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  `/jq`,
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);

app.use(
  `/font`,
  express.static(
    path.join(__dirname, "../node_modules/@fortawesome/fontawesome-free/css")
  )
);
app.use(
  `/fontjs`,
  express.static(
    path.join(__dirname, "../node_modules/@fortawesome/fontawesome-free/js")
  )
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

//routing
//app.get(path,callback)
app.get("/", (req, res) => {
  res.render("index.hbs");
});

app.get("/contact", (req, res) => {
  res.render("contact.hbs");
});
app.post("/contact", async (req, res) => {
  try {
    // res.send(req.body);
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index.hbs");
  } catch (error) {
    res.status(501).send(error);
  }
});

app.listen(port, () => {
  console.log(`the application started successfully on port ${port}`);
});
