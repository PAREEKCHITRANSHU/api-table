const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/transactionsDB', { useNewUrlParser: true, useUnifiedTopology: true });

const transactionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    dateOfSale: Date,
    sold: Boolean,
    category: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Seed database
app.get('/seed', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.insertMany(response.data);
        res.send('Database seeded!');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// List transactions with search and pagination
app.get('/transactions', async (req, res) => {
    const { month, page = 1, perPage = 10, search = '' } = req.query;
    const regex = new RegExp(search, 'i');
    const transactions = await Transaction.find({ 
        dateOfSale: { $regex: `-${month}-` }, 
        $or: [{ title: regex }, { description: regex }, { price: regex }] 
    }).skip((page - 1) * perPage).limit(parseInt(perPage));
    res.json(transactions);
});

// Statistics API
app.get('/statistics', async (req, res) => {
    const { month } = req.query;
    const transactions = await Transaction.find({ dateOfSale: { $regex: `-${month}-` } });
    const totalSale = transactions.reduce((acc, item) => acc + item.price, 0);
    const totalSold = transactions.filter(item => item.sold).length;
    const totalNotSold = transactions.filter(item => !item.sold).length;
    res.json({ totalSale, totalSold, totalNotSold });
});

// Bar chart API
app.get('/barchart', async (req, res) => {
    const { month } = req.query;
    const transactions = await Transaction.find({ dateOfSale: { $regex: `-${month}-` } });
    const priceRanges = {
        '0-100': 0,
        '101-200': 0,
        '201-300': 0,
        '301-400': 0,
        '401-500': 0,
        '501-600': 0,
        '601-700': 0,
        '701-800': 0,
        '801-900': 0,
        '901-above': 0
    };
    transactions.forEach(item => {
        if (item.price <= 100) priceRanges['0-100']++;
        else if (item.price <= 200) priceRanges['101-200']++;
        else if (item.price <= 300) priceRanges['201-300']++;
        else if (item.price <= 400) priceRanges['301-400']++;
        else if (item.price <= 500) priceRanges['401-500']++;
        else if (item.price <= 600) priceRanges['501-600']++;
        else if (item.price <= 700) priceRanges['601-700']++;
        else if (item.price <= 800) priceRanges['701-800']++;
        else if (item.price <= 900) priceRanges['801-900']++;
        else priceRanges['901-above']++;
    });
    res.json(priceRanges);
});

// Pie chart API
app.get('/piechart', async (req, res) => {
    const { month } = req.query;
    const transactions = await Transaction.find({ dateOfSale: { $regex: `-${month}-` } });
    const categories = {};
    transactions.forEach(item => {
        categories[item.category] = (categories[item.category] || 0) + 1;
    });
    res.json(categories);
});

// Combined data API
app.get('/combined', async (req, res) => {
    const { month } = req.query;
    const transactions = await Transaction.find({ dateOfSale: { $regex: `-${month}-` } });
    const totalSale = transactions.reduce((acc, item) => acc + item.price, 0);
    const totalSold = transactions.filter(item => item.sold).length;
    const totalNotSold = transactions.filter(item => !item.sold).length;
    const priceRanges = {
        '0-100': 0,
        '101-200': 0,
        '201-300': 0,
        '301-400': 0,
        '401-500': 0,
        '501-600': 0,
        '601-700': 0,
        '701-800': 0,
        '801-900': 0,
        '901-above': 0
    };
    transactions.forEach(item => {
        if (item.price <= 100) priceRanges['0-100']++;
        else if (item.price <= 200) priceRanges['101-200']++;
        else if (item.price <= 300) priceRanges['201-300']++;
        else if (item.price <= 400) priceRanges['301-400']++;
        else if (item.price <= 500) priceRanges['401-500']++;
        else if (item.price <= 600) priceRanges['501-600']++;
        else if (item.price <= 700) priceRanges['601-700']++;
        else if (item.price <= 800) priceRanges['701-800']++;
        else if (item.price <= 900) priceRanges['801-900']++;
        else priceRanges['901-above']++;
    });
    const categories = {};
    transactions.forEach(item => {
        categories[item.category] = (categories[item.category] || 0) + 1;
    });
    res.json({
        transactions,
        statistics: { totalSale, totalSold, totalNotSold },
        priceRanges,
        categories
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
