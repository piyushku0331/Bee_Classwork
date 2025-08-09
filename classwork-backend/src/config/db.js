require('dotenv').config();
const MONGOOSE = require('mongoose');

const DB_CONNECTOR = async () =>{
    try {
        const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/classwork';
        await MONGOOSE.connect(dbUrl);
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); 
    }
}

module.exports = DB_CONNECTOR;