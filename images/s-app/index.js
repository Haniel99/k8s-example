const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL server.");
});

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors")
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
app.get('/api/hello', (req, res)=>{
  res.status(200).send('Hello');
})
// Registro de usuario
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send("Username, email and password are required");
  }
  
  const hashedPassword = await bcrypt.hash(password, 5);


  connection.query(
    "INSERT INTO users (username,email, password) VALUES (?, ?,?)",
    [username,email, hashedPassword],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error registering user");
      }
      res.status(201).json({msg: "User registered successfully"});
    }
  );
});

// Login de usuario
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        return res.status(500).send("Error logging in");
      }

      if (results.length === 0) {
        return res.status(401).send("Invalid username or password");
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).send("Invalid username or password");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    }
  );
});

// Middleware de autenticación
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    req.userId = decoded.id;
    next();
  });
};

// Mostrar datos del usuario
app.get("/user", authenticate, (req, res) => {
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [req.userId],
    (err, results) => {
      if (err) {
        return res.status(500).send("Error fetching user data");
      }

      if (results.length === 0) {
        return res.status(404).send("User not found");
      }

      res.status(200).json(results[0]);
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
