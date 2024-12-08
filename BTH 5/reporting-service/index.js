const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const reportRoutes = require('./Routes/reports');

const app = express();
const port = 3003;

app.use(bodyParser.json());

// API Báo cáo
app.use('/reports', reportRoutes);

// Khởi tạo cơ sở dữ liệu
sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
