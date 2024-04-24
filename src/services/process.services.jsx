import axios from "axios";
import { API_URL } from "../config";

const baseUrl = `${API_URL}/process`;

export const getProcess = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching processes:", error);
    throw error;
  }
};

export const geProcessbyId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching process by ID:", error);
    throw error;
  }
};

export const createProcess = async (data) => {
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (error) {
    console.error("Error creating process:", error);
    throw error;
  }
};

export const updateProcess = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating process:", error);
    throw error;
  }
};

export const deleteProcess = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    return;
  } catch (error) {
    console.error("Error deleting process:", error);
    throw error;
  }
};

export const getRiskbyProcessId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/risk/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching risks by process ID:", error);
    throw error;
  }
};
