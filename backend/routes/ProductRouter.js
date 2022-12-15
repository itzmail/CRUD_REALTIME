import express from 'express';
import {
    getAllProduct,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/ProductController';

const router = express.Router();

router.get('/products', getAllProduct);