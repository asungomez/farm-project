export const GOAL_STATUS_OPTIONS = [
  'Draft',
  'Not Completed',
  'Completed',
  'Published',
  'Canceled',
];

export type GoalStatus = typeof GOAL_STATUS_OPTIONS[number];

export type Goal = {
  id?: string;
  completionDate?: string;
  description: string;
  dueDate: string;
  isKeyCompanyGoal: boolean;
  name: string;
  progress?: number;
  startDate: string;
  status: GoalStatus;
};
