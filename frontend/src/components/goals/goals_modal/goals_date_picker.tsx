import { EuiDatePicker } from '@elastic/eui';
import { Moment } from 'moment';
import React from 'react';

import { config } from '../../../config';

type GoalsDatePickerProps = {
  name: string;
  value: string;
  onChange: (e: any) => void;
};

export const GoalsDatePicker: React.FC<GoalsDatePickerProps> = ({
  name,
  value,
  onChange,
}) => {
  const handleChange = (date: Moment) => {
    onChange({
      target: {
        name,
        value: date.format(config.dateFormat),
      },
    });
  };

  return (
    <EuiDatePicker
      name={name}
      fullWidth
      onChange={handleChange}
      value={value}
    />
  );
};
