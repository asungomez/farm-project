import './goals_table.scss';

import { EuiBasicTable, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

import { Goal } from '../../../models/goal';
import { GoalsService } from '../../../services';
import { columns } from './goals_table_columns';

export type GoalTableItem = Goal & { loading: boolean };

type GoalsTableProps = {
  goals: Goal[];
  onDelete: (goal: Goal) => void;
};

export const GoalsTable: React.FC<GoalsTableProps> = ({ goals, onDelete }) => {
  const [loadingGoals, setLoadingGoals] = useState<string[]>([]);

  const tableItems = useCallback(
    (goals: Goal[]): GoalTableItem[] =>
      goals.map(goal => ({
        ...goal,
        loading: loadingGoals.includes(goal.id),
      })),
    [loadingGoals]
  );

  const [items, setItems] = useState<GoalTableItem[]>(tableItems(goals));

  const addLoadingGoal = (id: string) => setLoadingGoals(ids => [...ids, id]);
  const deleteLoadingGoal = (id: string) =>
    setLoadingGoals(ids => ids.filter(currentId => currentId !== id));

  const deleteHander = (goal: GoalTableItem) => {
    addLoadingGoal(goal.id);
    GoalsService.deleteGoal(goal.id).then(() => {
      deleteLoadingGoal(goal.id);
      onDelete(goal);
    });
  };

  useEffect(() => {
    setItems(tableItems(goals));
  }, [goals, tableItems]);

  return (
    <EuiFlexGroup direction="row" justifyContent="center" responsive={false}>
      <EuiFlexItem grow={false}>
        <EuiBasicTable
          items={items}
          columns={columns(deleteHander)}
          className="goals-table"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
