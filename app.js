//require('dotenv').config();

const express = require('express');
const app = express()
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000 ;

// MongoDB connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("connected to database"));

// Middlewares
app.use(express.json());

const productsRoutes = require('./routes/productsRoutes') 
app.use('/products',productsRoutes);

app.get('/',(req, res) => {
    res.status(200).json({message: 'SUCCESS'});
})
// Start server
app.listen(PORT, ()=> console.log(`Listening to http://localhost:${PORT}`));