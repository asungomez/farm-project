import { useEffect, useState } from 'react';

import { Goal } from '../models/goal';
import { GoalsService } from '../services';

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      GoalsService.getGoals().then(goals => {
        setGoals(goals);
        setLoading(false);
      });
    }
  }, [loading]);

  const addGoal = (goal: Goal) => {
    setGoals(goals => [...goals, goal]);
  };

  const deleteGoal = (goalToDelete: Goal) =>
    setGoals(goals => goals.filter(goal => goal.id !== goalToDelete.id));

  return { goals, loading, addGoal, deleteGoal };
};
