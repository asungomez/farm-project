import React from 'react';

import { Goal } from '../../models/goal';

type GoalsTableProps = {
  goals: Goal[];
};

export const GoalsTable: React.FC<GoalsTableProps> = ({ goals }) => (
  <>
    {goals.map(goal => (
      <>{goal.name}</>
    ))}
  </>
);
