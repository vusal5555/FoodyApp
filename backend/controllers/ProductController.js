import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

export const getAllProducts = asyncHandler(async (req, res) => {
  const foods = await Product.find({});

  res.status(200).json(foods);
});

export const getSingleProduct = asyncHandler(async (req, res) => {
  const food = await Product.findById(req.params.id);

  if (food) {
    res.status(200).json(food);
  } else {
    res.status(404);
    throw new Error("Food not found");
  }
});
