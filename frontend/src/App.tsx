import './App.scss';

import { EuiFlexGroup, EuiFlexItem, EuiTitle } from '@elastic/eui';
import React from 'react';

import { Empty, GoalsTable } from './components';
import { useGoals } from './hooks';

export const App: React.FC<{}> = () => {
  const { goals } = useGoals();

  const content = goals.length > 0 ? <GoalsTable goals={goals} /> : <Empty />;
  return (
    <EuiFlexGroup direction="column" alignItems="center" gutterSize="xl">
      <EuiFlexItem grow={false}>
        <EuiTitle>
          <h1 className="app__main-title">Goals</h1>
        </EuiTitle>
      </EuiFlexItem>
      <EuiFlexItem>{content}</EuiFlexItem>
    </EuiFlexGroup>
  );
};
