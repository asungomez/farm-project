import { useState } from 'react';

import { Goal } from '../models/goal';

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = (goal: Goal) => {
    setGoals(goals => [...goals, goal]);
  };

  return { goals, addGoal };
};
