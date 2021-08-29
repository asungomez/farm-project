import { Query } from '@elastic/eui';
import { useEffect, useState } from 'react';

import { Goal } from '../models/goal';
import { GoalsService } from '../services';

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Goal[]>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (loading) {
      GoalsService.getGoals()
        .then(goals => {
          setGoals(goals);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, [loading]);

  const addGoal = (goal: Goal) => {
    setGoals(goals => [...goals, goal]);
  };

  const deleteGoal = (goalToDelete: Goal) =>
    setGoals(goals => goals.filter(goal => goal.id !== goalToDelete.id));

  const search = (query: Query) => {
    setSearchResults(Query.execute(query, goals));
    setSearching(true);
  };

  const clearSearch = () => {
    setSearching(false);
    setSearchResults([]);
  };

  return {
    goals: searching ? searchResults : goals,
    error,
    loading,
    searching,
    addGoal,
    deleteGoal,
    search,
    clearSearch,
  };
};
