import { GoalStatus } from '../../models';

export type CreateGoalRequest = {
  completion_date?: string;
  description: string;
  due_date: string;
  is_key_company_goal: boolean;
  name: string;
  progress?: number;
  start_date?: string;
  status: GoalStatus;
};
