const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const productRoutes = require('./routes/products');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use('/products', productRoutes);

sequelize.sync({ force: true }).then(() => {
    console.log('Product database synced');
    app.listen(port, () => {
        console.log(`Product service running at http://localhost:${port}`);
    });
});
