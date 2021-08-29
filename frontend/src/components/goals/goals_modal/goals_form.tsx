import {
  EuiDatePicker,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiRange,
  EuiSpacer,
  EuiSwitch,
  EuiTextArea,
} from '@elastic/eui';
import React from 'react';

import { GoalsStatusSelect } from './goals_status_select';

type GoalsFormProps = {
  formId: string;
};

export const GoalsForm: React.FC<GoalsFormProps> = ({ formId }) => (
  <EuiForm id={formId} component="form">
    <EuiFormRow label="Name" fullWidth>
      <EuiFieldText name="name" fullWidth />
    </EuiFormRow>
    <EuiFormRow fullWidth>
      <EuiSwitch
        name="isKeyCompanyGoal"
        label="Key company goal"
        className="goals-form__key-switch"
        checked={false}
        onChange={() => {}}
      />
    </EuiFormRow>
    <EuiSpacer size="m" />
    <EuiFlexGroup direction="row" alignItems="center" gutterSize="s">
      <EuiFlexItem>
        <EuiFormRow fullWidth label="Status">
          <GoalsStatusSelect name="status" />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFormRow fullWidth label="Due date">
          <EuiDatePicker name="dueDate" fullWidth />
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiSpacer size="m" />
    <EuiFlexGroup direction="row" alignItems="center" gutterSize="s">
      <EuiFlexItem>
        <EuiFormRow fullWidth label="Start date">
          <EuiDatePicker name="startDate" fullWidth />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFormRow fullWidth label="End date">
          <EuiDatePicker name="endDate" fullWidth />
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiSpacer size="m" />
    <EuiFormRow fullWidth label="Description">
      <EuiTextArea name="description" fullWidth compressed />
    </EuiFormRow>
    <EuiFormRow fullWidth label="Progress">
      <EuiRange
        name="progress"
        min={0}
        max={100}
        value={0}
        onChange={() => {}}
        fullWidth
        showInput
      />
    </EuiFormRow>
  </EuiForm>
);
