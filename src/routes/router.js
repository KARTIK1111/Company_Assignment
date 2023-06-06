//-------Importing required dependencies to create Routes-------//
const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')

//--------Creating Routing paths for APIs-------------//

router.post('/api/items', productController.createProduct)
router.get('/api/items', productController.getAllProducts)
router.delete('/api/items/:id', productController.deleteProduct)
router.put('/api/items/:id', productController.updateProductById)
router.get('/api/items/:id', productController.getProductById)

//-----Handling error for non existing URL---------------//
router.all("/*", (req, res) => {
    return res.status(404).send({ status: false, msg: "URL is not found" })
})

//--------exporting all routes-----------//
module.exports = router;