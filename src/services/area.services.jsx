import axios from "axios";
import { API_URL } from "../config";

const baseUrl = `${API_URL}/area`;

export const getArea = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching areas:", error);
    throw error;
  }
};

export const getAreabyId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching area by ID:", error);
    throw error;
  }
};

export const createArea = async (data) => {
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (error) {
    console.error("Error creating area:", error);
    throw error;
  }
};

export const updateArea = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating area:", error);
    throw error;
  }
};

export const deleteArea = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    return;
  } catch (error) {
    console.error("Error deleting area:", error);
    throw error;
  }
};

export const getUnitAreabyAreaId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/unitarea/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching unit areas by area ID:", error);
    throw error;
  }
};
