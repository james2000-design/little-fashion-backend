import { Request, Response } from "express";
const Product = require("../models/productModel");

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, image } = req.body;
  try {
    const product = new Product({ name, description, price, stock, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
};
