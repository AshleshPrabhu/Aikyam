import axiosInstance from './axiosInstance';

export interface Village {
  id: string;
  name: string;
  regionId: string;
  description?: string;
  image?: string;
  region?: any;
}

class VillageService {
  async getAllVillages(): Promise<Village[]> {
    try {
      const response = await axiosInstance.get('/villages');
      return response.data;
    } catch (error) {
      console.error('VillageService - getAllVillages error:', error);
      throw error;
    }
  }

  async getVillageById(id: string): Promise<Village> {
    try {
      const response = await axiosInstance.get(`/villages/${id}`);
      return response.data;
    } catch (error) {
      console.error('VillageService - getVillageById error:', error);
      throw error;
    }
  }

  async createVillage(data: Partial<Village>): Promise<Village> {
    try {
      const response = await axiosInstance.post('/villages', data);
      return response.data;
    } catch (error) {
      console.error('VillageService - createVillage error:', error);
      throw error;
    }
  }

  async updateVillage(id: string, data: Partial<Village>): Promise<Village> {
    try {
      const response = await axiosInstance.put(`/villages/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('VillageService - updateVillage error:', error);
      throw error;
    }
  }

  async deleteVillage(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/villages/${id}`);
    } catch (error) {
      console.error('VillageService - deleteVillage error:', error);
      throw error;
    }
  }
}

export default new VillageService();
