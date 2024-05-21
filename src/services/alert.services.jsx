import axios from "axios";
import { API_URL } from "../config";

const baseUrl = `${API_URL}/alert`;

export const getReportWhistleAlertbyUserId = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/whistlealert/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching whistle alert for the user:", error);
    throw error;
  }
};

export const createReportWhistleAlert = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/whistlealert`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating whistle alert:", error);
    throw error;
  }
};

export const deleteReportWhistleAlert = async (id) => {
  try {
    await axios.delete(`${baseUrl}/whistlealert/${id}`);
    return;
  } catch (error) {
    console.error("Error deleting whistle alert:", error);
    throw error;
  }
};

export const getReportFactorAlertbyUserId = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/factoralert/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching risk factors for the user:", error);
    throw error;
  }
};

export const createReportFactorAlert = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/factoralert`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating risk factor:", error);
    throw error;
  }
};

export const deleteReportFactorAlert = async (id) => {
  try {
    await axios.delete(`${baseUrl}/factoralert/${id}`);
    return;
  } catch (error) {
    console.error("Error deleting risk factor:", error);
    throw error;
  }
};
