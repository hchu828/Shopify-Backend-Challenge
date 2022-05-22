/** API calls for Shopify Inventory System */

import axios from 'axios';

const BASE_API_URL = "http://localhost:5001";

export async function getAllItems() {
  let res = await axios.get(`${BASE_API_URL}/items`);
  return res.data;
}