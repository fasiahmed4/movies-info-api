import express from "express";
import cors from 'cors'
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Fasi",
  password: "1234",
  port: 5432, // Default PostgreSQL port
});

const app = express();

app.use(cors({origin:'*'}))

app.get("/all", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM movies");
    console.log(result.rows);
    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error occurred" });
  }
});

app.get("/:movieName", async (req, res) => {
  try {
    const movieName = req.params.movieName;
    const result = await pool.query(
      `SELECT * FROM movies WHERE name ILIKE '%${movieName}%'`
    );
    console.log(result.rows);
    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error occurred" });
  }
});

app.listen(4000, () => {
  console.log(`Server is up at http://localhost:4000`);
});

