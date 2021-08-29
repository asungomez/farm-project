import './goals_table.scss';

import {
  EuiBasicTable,
  EuiFlexGroup,
  EuiFlexItem,
  EuiGlobalToastList,
} from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
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
  const [toasts, setToasts] = useState<Toast[]>([]);

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
    GoalsService.deleteGoal(goal.id)
      .then(() => {
        deleteLoadingGoal(goal.id);
        onDelete(goal);
      })
      .catch(() => addErrorToast());
  };

  const removeToast = (removedToast: Toast) => {
    setToasts(toasts => toasts.filter(toast => toast.id !== removedToast.id));
  };

  const addErrorToast = () => {
    const toast: Toast = {
      title: 'Something went wrong :(',
      color: 'danger',
      id: '0',
    };

    setToasts(toasts => [...toasts, toast]);
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
    <>
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
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
    </>
  );
};
