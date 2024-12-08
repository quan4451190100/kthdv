const axios = require('axios');

const runWorkflow = async () => {
    try {
        // 1. Lấy danh sách sản phẩm
        const products = await axios.get('http://localhost:3001/products');
        console.log('Products:', products.data);

        // 2. Tạo đơn hàng
        const order = await axios.post('http://localhost:3002/orders', {
            customer_name: 'John Doe',
            customer_email: 'john.doe@example.com',
            total_amount: 500,
            status: 'pending',
        });
        console.log('Order created:', order.data);

        // 3. Thêm sản phẩm vào đơn hàng
        await axios.post('http://localhost:3002/order_items', {
            order_id: order.data.id,
            product_id: products.data[0].id,
            product_name: products.data[0].name,
            quantity: 2,
            unit_price: products.data[0].price,
            total_price: 2 * products.data[0].price,
        });
        console.log('Order item added.');

        // 4. Cập nhật số lượng sản phẩm
        await axios.put(`http://localhost:3001/products/${products.data[0].id}`, {
            quantity: products.data[0].quantity - 2,
        });
        console.log('Product quantity updated.');

        // 5. Cập nhật trạng thái đơn hàng
        await axios.put(`http://localhost:3002/orders/${order.data.id}`, {
            status: 'completed',
        });
        console.log('Order status updated.');

        // 6. Tạo báo cáo
        await axios.post('http://localhost:3003/reports/orders', {
            order_id: order.data.id,
            total_revenue: 500,
            total_cost: 300,
            total_profit: 200,
        });
        console.log('Order report created.');
    } catch (error) {
        console.error('Error during workflow:', error.response?.data || error.message);
    }
};

runWorkflow();
