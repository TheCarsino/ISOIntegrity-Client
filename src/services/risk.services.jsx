import axios from "axios";
import { API_URL } from "../config";

const baseUrl = `${API_URL}/risk`;

export const getRiskTreatment = async () => {
  try {
    const response = await axios.get(`${baseUrl}/treatments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching risk treatments:", error);
    throw error;
  }
};

export const getRisk = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching risks:", error);
    throw error;
  }
};

export const getRiskbyId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching risk by ID:", error);
    throw error;
  }
};

export const getRiskDetail = async () => {
  try {
    const response = await axios.get(`${baseUrl}/detail`);
    return response.data;
  } catch (error) {
    console.error("Error fetching detailed risks:", error);
    throw error;
  }
};

export const getRiskDetailbyId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching detailed risk by ID:", error);
    throw error;
  }
};

export const createRisk = async (data) => {
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (error) {
    console.error("Error creating risk:", error);
    throw error;
  }
};

export const updateRisk = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating risk:", error);
    throw error;
  }
};

export const deleteRisk = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    return;
  } catch (error) {
    console.error("Error deleting risk:", error);
    throw error;
  }
};
