const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

// Middleware để parse JSON
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// API được bảo vệ
app.get('/protected', authMiddleware, (req, res) => {
    res.send('Hello World! You have access to this route');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
