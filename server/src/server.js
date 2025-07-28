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
app.listen(5000, () => console.log('Server running on port 5000'));


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


//PLANTWEET ENDPOINTS

app.get('/api/tweets', async (req, res) => {
    try {
        const rows = await sql`SELECT users.username,tweets.content,tweets.id,tweets.likes_count,users.id as user_id
        FROM tweets JOIN users ON tweets.user_id=users.id `
        res.json(rows);
    } catch (error) {
        res.json("error " + error)
    }
});
app.get('/api/user', async (req, res) => {
    try {
        const { username, password } = req.query
        console.log(username, password)
        const rows = await sql`SELECT * FROM public.users WHERE username=${username} AND password=${password}`
        if (rows[0]) {
            res.json({
                state: true,
                user_id: rows[0].id
            })
        }
        res.json({
            state: false,
            error: "incorrect credentials"
        })
    } catch (error) {
        res.json("error al conectar" + error)
    }
}
)
app.post('/api/user', async (req, res) => {
    try {
        const { username, password, } = req.body;
        const userExist = await sql`SELECT * FROM users WHERE username=${username}`
        console.log(userExist)
        if (!userExist[0]) {
            const user = await sql`INSERT INTO users (username, password)
            VALUES (${username},${password}) RETURNING id`
            res.status(200).json({
                state: true,
                user_id: user
            })
        } else {
            res.status(405).json({
                state: false,
                message: "username alredy exist"
            })
        }
    } catch (err) {
        res.status(500).json("error : " + err)
    }
});
app.post('/api/tweet', async (req, res) => {
    try {
        const { user_id, content } = req.body;
        console.log(req.body)
        await sql`INSERT INTO tweets (user_id, content,likes_count)
        VALUES (${user_id},${content},0);`
        res.status(200).json({
            state: true,
        })
    } catch (err) {
        res.status(500).json({
            state: false,
            error: "error : " + err
        })
    }
});
app.post('/api/like', async (req, res) => {
    try {
        const { user_id, tweet_id, } = req.body;
        console.log(user_id, tweet_id)
        const exist = await sql`SELECT * FROM like_tweets WHERE user_id=${user_id} AND tweet_id=${tweet_id}`
        console.log("in")
        if (!exist[0]) {

            await sql`INSERT INTO like_tweets (user_id, tweet_id)
            VALUES (${user_id},${tweet_id});`
            await sql`UPDATE tweets SET likes_count=likes_count+1 WHERE id=${tweet_id}`
            res.status(200).json({ state: true })
        }
        res.status(200).json({ state: false })


    } catch (err) {
        res.status(500).json("error : " + err)
    }
});
app.get('/api/like', async (req, res) => {
    try {
        const { user_id, tweet_id } = req.query;
        const rows = await sql`SELECT * FROM public.like_tweets WHERE user_id=${user_id} AND tweet_id=${tweet_id}`
        if (rows[0]) {
            res.json(true)
        }
        res.json(false)
    } catch (error) {
        res.json("error : " + error)
    }
}
)