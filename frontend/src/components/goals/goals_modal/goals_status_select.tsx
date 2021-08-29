import {
  EuiHealth,
  EuiSuperSelect,
  EuiSuperSelectOption,
  IconColor,
} from '@elastic/eui';
import React, { useState } from 'react';

import { GOAL_STATUS_OPTIONS, GoalStatus } from '../../../models';

type StatusColors = {
  [status in GoalStatus]: IconColor;
};

const colors: StatusColors = {
  Draft: 'subdued',
  Published: 'success',
  Completed: 'success',
  Canceled: 'danger',
  'Not Completed': 'warning',
};

type GoalsStatusSelectProps = {
  name?: string;
};

export const GoalsStatusSelect: React.FC<GoalsStatusSelectProps> = ({
  name,
}) => {
  const options: EuiSuperSelectOption<string>[] = GOAL_STATUS_OPTIONS.map(
    status => ({
      value: status,
      inputDisplay: <EuiHealth color={colors[status]}>{status}</EuiHealth>,
    })
  );
  const [value, setValue] = useState<string>(options[0].value);

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <EuiSuperSelect
      fullWidth
      options={options}
      valueOfSelected={value}
      onChange={onChange}
      name={name}
    />
  );
};
