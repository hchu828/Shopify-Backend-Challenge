/** API calls for Shopify Inventory System */

import axios from 'axios';

const BASE_API_URL = "http://localhost:5001";

/** Fetch list of all items in database */
export async function getItemsApi() {
  let res = await axios.get(`${BASE_API_URL}/items`);
  return res.data;
}

/** Add item to database */
export async function addItemApi(data) {
  let res = await axios.post(`${BASE_API_URL}/items`, data);
  return res.data.item;
}

/** Edit item */
export async function editItemApi(data) {
  let res = await axios.patch(`${BASE_API_URL}/items/${data.id}`, data);
  return res.data.item;
}

/** Soft delete item */
export async function softDeleteItemApi(data) {
  let res = await axios.patch(`${BASE_API_URL}/items/${data.id}/softdelete`, data);
  return res.data.item;
}

/** Soft undelete item */
export async function softUndeleteItemApi(data) {
  let res = await axios.patch(`${BASE_API_URL}/items/${data.id}/undelete`, data);
  return res.data.item;
}

/** Hard delete item */
export async function hardDeleteItemApi(data) {
  let res = await axios.delete(`${BASE_API_URL}/items/${data.id}`, data);
  return res.data;
}