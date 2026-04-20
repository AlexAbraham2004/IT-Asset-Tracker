import pool from '../db.js';

// Get all assets ordered by creation date (newest first)
export const getAllAssets = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM assets ORDER BY created_at DESC');    
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching assets:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create Asset with placeholder values to prevent SQL injection
// Then update each field with their corresponding values
export const createAsset = async (req, res) => {
  const { name, type, serial_number, status, assignee, checkout_date, due_date } = req.body
    try {
        const result = await pool.query(
            'INSERT INTO assets (name, type, serial_number, status, assignee, checkout_date, due_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, type, serial_number, status, assignee, checkout_date, due_date]
        )
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Update Asset with values
// TODO: replace with dedicated checkout/checkin endpoints
export const updateAsset = async (req, res) => {
    const { id } = req.params;
    const { name, type, serial_number, status, assignee, checkout_date, due_date } = req.body;
    try {
        const result = await pool.query(
            'UPDATE assets SET name = $1, type = $2, serial_number = $3, status = $4, assignee = $5, checkout_date = $6, due_date = $7 WHERE id = $8 RETURNING *',
            [name, type, serial_number, status, assignee, checkout_date, due_date, id]
        )
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
        
// Delete Asset by ID
export const deleteAsset = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM assets WHERE id = $1', [id])
        res.json({ message: 'Asset deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
    }