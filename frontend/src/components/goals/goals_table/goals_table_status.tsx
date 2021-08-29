import { EuiBadge } from '@elastic/eui';
import React from 'react';

import { GoalStatus, goalStatusColors } from '../../../models';

type GoalsTableStatusProps = {
  status: GoalStatus;
};

export const GoalsTableStatus: React.FC<GoalsTableStatusProps> = ({
  status,
}) => <EuiBadge color={goalStatusColors[status]}>{status}</EuiBadge>;
