import axios from "axios";
import { DeliveriesResponse } from './DeliveriesService.types';
export const API = "https://60e84194673e350017c21844.mockapi.io/api";

export const getAllDeliveries = async (): Promise<DeliveriesResponse[]> => {
  try {
    const url = `${API}/deliveries`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDeliveryById = async (id: string): Promise<DeliveriesResponse> => {
  try {
    const url = `${API}/deliveries/${id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putDelivery = async (payload: DeliveriesResponse): Promise<DeliveriesResponse> => {
  try {
    const url = `${API}/deliveries/${payload.id}`;
    const response = await axios.put(url, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
