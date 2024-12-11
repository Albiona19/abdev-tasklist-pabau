const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors()); 



app.use(bodyParser.json());

const pool = mysql.createPool({
    host: 'mysql',
    user: 'my_user',
    password: 'my_password',
    database: 'my_database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

app.get('/api/bookings', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM bookings');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/bookings', async (req, res) => {
    const { service, doctor_name, start_time, end_time, date } = req.body;
    const insertQuery = 'INSERT INTO bookings (service, doctor_name, start_time, end_time, date) VALUES (?, ?, ?, ?, ?)';

    try {
        await pool.query(insertQuery, [service, doctor_name, start_time, end_time, date]);
        res.status(201).send('Booking inserted successfully');
    } catch (error) {
        console.error('Error inserting booking:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [id]);
      if (rows.length === 0) {
          return res.status(404).send('Booking not found');
      }
      res.status(200).json(rows[0]);
  } catch (error) {
      console.error('Error fetching booking:', error);
      res.status(500).send('Internal Server Error');
  }
});
