import { IconColor } from '@elastic/eui';

export const GOAL_STATUS_OPTIONS = [
  'Draft',
  'Not Completed',
  'Completed',
  'Published',
  'Canceled',
];

export type GoalStatus = typeof GOAL_STATUS_OPTIONS[number];

type StatusColors = {
  [status in GoalStatus]: IconColor;
};

export const goalStatusColors: StatusColors = {
  Draft: 'default',
  Published: 'success',
  Completed: 'success',
  Canceled: 'danger',
  'Not Completed': 'warning',
};

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
