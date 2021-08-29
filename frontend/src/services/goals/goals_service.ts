import { Goal } from '../../models';
import { ApiService } from '../api';
import { createGoalRequest, goalResponse } from './goals_service_mappings';

export class GoalsService {
  public static async createGoal(goal: Goal): Promise<Goal> {
    try {
      const response = await ApiService.post('/goals', createGoalRequest(goal));
      return Promise.resolve(goalResponse(response));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public static async deleteGoal(goalId: string): Promise<void> {
    try {
      await ApiService.delete(`/goals/${goalId}`);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public static async getGoals(): Promise<Goal[]> {
    try {
      const response = await ApiService.get('/goals');
      return Promise.resolve(response.goals.map(goalResponse));
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
