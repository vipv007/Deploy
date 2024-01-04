// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');

// const app = express();
// const port = 3500;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect('mongodb://127.0.0.1:27017/ProductsDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const orderSchema = new mongoose.Schema({
//   products: [
//     {
//       name: String,
//       size: String,
//       price: String,
//       quantity: Number,
//       image: {
//         data: Buffer,
//         contentType: String,
//       },
//     },
//   ],
//   totalAmount: Number,
// });

// const Order = mongoose.model('Order', orderSchema);

// const carvingExpensesSchema = new mongoose.Schema({
//   boardExpenses: Number,
//   laborExpenses: Number,
//   foodExpenses: Number,
// });

// const CarvingExpenses = mongoose.model('Orders', carvingExpensesSchema);

// // Add this route to your backend code
// app.post('/api/carvingExpenses', async (req, res) => {
//   try {
//     const { boardExpenses, laborExpenses, foodExpenses } = req.body;

//     const carvingExpenses = new CarvingExpenses({
//       boardExpenses,
//       laborExpenses,
//       foodExpenses,
//     });

//     await carvingExpenses.save();

//     res.status(200).json({ message: 'Carving expenses stored successfully' });
//   } catch (error) {
//     console.error('Error storing carving expenses:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// });



// app.post('/api/orders', async (req, res) => {
//   try {
//     console.log('Received request body:', req.body);

//     const { products, totalAmount } = req.body;

//     const orderDetails = {
//       products: await Promise.all(products.map(async (product) => {
//         console.log('Product:', product);

//         const imageData = product.image.data;
//         const contentType = product.image.contentType;

//         const savedImage = {
//           data: Buffer.from(imageData, 'base64'),
//           contentType,
//         };

//         return {
//           name: product.name,
//           size: product.size,
//           price: product.price,
//           quantity: product.quantity,
//           image: savedImage,
//         };
//       })),
//       totalAmount,
//     };

//     const order = new Order(orderDetails);
//     await order.save();

//     res.status(200).json({ message: 'Order created successfully' });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// });

// // Add this route to your backend code
// app.get('/api/get-orders', async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.status(200).json({ orders });
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// });

// // Add this route to your backend code
// app.get('/api/get-orders-expenses', async (req, res) => {
//   try {
//     const orders = await OrderExpenses.find();
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error('Error fetching order expenses:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// });

// // Add this route to your backend code
// app.get('/api/get-carving-expenses', async (req, res) => {
//   try {
//     const expenses = await CarvingExpenses.find();
//     res.status(200).json(expenses);
//   } catch (error) {
//     console.error('Error fetching carving expenses:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// });


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// server.js (or your entry file for the Express.js server)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3500;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/ProductsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const orderSchema = new mongoose.Schema({
  products: [
    {
      name: String,
      size: String,
      price: String,
      quantity: Number,
      image: {
        data: Buffer,
        contentType: String,
      },
    },
  ],
  totalAmount: Number,
  status: { type: String, default: 'pending' },
});

const Order = mongoose.model('Order', orderSchema);

// Add a new route to update the order status
app.post('/api/markOrderAsSuccess', async (req, res) => {
  try {
    const orderId = req.body.orderId;
    // Update the order status to 'success' or your desired value
    await Order.findByIdAndUpdate(orderId, { status: 'success' });
    res.json({ success: true, message: 'Order marked as success.' });
  } catch (error) {
    console.error('Error marking order as success:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    console.log('Received request body:', req.body);

    const { products, totalAmount } = req.body;

    const orderDetails = {
      products: await Promise.all(products.map(async (product) => {
        console.log('Product:', product);

        const imageData = product.image.data;
        const contentType = product.image.contentType;

        const savedImage = {
          data: Buffer.from(imageData, 'base64'),
          contentType,
        };

        return {
          name: product.name,
          size: product.size,
          price: product.price,
          quantity: product.quantity,
          image: savedImage,
        };
      })),
      totalAmount,
    };

    const order = new Order(orderDetails);
    await order.save();

    res.status(200).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

app.get('/api/get-orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});
// ... (previous code)

// Add a new route to get successful orders
app.get('/api/get-successful-orders', async (req, res) => {
    try {
      const successfulOrders = await Order.find({ status: 'success' });
      res.status(200).json({ orders: successfulOrders });
    } catch (error) {
      console.error('Error fetching successful orders:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });
  
  // ... (remaining code)
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
