import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/routes";
// import dbConfig from "./configs/db.config";
import { Pool } from "pg";

const port = 8080;

const pool = new Pool({
  host: process.env.POSTGRES_HOST ?? "localhost",
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER ?? "postgres",
  password: process.env.POSTGRES_PASS ?? "postgres",
  database: "iceboxdb",
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [`http://localhost:${port}`],
  })
);
app.use(morgan("dev"));
app.use(routes);

pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database 💽");

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port} 🚀`);
  });
});
