const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); 

const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


app.get('/', (req, res) => res.send(' Book Review API Running'));

app.listen(5000, () => console.log(' Server running on http://localhost:5000'));
