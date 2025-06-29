const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const db = new Client({
    host: process.env.PGHOST || 'localhost',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'password',
    database: process.env.PGDATABASE || 'crud_db',
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
});

const app = express();

db.connect(err => {
    if (err) {
        console.error('PostgreSQL connection error:', err);
        process.exit(1);
    }
    console.log('Connected to PostgreSQL');
    db.query(`CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
    )`, [], err => {
        if (err) console.error('Table creation error:', err);
    });
});

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || '*'
}));
app.use(bodyParser.json());

// Get all items
app.get('/api/items', (req, res) => {
    db.query('SELECT * FROM items', [], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result.rows);
    });
});

// Get single item
app.get('/api/items/:id', (req, res) => {
    db.query('SELECT * FROM items WHERE id = $1', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!result.rows || result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
        res.json(result.rows[0]);
    });
});

// Create item
app.post('/api/items', (req, res) => {
    const { name, description } = req.body;
    db.query('INSERT INTO items (name, description) VALUES ($1, $2) RETURNING id', [name, description], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.rows[0].id, name, description });
    });
});

// Update item
app.put('/api/items/:id', (req, res) => {
    const { name, description } = req.body;
    db.query('UPDATE items SET name = $1, description = $2 WHERE id = $3', [name, description, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.rowCount === 0) return res.status(404).json({ error: 'Item not found' });
        res.json({ id: req.params.id, name, description });
    });
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
    db.query('DELETE FROM items WHERE id = $1', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.rowCount === 0) return res.status(404).json({ error: 'Item not found' });
        res.json({ success: true });
    });
});

// Alias for debug endpoint
app.get('/api/debug/items', (req, res) => {
    db.query('SELECT * FROM items', [], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        console.log(result.rows); // Print to server console
        res.json(result.rows);
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
