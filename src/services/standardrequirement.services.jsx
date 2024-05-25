import axios from "axios";
import { API_URL } from "../config";

const baseUrl = `${API_URL}/requirement`;

export const getStandardRequirement = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching requirements:", error);
    throw error;
  }
};

export const getStandardRequirementbyId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching requirement by ID:", error);
    throw error;
  }
};

export const getRisksStandardRequirementId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/risk/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching risks for the corresponding std requirement by ID:",
      error
    );
    throw error;
  }
};

export const linkRisktoStandardRequirement = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/risk`, data);
    return response.data;
  } catch (error) {
    console.error("Error linking risk to standard requirement:", error);
    throw error;
  }
};

export const unlinkRisktoStandardRequirement = async (id) => {
  try {
    await axios.delete(`${baseUrl}/risk/${id}`);
    return;
  } catch (error) {
    console.error("Error unlinking risk to standard requirement:", error);
    throw error;
  }
};
