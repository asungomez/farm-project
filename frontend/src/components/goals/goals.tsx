import {
  EuiButton,
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  Query,
} from '@elastic/eui';
import React from 'react';

import { Goal } from '../../models';
import { GoalsTable } from '.';
import GoalsSearch from './goals_search/goals_search';

type GoalsProps = {
  goals: Goal[];
  onCreateGoal: () => void;
  onDeleteGoal: (goal: Goal) => void;
  onSearch: (query: Query) => void;
  onClearSearch: () => void;
};

export const Goals: React.FC<GoalsProps> = ({
  goals,
  onClearSearch,
  onCreateGoal,
  onSearch,
  onDeleteGoal,
}) => (
  <EuiFlexGroup direction="column">
    <EuiFlexItem grow={false}>
      <EuiFlexGroup direction="row" responsive={false}>
        <EuiFlexItem>
          <GoalsSearch onSearch={onSearch} onCancelSearch={onClearSearch} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton fill onClick={onCreateGoal}>
            Create goal
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexItem>
    <EuiFlexItem>
      {goals.length > 0 ? (
        <GoalsTable goals={goals} onDelete={onDeleteGoal} />
      ) : (
        <EuiCallOut title="No search results" iconType="search" />
      )}
    </EuiFlexItem>
  </EuiFlexGroup>
);
