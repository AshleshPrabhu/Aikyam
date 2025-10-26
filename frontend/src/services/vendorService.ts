import axiosInstance from './axiosInstance';

export interface Vendor {
  id: string;
  name: string;
  regionId: string;
  villageId: string;
  categories: string[];
  summary: string;
  phone: string;
  isStay: boolean;
  story?: string;
  storyImages?: string[];
  village?: any;
  region?: any;
}

class VendorService {
  async getAllVendors(): Promise<Vendor[]> {
    try {
      const response = await axiosInstance.get('/vendors');
      return response.data;
    } catch (error) {
      console.error('VendorService - getAllVendors error:', error);
      throw error;
    }
  }

  async getVendorById(id: string): Promise<Vendor> {
    try {
      const response = await axiosInstance.get(`/vendors/${id}`);
      return response.data;
    } catch (error) {
      console.error('VendorService - getVendorById error:', error);
      throw error;
    }
  }

  async createVendor(data: Partial<Vendor>): Promise<Vendor> {
    try {
      const response = await axiosInstance.post('/vendors', data);
      return response.data;
    } catch (error) {
      console.error('VendorService - createVendor error:', error);
      throw error;
    }
  }

  async updateVendor(id: string, data: Partial<Vendor>): Promise<Vendor> {
    try {
      const response = await axiosInstance.put(`/vendors/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('VendorService - updateVendor error:', error);
      throw error;
    }
  }

  async deleteVendor(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/vendors/${id}`);
    } catch (error) {
      console.error('VendorService - deleteVendor error:', error);
      throw error;
    }
  }
}

export default new VendorService();
