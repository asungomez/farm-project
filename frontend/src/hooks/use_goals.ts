import { useState } from 'react';

import { Goal } from '../models/goal';

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  return { goals, update: setGoals };
};
