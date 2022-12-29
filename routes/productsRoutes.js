const express = require('express');
const router = express.Router();
const Products = require('../models/productsModel');


// GET All products
router.get('/', async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json({statusCode: 200, message: 'SUCCESS', products : products});
    }
    catch (err) {
        res.status(500).json({statusCode: 500, message: err.message});
    }
})

// Get product by ID
router.get('/:id', getProducts, async (req, res) => {
    try {
        res.status(200).json({statusCode: 200, message: 'SUCCESS', product : res.product});
    }
    catch (err) {
        res.status(500).json({statusCode: 500, message: err.message});
    }
});

// Add new product
router.post('/' , async (req, res) => {
    const product = new Products({
        category : req.body.category,
        measureIn : req.body.measureIn,
        productImage : req.body.productImage,
        productName_kn : req.body.productName_kn,
        productName_en : req.body.productName_en,
        productPrice : req.body.productPrice
    })
    
    try {
        const newProduct = await product.save();
        res.status(200).json({statusCode: 200, message: 'SUCCESS', product : newProduct});
    }
    catch (err) {
        res.status(500).json({statusCode: 500, message: err.message});
    }
});

// Delete product
router.delete('/:id' , getProducts, async (req, res) => {
    try {
        await res.product.remove();
        res.status(200).json({statusCode: 200, message: "SUCCESS"});
    }
    catch (err) {
        res.status(500).json({statusCode: 500, message: err.message});
    }
});

// Update exisiting product
router.patch('/:id' , getProducts, async (req, res) => {
    const category = req.body.category;
    const measureIn = req.body.measureIn;
    const productImage = req.body.productImage;
    const productName_en = req.body.productName_en;
    const productName_kn = req.body.productName_kn;
    const productPrice = req.body.productPrice;
    if(category != null) {
        res.product.category = category;
    }

    if(measureIn != null) {
        res.product.measureIn = measureIn;
    }

    if(productImage != null) {
        res.product.productImage = productImage;
    }

    if(productName_en != null) {
        res.product.productName_en = productName_en;
    }

    if(productName_kn != null) {
        res.product.productName_kn = productName_kn;
    }

    if(productPrice != null) {
        res.product.productPrice = productPrice;
    }

    try {
        const updatedProduct = await res.product.save();
        res.status(200).json({statusCode: 200, message: 'SUCCESS', product : updatedProduct});
    }
    catch (err) {
        res.status(500).json({statusCode: 500, message: err.message});
    }
});

async function getProducts(req, res, next) {
    let product;
    try{
        product = await Products.findById(req.params.id);
        if(product == null) {
            return res.status(404).json({statusCode: 400, message : 'Cant find the product'})
        }
    }
    catch (err) {
        return res.status(500).json({statusCode: 500, message : err.message});
    }
    res.product = product;
    next();
}

module.exports = router;