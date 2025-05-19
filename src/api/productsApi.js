import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchProducts = async ({ skip = 0, limit = 10 }) => {
  console.log(`Fetching products with skip: ${skip}, limit: ${limit}`);
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { limit, skip },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (productId) => {
  if (!productId) {
    console.error("Product ID is required for fetchProductById");
    throw new Error("Product ID is required");
  }
  console.log(`Fetching product with ID: ${productId}`);
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};