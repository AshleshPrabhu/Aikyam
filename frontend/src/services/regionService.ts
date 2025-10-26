import axiosInstance from './axiosInstance';

export interface Region {
  id: string;
  name: string;
  state?: string;
  villageCount?: number;
  description?: string;
  famousCrafts?: string[];
  image?: string;
  villages?: any[];
}

class RegionService {
  async getAllRegions(): Promise<Region[]> {
    try {
      const response = await axiosInstance.get('/regions');
      return response.data;
    } catch (error) {
      console.error('RegionService - getAllRegions error:', error);
      throw error;
    }
  }

  async getRegionById(id: string): Promise<Region> {
    try {
      const response = await axiosInstance.get(`/regions/${id}`);
      return response.data;
    } catch (error) {
      console.error('RegionService - getRegionById error:', error);
      throw error;
    }
  }

  async createRegion(data: Partial<Region>): Promise<Region> {
    try {
      const response = await axiosInstance.post('/regions', data);
      return response.data;
    } catch (error) {
      console.error('RegionService - createRegion error:', error);
      throw error;
    }
  }

  async updateRegion(id: string, data: Partial<Region>): Promise<Region> {
    try {
      const response = await axiosInstance.put(`/regions/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('RegionService - updateRegion error:', error);
      throw error;
    }
  }

  async deleteRegion(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/regions/${id}`);
    } catch (error) {
      console.error('RegionService - deleteRegion error:', error);
      throw error;
    }
  }
}

export default new RegionService();
