import moment from 'moment';

import { config } from '../../config';
import { Goal } from '../../models';
import { CreateGoalRequest, GoalResponse } from './goals_service_models';

export const createGoalRequest = (goal: Goal): CreateGoalRequest => {
  const request: CreateGoalRequest = {
    name: goal.name,
    description: goal.description,
    is_key_company_goal: goal.isKeyCompanyGoal,
    due_date: moment(goal.dueDate, config.dateFormat).toISOString(),
    status: goal.status,
  };

  if (goal.completionDate) {
    request.completion_date = moment(
      goal.completionDate,
      config.dateFormat
    ).toISOString();
  }
  if (goal.startDate) {
    request.start_date = moment(
      goal.startDate,
      config.dateFormat
    ).toISOString();
  }
  if (goal.progress) {
    request.progress = goal.progress;
  }

  return request;
};

export const goalResponse = (response: GoalResponse): Goal => ({
  ...response,
  completionDate: response.completion_date,
  dueDate: response.due_date,
  isKeyCompanyGoal: response.is_key_company_goal,
  startDate: response.start_date,
});
