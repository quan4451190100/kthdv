const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');
const orderRoutes = require('./routes/orders');
const orderItemRoutes = require('./routes/orderItems');

const app = express();
const port = 3002;

app.use(bodyParser.json());

// API
app.use('/orders', orderRoutes);
app.use('/order_items', orderItemRoutes);

// Khởi tạo cơ sở dữ liệu
sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
