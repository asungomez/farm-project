import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiRange,
  EuiSpacer,
  EuiTextArea,
} from '@elastic/eui';
import { Formik } from 'formik';
import moment from 'moment';
import React from 'react';
import * as Yup from 'yup';

import { config } from '../../../config';
import { Goal, GOAL_STATUS_OPTIONS } from '../../../models';
import { GoalsDatePicker } from './goals_date_picker';
import { GoalsKeySwitch } from './goals_key_switch';
import { GoalsStatusSelect } from './goals_status_select';

type GoalsFormProps = {
  formId: string;
  onSubmit: (goal: Goal) => void;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  isKeyCompanyGoal: Yup.boolean().required('Select if this is a company goal'),
  status: Yup.string()
    .oneOf(GOAL_STATUS_OPTIONS)
    .required('Status is required'),
  dueDate: Yup.string().required('Due date is required'),
  startDate: Yup.string(),
  completionDate: Yup.string(),
  description: Yup.string().required('Description is required'),
  progress: Yup.number().min(0).max(100),
});

const initialValues = {
  name: '',
  isKeyCompanyGoal: false,
  status: 'Draft',
  dueDate: moment().format(config.dateFormat),
  startDate: '',
  completionDate: '',
  description: '',
  progress: 0,
};

export const GoalsForm: React.FC<GoalsFormProps> = ({ formId, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ handleSubmit, handleChange, errors, touched, values }) => (
      <EuiForm id={formId} component="form" onSubmit={handleSubmit}>
        <EuiFormRow
          label="Name"
          fullWidth
          isInvalid={errors.name && touched.name}
          error={errors.name}
        >
          <EuiFieldText
            name="name"
            fullWidth
            value={values.name}
            onChange={handleChange}
          />
        </EuiFormRow>
        <EuiFormRow
          fullWidth
          isInvalid={errors.isKeyCompanyGoal && touched.isKeyCompanyGoal}
          error={errors.isKeyCompanyGoal}
        >
          <GoalsKeySwitch
            value={values.isKeyCompanyGoal}
            onChange={handleChange}
            name="isKeyCompanyGoal"
          />
        </EuiFormRow>
        <EuiSpacer size="m" />
        <EuiFlexGroup direction="row" alignItems="center" gutterSize="s">
          <EuiFlexItem>
            <EuiFormRow
              fullWidth
              label="Status"
              isInvalid={errors.status && touched.status}
              error={errors.status}
            >
              <GoalsStatusSelect
                name="status"
                value={values.status}
                onChange={handleChange}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow
              fullWidth
              label="Due date"
              isInvalid={errors.dueDate && touched.dueDate}
              error={errors.dueDate}
            >
              <GoalsDatePicker
                name="dueDate"
                value={values.dueDate}
                onChange={handleChange}
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        <EuiFlexGroup direction="row" alignItems="center" gutterSize="s">
          <EuiFlexItem>
            <EuiFormRow
              fullWidth
              label="Start date"
              isInvalid={errors.startDate && touched.startDate}
              error={errors.startDate}
            >
              <GoalsDatePicker
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow
              fullWidth
              label="Completion date"
              isInvalid={errors.completionDate && touched.completionDate}
              error={errors.completionDate}
            >
              <GoalsDatePicker
                name="completionDate"
                value={values.completionDate}
                onChange={handleChange}
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        <EuiFormRow
          fullWidth
          label="Description"
          isInvalid={errors.description && touched.description}
          error={errors.description}
        >
          <EuiTextArea
            name="description"
            fullWidth
            compressed
            value={values.description}
            onChange={handleChange}
          />
        </EuiFormRow>
        <EuiFormRow
          fullWidth
          label="Progress"
          isInvalid={errors.progress && touched.progress}
          error={errors.progress}
        >
          <EuiRange
            name="progress"
            min={0}
            max={100}
            value={values.progress}
            onChange={handleChange}
            fullWidth
            showInput
          />
        </EuiFormRow>
      </EuiForm>
    )}
  </Formik>
);
