import express, { json } from 'express';
import cors from 'cors';
import postgres from 'postgres';
import "dotenv/config"
import { ENV } from './config/env.js';
const app = express();
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = ENV

console.log(PGUSER)
const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: 'require',
});
app.use(cors());
app.use(json());

//TODO ENDPOINTS
app.get('/api/tasks', async (req, res) => {
    try {
        const rows = await sql`SELECT * FROM public.tasks`
        res.json(rows);
    } catch (error) {
        res.json("error al conectar" + error)
    }
});
app.post('/api/tasks', async (req, res) => {
    try {
        const { affair, description, date_completion } = req.body;
        await sql`INSERT INTO tasks (affair, description,date_of_completion)
        VALUES (${affair},${description},${date_completion});`
        res.status(200).json("task created")
    } catch (err) {
        res.status(500).json("error : " + err)
    }
});

app.delete('/api/tasks', async (req, res) => {
    try {

        const { id } = req.body;
        await sql`DELETE FROM tasks WHERE id = ${id};`
        res.status(200).json("task deleted")
    } catch (err) {
        res.status(500).json("error : " + err)
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));