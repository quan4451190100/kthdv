const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const orderRoutes = require('./routes/orders');
const orderItemRoutes = require('./routes/orderItems');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use('/orders', orderRoutes);
app.use('/order_items', orderItemRoutes);

sequelize.sync({ force: true }).then(() => {
    console.log('Order database synced');
    app.listen(port, () => {
        console.log(`Order service running at http://localhost:${port}`);
    });
});
