import express from 'express';
import {
    getAllProduct,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/ProductController.js';

const router = express.Router();

router.get('/api/products', getAllProduct);
router.get('/api/products/:id', getProductByID);
router.post('/api/products', createProduct);
router.post('/api/products/:id', updateProduct);
router.delete('/api/products/:id', deleteProduct);

export default router;