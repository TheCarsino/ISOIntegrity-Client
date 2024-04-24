import axios from "axios";
import { API_URL } from "../config";

const baseUrl = `${API_URL}/organization`;

export const getOrganizations = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    throw error;
  }
};

export const getOrganizationById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching organization by ID:", error);
    throw error;
  }
};
