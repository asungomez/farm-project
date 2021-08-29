import { EuiHealth, EuiSuperSelect, EuiSuperSelectOption } from '@elastic/eui';
import React from 'react';

import {
  GOAL_STATUS_OPTIONS,
  GoalStatus,
  goalStatusColors,
} from '../../../models';

type GoalsStatusSelectProps = {
  name: string;
  value: GoalStatus;
  onChange: (e: any) => void;
};

export const GoalsStatusSelect: React.FC<GoalsStatusSelectProps> = ({
  name,
  value,
  onChange,
}) => {
  const options: EuiSuperSelectOption<string>[] = GOAL_STATUS_OPTIONS.map(
    status => ({
      value: status,
      inputDisplay: (
        <EuiHealth color={goalStatusColors[status]}>{status}</EuiHealth>
      ),
    })
  );

  const handleChange = (value: string) => {
    onChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <EuiSuperSelect
      fullWidth
      options={options}
      valueOfSelected={value}
      onChange={handleChange}
      name={name}
    />
  );
};
