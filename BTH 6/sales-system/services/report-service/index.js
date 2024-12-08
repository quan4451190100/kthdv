const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const reportRoutes = require('./routes/reports');

const app = express();
const port = 3003;

app.use(bodyParser.json());
app.use('/reports', reportRoutes);

sequelize.sync({ force: true }).then(() => {
    console.log('Report database synced');
    app.listen(port, () => {
        console.log(`Report service running at http://localhost:${port}`);
    });
});
