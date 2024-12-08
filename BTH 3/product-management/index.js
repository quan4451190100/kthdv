const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const Product = require('./models/product');
const productRoutes = require('./routes/products');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// API sản phẩm
app.use('/products', productRoutes);

// Khởi tạo cơ sở dữ liệu
sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
