import {
  EuiButtonIcon,
  EuiIcon,
  EuiLoadingSpinner,
  EuiTableActionsColumnType,
  EuiTableFieldDataColumnType,
} from '@elastic/eui';

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
      onClick={() => deleteGoal(goal)}
    />
  );

export const columns = (
  deleteGoal: (goal: GoalTableItem) => void
): (
  | EuiTableFieldDataColumnType<GoalTableItem>
  | EuiTableActionsColumnType<GoalTableItem>
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
    render: status => <GoalsTableStatus status={status} />,
  },
  {
    name: 'Actions',
    actions: [
      {
        render: goal => deleteAction(goal, deleteGoal),
      },
    ],
  },
];
