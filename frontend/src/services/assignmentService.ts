import axiosInstance from './axiosInstance';

export interface Assignment {
  id: string;
  userId: string;
  regionId: string;
  villageId: string;
  startDate: string;
  endDate: string;
  tasks: string[];
  status: 'active' | 'completed' | 'paused';
  user?: any;
  village?: any;
}

class AssignmentService {
  async getAllAssignments(): Promise<Assignment[]> {
    try {
      const response = await axiosInstance.get('/assignments');
      return response.data;
    } catch (error) {
      console.error('AssignmentService - getAllAssignments error:', error);
      throw error;
    }
  }

  async getAssignmentById(id: string): Promise<Assignment> {
    try {
      const response = await axiosInstance.get(`/assignments/${id}`);
      return response.data;
    } catch (error) {
      console.error('AssignmentService - getAssignmentById error:', error);
      throw error;
    }
  }

  async createAssignment(data: Partial<Assignment>): Promise<Assignment> {
    try {
      const response = await axiosInstance.post('/assignments', data);
      return response.data;
    } catch (error) {
      console.error('AssignmentService - createAssignment error:', error);
      throw error;
    }
  }

  async updateAssignment(id: string, data: Partial<Assignment>): Promise<Assignment> {
    try {
      const response = await axiosInstance.put(`/assignments/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('AssignmentService - updateAssignment error:', error);
      throw error;
    }
  }

  async deleteAssignment(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/assignments/${id}`);
    } catch (error) {
      console.error('AssignmentService - deleteAssignment error:', error);
      throw error;
    }
  }
}

export default new AssignmentService();
