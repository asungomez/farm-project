import {
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiProgress,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import React from 'react';

import { Goal } from '../../../models';

type GoalsRowDetailsProps = {
  goal: Goal;
};

export const GoalsRowDetails: React.FC<GoalsRowDetailsProps> = ({ goal }) => {
  console.log(goal);
  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem grow={false}>
        <EuiText>{goal.description}</EuiText>
      </EuiFlexItem>
      <EuiSpacer size="s" />
      <EuiFlexItem grow={false}>
        <EuiDescriptionList>
          <EuiFlexGroup direction="row">
            <EuiFlexItem>
              <EuiDescriptionListTitle>Start date</EuiDescriptionListTitle>
              <EuiDescriptionListDescription>
                {goal.startDate ?? '-'}
              </EuiDescriptionListDescription>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiDescriptionListTitle>Completion date</EuiDescriptionListTitle>
              <EuiDescriptionListDescription>
                {goal.completionDate ?? '-'}
              </EuiDescriptionListDescription>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiDescriptionList>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiProgress
          label="Progress"
          valueText={true}
          value={goal.progress ?? 0}
          max={100}
          color="primary"
          size="m"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
