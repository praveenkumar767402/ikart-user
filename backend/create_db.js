const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: process.env.DB_PASSWORD
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS influencer_kart`);
        console.log('✅ Database "influencer_kart" created or already exists.');
        await connection.end();
        process.exit(0);
    } catch (err) {
        console.error('❌ Error creating database:', err);
        process.exit(1);
    }
}

createDatabase();
