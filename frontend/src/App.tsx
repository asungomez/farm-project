import './App.scss';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';
import { useState } from 'react';

import { Empty, ErrorMessage, Goals, GoalsModal } from './components';
import { useGoals } from './hooks';
import { Goal } from './models';

export const App: React.FC<{}> = () => {
  const {
    goals,
    error,
    loading,
    searching,
    addGoal,
    deleteGoal,
    search,
    clearSearch,
  } = useGoals();

  const [displayModal, setDisplayModal] = useState(false);

  const onCreateGoal = () => setDisplayModal(true);
  const closeModal = () => setDisplayModal(false);

  const createGoal = (goal: Goal) => {
    addGoal(goal);
    setDisplayModal(false);
  };

  return (
    <>
      <EuiFlexGroup direction="column" alignItems="center" gutterSize="xl">
        <EuiFlexItem grow={false}>
          <EuiTitle>
            <h1 className="app__main-title">Goals</h1>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem className="app__container">
          {loading ? (
            <EuiFlexGroup
              direction="row"
              responsive={false}
              justifyContent="center"
            >
              <EuiLoadingSpinner color="primary" size="xl" />
            </EuiFlexGroup>
          ) : error ? (
            <ErrorMessage />
          ) : goals.length > 0 || searching ? (
            <Goals
              goals={goals}
              onClearSearch={clearSearch}
              onSearch={search}
              onCreateGoal={onCreateGoal}
              onDeleteGoal={deleteGoal}
            />
          ) : (
            <Empty onCreate={onCreateGoal} />
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
      {displayModal && (
        <GoalsModal onClose={closeModal} onSubmit={createGoal} />
      )}
    </>
  );
};
