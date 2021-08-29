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
import { ErrorMessage } from '../../error';
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
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (goal: Goal) => {
    setLoading(true);
    setError(false);
    GoalsService.createGoal(goal)
      .then(goal => {
        setLoading(false);
        onSubmit(goal);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
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
        {error && <ErrorMessage />}
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
