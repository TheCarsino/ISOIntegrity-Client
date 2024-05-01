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

// export const linkRisktoStandardRequirement = async (data) => {};

// export const unlinkRisktoStandardRequirement = async (id) => {};
