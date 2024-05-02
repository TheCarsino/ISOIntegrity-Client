import axios from "axios";
import { API_URL } from "../config";

const baseUrl = `${API_URL}/survey/result`;

export const getSurveyResult = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching survey results:", error);
    throw error;
  }
};

export const verifyResultsforOneMonth = async () => {
  try {
    const response = await axios.get(`${baseUrl}/verify`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching survey verification of previous data:",
      error
    );
    throw error;
  }
};

export const getSurveyResultbyId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching survey result by ID:", error);
    throw error;
  }
};

export const getSurveyResultbyCategory = async (category) => {
  try {
    const response = await axios.get(`${baseUrl}/cat/${category}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching survey result by Risk Indicator Category:",
      error
    );
    throw error;
  }
};

export const getSurveyResultbyIndicatorId = async (indId) => {
  try {
    const response = await axios.get(`${baseUrl}/indicator/${indId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching survey result by Risk Indicator Id:", error);
    throw error;
  }
};

export const createSurveyResult = async (scaleId, data) => {
  try {
    const response = await axios.post(`${baseUrl}/${scaleId}`, data);
    if (response.status == 204) return null;
    return response.data;
  } catch (error) {
    console.error("Error creating survey result:", error);
    throw error;
  }
};
