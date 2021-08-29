import { EuiSwitch } from '@elastic/eui';
import React from 'react';

type GoalsKeySwitchProps = {
  name: string;
  value: boolean;
  onChange: (e: any) => void;
};

export const GoalsKeySwitch: React.FC<GoalsKeySwitchProps> = ({
  name,
  value,
  onChange,
}) => {
  const handleChange = (e: any) => {
    onChange({
      ...e,
      target: {
        ...e.target,
        name,
        value: e.target.checked,
      },
    });
  };

  return (
    <EuiSwitch
      name={name}
      label="Key company goal"
      checked={value}
      onChange={handleChange}
    />
  );
};
