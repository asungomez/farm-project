import './goals_modal.scss';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
} from '@elastic/eui';
import React from 'react';
import { useState } from 'react';

import { Goal } from '../../../models';
import { GoalsService } from '../../../services';
import { GoalsForm } from './goals_form';

type GoalsModalProps = {
  onClose: () => void;
  onSubmit: (goal: Goal) => void;
};

export const GoalsModal: React.FC<GoalsModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (goal: Goal) => {
    setLoading(true);
    GoalsService.createGoal(goal)
      .then(goal => {
        setLoading(false);
        onSubmit(goal);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <EuiModal
      onClose={onClose}
      initialFocus="[name=name]"
      className="goals-modal"
    >
      <EuiModalHeader>
        <EuiModalHeaderTitle>
          <h1>New goal</h1>
        </EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        <GoalsForm formId="goals-form" onSubmit={handleSubmit} />
      </EuiModalBody>

      <EuiModalFooter>
        <EuiButtonEmpty onClick={onClose} isDisabled={loading}>
          Cancel
        </EuiButtonEmpty>
        <EuiButton
          type="submit"
          form="goals-form"
          fill
          isDisabled={loading}
          isLoading={loading}
        >
          Save
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
};
