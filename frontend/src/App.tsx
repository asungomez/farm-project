import './App.scss';

import { EuiFlexGroup, EuiFlexItem, EuiTitle } from '@elastic/eui';
import React from 'react';
import { useState } from 'react';

import { Empty, GoalsModal, GoalsTable } from './components';
import { useGoals } from './hooks';

export const App: React.FC<{}> = () => {
  const { goals } = useGoals();
  const [displayModal, setDisplayModal] = useState(true);

  const onCreateGoal = () => setDisplayModal(true);
  const closeModal = () => setDisplayModal(false);

  return (
    <>
      <EuiFlexGroup direction="column" alignItems="center" gutterSize="xl">
        <EuiFlexItem grow={false}>
          <EuiTitle>
            <h1 className="app__main-title">Goals</h1>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem>
          {goals.length > 0 ? (
            <GoalsTable goals={goals} />
          ) : (
            <Empty onCreate={onCreateGoal} />
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
      {displayModal && <GoalsModal onClose={closeModal} />}
    </>
  );
};
