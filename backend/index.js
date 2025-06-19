require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

connectDB(); 

app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.get('/', (req, res) => res.send(' Book Review API Running'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
