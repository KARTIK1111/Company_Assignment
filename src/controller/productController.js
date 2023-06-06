//---------Importing all the dependencies required to create APIs----------//
const { logger } = require('./logger')
const express = require('express')
const productModel = require('../model/productModel')
const { isValidObjectId } = require('mongoose')

//-----------------API to create Product ---------------------//

const createProduct = async function (req, res) {
  try {
    const { Name, Company, Description, Type, Price, Rating } = req.body
    const data = req.body

    if (!Name) { return res.status(400).send({ status: false, message: "Please enter product name" }) }
    if (!Company) { return res.status(400).send({ status: false, message: "Please enter product Company" }) }
    if (!Description) { return res.status(400).send({ status: false, message: "Please enter product Description" }) }
    if (!Type) { return res.status(400).send({ status: false, message: "Please enter product Type" }) }
    if (!Price) { return res.status(400).send({ status: false, message: "Please enter product Price" }) }
    if (!Rating) { return res.status(400).send({ status: false, message: "Please enter product Rating" }) }

    //----------Using Regex for Validation------------------------------------------//
    //  
    if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(Name)) { return res.status(400).send({ status: false, message: "Please enter valid alphabetical Product Name" }) }
    if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(Company)) { return res.status(400).send({ status: false, message: "Please enter valid alphabetical Product Comapny" }) }
    if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(Description)) { return res.status(400).send({ status: false, message: "Please enter valid alphabetical Product Description" }) }
    if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(Type)) { return res.status(400).send({ status: false, message: "Please enter valid alphabetical Product Type" }) }
    if (!/^\d+$/.test(Price)) { return res.status(400).send({ status: false, message: "Please enter Numeric Price" }) }
    if (!/^\d+$/.test(Rating)) { return res.status(400).send({ status: false, message: "Please enter Numeric Rating" }) }

    const savedata = await productModel.create(data)
    if (savedata) { return res.status(201).send({ status: true, message: "Product successfully created", data: savedata }) }

  }
  catch (error) {
    logger.error(error.message)
    return res.status(500).send({ status: false, msg: error.message })
  }
}


//--------- API to get all the available products ---------------//

const getAllProducts = async function (req, res) {
  try {
    const getProducts = await productModel.find({ isDeleted: false })
    if (getProducts.length == 0) { return res.status(404).send({ status: false, message: "No products Found" }) }
    return res.status(200).send({ status: true, message: "Products List", data: getProducts })
  }
  catch (error) {
    logger.error(error.message)
    return res.status(500).send({ status: false, msg: error.message })
  }
}



//------------API to get products by ID -------------//

const getProductById = async function (req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).send({ status: false, message: "please enter valid productID" })
    const productIdExist = await productModel.findOne({ _id: id, isDeleted: false })

    if (!productIdExist) return res.status(400).send({ status: false, message: "ProductID does not exist" })
    return res.status(200).send({ status: true, message: "success", data: productIdExist })
  }
  catch (error) {
    logger.error(error.message)
    return res.status(500).send({ status: false, msg: error.message })
  }
}



//-----------------API to update existing Product data--------------//

const updateProductById = async function (req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).send({ status: false, message: "Please enter valid productID" })
    const deletedProduct = await productModel.findOne({ _id: id, isDeleted: false })
    if (!deletedProduct) return res.status(404).send({ status: false, message: "ProductID does not exist" })

    //------------Using Regex Validiation for Updates----------------//
    const { Name, Company, Description, Type, Price, Rating } = req.body

    if (Name) {
      if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(Name)) { return res.status(400).send({ status: false, message: "Please enter valid alphabetical Product Name" }) }
    }
    if (Company) {
      if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(Company)) { return res.status(400).send({ status: false, message: "Please enter valid alphabetical Product Comapny" }) }
    }
    if (Description) {
      if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(Description)) { return res.status(400).send({ status: false, message: "Please enter valid alphabetical Product Description" }) }
    }
    if (Type) {
      if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(Type)) { return res.status(400).send({ status: false, message: "Please enter valid alphabetical Product Type" }) }
    }
    if (Price) {
      if (!/^\d+$/.test(Price)) { return res.status(400).send({ status: false, message: "Please enter Numeric Price" }) }
    }
    if (Rating) {
      if (!/^\d+$/.test(Rating)) { return res.status(400).send({ status: false, message: "Please enter Numeric Rating" }) }
    }


    if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "Please enter data in body" })
    const updateProduct = await productModel.findOneAndUpdate({ _id: id }, { $set: req.body })
    return res.status(200).send({ status: true, message: "Product successfully Updated" })
  }

  catch (error) {
    logger.error(error.message)
    return res.status(500).send({ status: false, msg: error.message })
  }
}


//-----------------API to delete product--------------//

const deleteProduct = async function (req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).send({ status: true, message: 'please enter valid productID' })
    const productid = await productModel.findById({ _id: id })
    if (!productid) return res.status(400).send({ status: true, message: 'productID does not exist' })
    if (productid.isDeleted == true) return res.status(400).send({ status: false, message: "Product is Already deleted" })

    const deleteProduct = await productModel.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true } })
    return res.status(200).send({ status: true, message: 'product deleted successfully' })
  }

  catch (error) {
    logger.error(error.message)
    return res.status(500).send({ status: false, msg: error.message })
  }
}


//----------Exporting all the above APIs-------------------------//

module.exports = { createProduct, getAllProducts, getProductById, updateProductById, deleteProduct }