import './goals_table.scss';

import { EuiBasicTable, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

import { Goal } from '../../../models/goal';
import { GoalsService } from '../../../services';
import { GoalsRowDetails } from './goals_row_details';
import { columns } from './goals_table_columns';

export type GoalTableItem = Goal & { loading: boolean; expanded: boolean };

type GoalsTableProps = {
  goals: Goal[];
  onDelete: (goal: Goal) => void;
};

export const GoalsTable: React.FC<GoalsTableProps> = ({ goals, onDelete }) => {
  const [loadingGoals, setLoadingGoals] = useState<string[]>([]);
  const [expandedGoals, setExpandedGoals] = useState<string[]>([]);
  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState<{
    [id: string]: React.ReactElement;
  }>({});

  const tableItems = useCallback(
    (goals: Goal[]): GoalTableItem[] =>
      goals.map(goal => ({
        ...goal,
        loading: loadingGoals.includes(goal.id),
        expanded: expandedGoals.includes(goal.id),
      })),
    [loadingGoals, expandedGoals]
  );

  const [items, setItems] = useState<GoalTableItem[]>(tableItems(goals));

  const addLoadingGoal = (id: string) => setLoadingGoals(ids => [...ids, id]);
  const deleteLoadingGoal = (id: string) =>
    setLoadingGoals(ids => ids.filter(currentId => currentId !== id));

  const expandGoal = (id: string) => setExpandedGoals(ids => [...ids, id]);
  const collapseGoal = (id: string) =>
    setExpandedGoals(ids => ids.filter(currentId => currentId !== id));

  const deleteHander = (goal: GoalTableItem) => {
    addLoadingGoal(goal.id);
    GoalsService.deleteGoal(goal.id).then(() => {
      deleteLoadingGoal(goal.id);
      onDelete(goal);
    });
  };

  const toggleDetails = (goal: GoalTableItem) => {
    const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };
    if (itemIdToExpandedRowMapValues[goal.id]) {
      collapseGoal(goal.id);
      delete itemIdToExpandedRowMapValues[goal.id];
    } else {
      expandGoal(goal.id);
      itemIdToExpandedRowMapValues[goal.id] = <GoalsRowDetails goal={goal} />;
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  };

  useEffect(() => {
    setItems(tableItems(goals));
  }, [goals, tableItems]);

  return (
    <EuiFlexGroup direction="row" justifyContent="center" responsive={false}>
      <EuiFlexItem grow={false}>
        <EuiBasicTable
          items={items}
          columns={columns(deleteHander, toggleDetails)}
          className="goals-table"
          itemId="id"
          itemIdToExpandedRowMap={itemIdToExpandedRowMap}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
