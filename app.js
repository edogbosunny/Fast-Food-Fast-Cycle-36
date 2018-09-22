import express from "express";
import bodyParser from "body-parser";
const port = process.env.PORT || 4000;
import routes from "./server/routes/routes";
const app = express();

// app.get("/*", (req, res) => {
//   res.status(404).json({
//     status: "error",
//     message: "api Route url not valid"
//   });
// });
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", routes);

app.listen(port, () => {
  console.log("connected on port 5000");
});

module.exports = app;
