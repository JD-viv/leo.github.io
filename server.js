const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

const db = mysql.createConnection({
  host: 'localhost',        // or your server IP
  user: 'root',             // your MySQL username
  password: 'Senthil77',// your MySQL password
  database: 'biketrack' // your database name
});

// Get all bike names
app.get('/api/bikes', (req, res) => {
  db.query('SELECT name FROM bikes', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get details for a selected bike
app.get('/api/bike/:name', (req, res) => {
  db.query('SELECT * FROM bikes WHERE name = ?', [req.params.name], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// Insert a new bike
app.post('/api/bike', (req, res) => {
  const { name, year, description, lastService, nextService } = req.body;
  db.query(
    'INSERT INTO bikes (name, year, description, lastService, nextService) VALUES (?, ?, ?, ?, ?)',
    [name, year, description, lastService, nextService],
    (err, result) => {
      if (err) {
        console.error(err); // Add this for debugging
        return res.status(500).json({ error: err });
      }
      res.json({ message: 'Bike saved successfully!' });
    }
  );
});

app.listen(3001, () => console.log('Server running on port 3001'));