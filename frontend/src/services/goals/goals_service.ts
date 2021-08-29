import { Goal } from '../../models';
import { ApiService } from '../api';
import { createGoalRequest } from './goals_service_mappings';

export class GoalsService {
  public static async createGoal(goal: Goal): Promise<Goal> {
    try {
      const response = await ApiService.post('/goals', createGoalRequest(goal));
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
