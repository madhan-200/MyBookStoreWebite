import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Products API
export const getProducts = async (category = null) => {
  try {
    const url = category ? `${API}/products?category=${category}` : `${API}/products`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Reviews API
export const getReviews = async () => {
  try {
    const response = await axios.get(`${API}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const submitReview = async (reviewData) => {
  try {
    const response = await axios.post(`${API}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

// Gallery API
export const getGallery = async () => {
  try {
    const response = await axios.get(`${API}/gallery`);
    return response.data;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    throw error;
  }
};

// Admin API
export const adminLogin = async (credentials) => {
  try {
    const response = await axios.post(`${API}/admin/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getAdminMe = async (token) => {
  try {
    const response = await axios.get(`${API}/admin/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin info:', error);
    throw error;
  }
};

// Admin Products API
export const createProduct = async (productData, token) => {
  try {
    const response = await axios.post(`${API}/admin/products`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData, token) => {
  try {
    const response = await axios.put(`${API}/admin/products/${id}`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id, token) => {
  try {
    await axios.delete(`${API}/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Admin Reviews API
export const getAllReviews = async (token) => {
  try {
    const response = await axios.get(`${API}/admin/reviews`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    throw error;
  }
};

export const approveReview = async (id, token) => {
  try {
    const response = await axios.put(`${API}/admin/reviews/${id}/approve`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error approving review:', error);
    throw error;
  }
};

export const deleteReview = async (id, token) => {
  try {
    await axios.delete(`${API}/admin/reviews/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

// Admin Gallery API
export const createGalleryItem = async (galleryData, token) => {
  try {
    const response = await axios.post(`${API}/admin/gallery`, galleryData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating gallery item:', error);
    throw error;
  }
};

export const updateGalleryItem = async (id, galleryData, token) => {
  try {
    const response = await axios.put(`${API}/admin/gallery/${id}`, galleryData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating gallery item:', error);
    throw error;
  }
};

export const deleteGalleryItem = async (id, token) => {
  try {
    await axios.delete(`${API}/admin/gallery/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw error;
  }
};
