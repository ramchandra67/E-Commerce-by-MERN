import express from 'express';
import {
 createProduct,
 getProducts,
 updateProduct,
 deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

//  To create a new product
router.post('/add', createProduct);

//  To get all products
router.get('/', getProducts);

//  To update a product by ID
router.put('/update/:id', updateProduct);

//  To delete a product by ID
router.delete('/delete/:id', deleteProduct);

export default router;