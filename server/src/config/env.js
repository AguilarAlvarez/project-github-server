import "dotenv/config"
export const ENV = {
    PGHOST: process.env.PGHOST,
    PGDATABASE: process.env.PGDATABASE,
    PGUSER: process.env.PGUSER,
    PGPASSWORD: process.env.PGPASSWORD,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV
}