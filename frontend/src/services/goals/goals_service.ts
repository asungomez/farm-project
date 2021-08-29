import { Goal } from '../../models';
import { ApiService } from '../api';

export class GoalsService {
  public static async createGoal(goal: Goal): Promise<Goal> {
    try {
      const response = await ApiService.post('/goals', goal);
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
