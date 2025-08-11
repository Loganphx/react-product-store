import express from 'express';
import Product from "../models/product.model.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({"success": true, "data": products});
    } catch(error) {
        console.log("error", error);
        res.status(500).json({"success": false, "message": "Server Error"});
    }
})
router.post('/', async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: 'Please provide all fields'});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error in Create Product:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
})
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;

        const valid = mongoose.Types.ObjectId.isValid(id);
        if(!valid) {
            res.status(404).json({success: false, message: "Invalid Product Id"});
            return;
        }
        const exists = await Product.findByIdAndUpdate(id, product, {new: true});
        if(!exists) {
            res.status(404).json({success: false, message: "Product not found"});
            return;
        }

        res.status(200).json({success: true, data: exists});
    } catch(error) {
        res.status(500).json({success: false, message: 'Server Error'});
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("id: ", id);
    try {
        const valid = mongoose.Types.ObjectId.isValid(id);
        if(!valid) {
            res.status(404).json({success: false, message: "Invalid Product Id"});
            return;
        }
        const exists = await Product.findByIdAndDelete(id);
        if(!exists) {
            res.status(404).json({success: false, message: "Product not found"});
            return;
        }
        res.status(200).json({success: true});
    } catch(error) {
        console.error("Error: ", error);
        res.status(500).json({success: false, message: "Server Error"});
    }
})

export default router;