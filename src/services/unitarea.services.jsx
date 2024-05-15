import axios from "axios";
import { API_URL } from "../config";

const baseUrl = `${API_URL}/unitarea`;

export const getUnitArea = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching unit areas:", error);
    throw error;
  }
};

export const getUnitAreabyId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching unit area by ID:", error);
    throw error;
  }
};

export const createUnitArea = async (data) => {
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (error) {
    console.error("Error creating unit area:", error);
    throw error;
  }
};

export const updateUnitArea = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating unit area:", error);
    throw error;
  }
};

export const deleteUnitArea = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    return;
  } catch (error) {
    console.error("Error deleting unit area:", error);
    throw error;
  }
};

export const getProcessbyUnitAreaId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/process/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching process by unit area ID:", error);
    throw error;
  }
};

export const getProcessRisksbyUnitAreaId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/process/risks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching process risks by unit area ID:", error);
    throw error;
  }
};
