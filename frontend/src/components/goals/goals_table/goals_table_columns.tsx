import {
  EuiButtonIcon,
  EuiIcon,
  EuiLoadingSpinner,
  EuiTableActionsColumnType,
  EuiTableComputedColumnType,
  EuiTableFieldDataColumnType,
} from '@elastic/eui';

import { GoalStatus } from '../../../models';
import { GoalTableItem } from './goals_table';
import { GoalsTableStatus } from './goals_table_status';

const deleteAction = (
  goal: GoalTableItem,
  deleteGoal: (goal: GoalTableItem) => void
) =>
  goal.loading ? (
    <EuiLoadingSpinner size="m" />
  ) : (
    <EuiButtonIcon
      iconType="trash"
      color="danger"
      aria-label="Delete goal"
      onClick={() => deleteGoal(goal)}
    />
  );

export const columns = (
  deleteGoal: (goal: GoalTableItem) => void,
  toggleDetails: (goal: GoalTableItem) => void
): (
  | EuiTableFieldDataColumnType<GoalTableItem>
  | EuiTableActionsColumnType<GoalTableItem>
  | EuiTableComputedColumnType<GoalTableItem>
)[] => [
  {
    field: 'isKeyCompanyGoal',
    name: 'Key goal',
    render: (isKey: boolean) => (isKey ? <EuiIcon type="starFilled" /> : <></>),
    align: 'center',
    width: '90px',
  },
  {
    field: 'name',
    name: 'Name',
  },
  {
    field: 'status',
    name: 'Status',
    render: (status: GoalStatus) => <GoalsTableStatus status={status} />,
  },
  {
    field: 'dueDate',
    name: 'Due date',
  },
  {
    name: 'Actions',
    actions: [
      {
        render: goal => deleteAction(goal, deleteGoal),
      },
    ],
  },
  {
    align: 'right',
    width: '40px',
    isExpander: true,
    render: (goal: GoalTableItem) => (
      <EuiButtonIcon
        onClick={() => toggleDetails(goal)}
        aria-label={goal.expanded ? 'Collapse' : 'Expand'}
        iconType={goal.expanded ? 'arrowUp' : 'arrowDown'}
      />
    ),
  },
];
