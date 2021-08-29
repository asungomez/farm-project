import { EuiCallOut } from '@elastic/eui';
import React from 'react';

export const ErrorMessage: React.FC<{}> = () => (
  <EuiCallOut color="danger" iconType="alert" title="Something went wrong :(" />
);
