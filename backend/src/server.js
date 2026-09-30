const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/db');

dotenv.config({ path: path.join(__dirname, '../.env') });

const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: {
            code: "404",
            message: "API endpoint not found (404 Not Found)"
        }
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});