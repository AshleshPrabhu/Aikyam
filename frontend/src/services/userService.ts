import axiosInstance from './axiosInstance';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

class UserService {
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axiosInstance.get('/users');
      return response.data;
    } catch (error) {
      console.error('UserService - getAllUsers error:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('UserService - getUserById error:', error);
      throw error;
    }
  }

  async createUser(data: Partial<User>): Promise<User> {
    try {
      const response = await axiosInstance.post('/users', data);
      return response.data;
    } catch (error) {
      console.error('UserService - createUser error:', error);
      throw error;
    }
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    try {
      const response = await axiosInstance.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('UserService - updateUser error:', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/users/${id}`);
    } catch (error) {
      console.error('UserService - deleteUser error:', error);
      throw error;
    }
  }
}

export default new UserService();
