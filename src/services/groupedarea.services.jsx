import axios from "axios";
import { API_URL } from "../config";

const baseUrl = `${API_URL}/groupedarea`;

export const getGroupedAreas = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching grouped areas:", error);
    throw error;
  }
};

export const getGroupedAreaById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching grouped area by ID:", error);
    throw error;
  }
};

export const createGroupedArea = async (data) => {
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (error) {
    console.error("Error creating grouped area:", error);
    throw error;
  }
};

export const updateGroupedArea = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating grouped area:", error);
    throw error;
  }
};

export const deleteGroupedArea = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    return;
  } catch (error) {
    console.error("Error deleting grouped area:", error);
    throw error;
  }
};

export const getAreasByGroupedAreaId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/area/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching areas by grouped area ID:", error);
    throw error;
  }
};
