const express = require("express");
const pool = require("./db");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/register", async (req, res) => {
  try {
    const { fullname, password, email, phone, sex, dob, languages, address } =
      req.body;

    const result = await pool.query(
      "INSERT INTO users (fullname, password, email, phone, sex, dob, languages, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [fullname, password, email, phone, sex, dob, languages, address]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error registering new user:", error);
    res.status(500).json({ error: "Failed to register" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];
    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user: { id: user.id, fullname: user.fullname, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
