import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/routes";
import dbConfig from "./configs/db.config";

const port = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(routes);

dbConfig.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database 💽");

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port} 🚀`);
  });
});
