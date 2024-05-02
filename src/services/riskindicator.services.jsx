import axios from "axios";
import { API_URL } from "../config";

const baseUrl = `${API_URL}/indicator`;

export const getGeneralRiskinOrg = async () => {
  try {
    const response = await axios.get(`${baseUrl}/organization`);
    return response.data;
  } catch (error) {
    console.error("Error fetching risk indicators:", error);
    throw error;
  }
};

export const getRiskIndicator = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching risk indicators:", error);
    throw error;
  }
};

export const getRiskIndicatorbyId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching risk indicator by ID:", error);
    throw error;
  }
};

export const getRiskIndicatorDetail = async () => {
  try {
    const response = await axios.get(`${baseUrl}/detail`);
    return response.data;
  } catch (error) {
    console.error("Error fetching risk indicators details:", error);
    throw error;
  }
};

export const getRiskIndicatorDetailbyId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching risk indicator detail by ID:", error);
    throw error;
  }
};
