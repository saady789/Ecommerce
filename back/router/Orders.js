const express = require("express");
const {createOrder,getOrder,getOrderById,updateOrderById} = require("../controller/Order");
const router = express.Router();



router.post('/createorder',createOrder);
router.get('/getorder',getOrder);
router.get('/getorderbyid/:id',getOrderById);
router.patch('/updateorderbyid/:id',updateOrderById);



// router.get('/getproduct',getProducts)
// router.get('/getproductbyid/:id',getProductsById)



exports.router = router;

