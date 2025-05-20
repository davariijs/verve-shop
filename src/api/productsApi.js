import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchAllProducts = async () => {
  console.log("Attempting to fetch all products...");
  try {
    const response = await axios.get(`${API_BASE_URL}/products?limit=200`);
    console.log(`Fetched ${response.data.products.length} products out of ${response.data.total} total.`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};

export const fetchProductById = async (productId) => {
  if (!productId) {
    const err = "Product ID is required for fetchProductById";
    console.error(err);
    throw new Error(err);
  }
  console.log(`Fetching product with ID: ${productId}`);
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw new Error(`Failed to fetch product ${productId}: ${error.message}`);
  }
};