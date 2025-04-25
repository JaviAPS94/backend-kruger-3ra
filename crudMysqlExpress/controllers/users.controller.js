import db from "../db/db.js";

const getAllUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).send({ error: "Error fetching users" });
    }
    res.json(results);
  });
};

const createUser = (req, res) => {
  //Ocupamos recibir el nombre, correo, password
  const { name, email, password } = req.body;
  const sql = "INSERT INTO users (name, email, password) VALUES(?, ?, ?)";
  db.query(sql, [name, email, password], (err, results) => {
    if (err) {
      return res.status(500).send({ error: "Error creating user" });
    }
    console.log(results);
    res.status(201).json({ id: results.insertId, name, email, password });
  });
};

export { getAllUsers, createUser };
