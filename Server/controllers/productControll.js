import asyncWrapper from "../middlewares/asyncWrapper.js";
import httpStatusText from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";
import Product from "../models/productModel.js";
import apiFeatures from "../utils/apiFeatures.js";

//create product -- Admin
export const createProduct = asyncWrapper(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    state: httpStatusText.SUCCESS,
    product,
  });
});

//getAllProducts
export const getAllProducts = asyncWrapper(async (req, res, next) => {
  const resultPerPage = 5;

  // Create a separate query to count all documents based on search criteria
  const countQuery = Product.find({}, { "-v": false });
  const featuresForCount = new apiFeatures(countQuery, req.query)
    .search()
    .filter()
    .sort()
    .limitFields();
  // Execute the count query to get the total count of products
  const totalProductsCount = await countQuery.countDocuments();

  // Create a new query for pagination
  const paginationQuery = Product.find({}, { "-v": false });
  const featuresForPagination = new apiFeatures(paginationQuery, req.query)
    .search()
    .filter()
    .sort()
    .paginate(resultPerPage) 
    .limitFields();

  const products = await featuresForPagination.query;

  if (!products) {
    return next(new appError("No products found", 404));
  }

  res.status(200).json({
    state: httpStatusText.SUCCESS,
    products,
    totalProductsCount,
    resultPerPage
  });
});



//getProductDetails
export const getProductDetails = asyncWrapper(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new appError("No product found", 500, httpStatusText.ERROR));
  }
  res.status(200).json({
    state: httpStatusText.SUCCESS,
    product,
  });
});

//update product -- Admin
export const updateProduct = asyncWrapper(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new appError("No product found", 500, httpStatusText.ERROR));
  }
  res.status(200).json({
    state: httpStatusText.SUCCESS,
    product,
  });
});

//delete product -- Admin
export const deleteProduct = asyncWrapper(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new appError("No product found", 500, httpStatusText.ERROR));
  }
  res.status(200).json({
    state: httpStatusText.SUCCESS,
    message: "Deleted Successfully",
  });
});
