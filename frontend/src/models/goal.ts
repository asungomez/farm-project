type GoalStatus =
  | 'Draft'
  | 'Published'
  | 'Completed'
  | 'Canceled'
  | 'Not Completed';

export type Goal = {
  id: string;
  completionDate?: string;
  description: string;
  dueDate: string;
  isKeyCompanyGoal: boolean;
  name: string;
  progress?: number;
  startDate: string;
  status: GoalStatus;
};
