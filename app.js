import express from "express";
import bodyParser from "body-parser";
const port = process.env.PORT || 4000;
// import routes from "./server/routes/routes";
const app = express();

//@route GET /api/v1/
//@desc  rote test
//@access public
app.get("/", (req, res) => {
  return res.status(200).json({
    success: "connected",
    message: "this is a test route"
  });
});

// app.get("/*", (req, res) => {
//   res.status(404).json({
//     status: "error",
//     message: "api Route url not valid"
//   });
// });
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use("/api/v1", routes);

app.listen(port, () => {
  console.log("connected on port 5000");
});

module.exports = app;
