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

import { GoalsForm } from './goals_form';

type GoalsModalProps = {
  onClose: () => void;
};

export const GoalsModal: React.FC<GoalsModalProps> = ({ onClose }) => (
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
      <GoalsForm formId="goals-form" />
    </EuiModalBody>

    <EuiModalFooter>
      <EuiButtonEmpty onClick={onClose}>Cancel</EuiButtonEmpty>
      <EuiButton type="submit" form="goals-form" fill>
        Save
      </EuiButton>
    </EuiModalFooter>
  </EuiModal>
);
