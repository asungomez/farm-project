import './empty.scss';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import React from 'react';

import { ReactComponent as Image } from '../../assets/images/tumbleweed.svg';

export const Empty: React.FC<{}> = () => (
  <EuiFlexGroup direction="column" alignItems="center" gutterSize="xs">
    <EuiFlexItem grow={false}>
      <EuiFlexGroup direction="row" justifyContent="center" responsive={false}>
        <EuiFlexItem grow={false}>
          <Image className="empty__image" />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiText size="xs" color="subdued" textAlign="center">
        Image by{' '}
        <EuiLink href="https://www.freepik.com" target="_blank">
          Freepik
        </EuiLink>{' '}
        from{' '}
        <EuiLink href="https://www.flaticon.com/" target="_blank">
          Flaticon
        </EuiLink>
      </EuiText>
    </EuiFlexItem>
    <EuiSpacer />
    <EuiFlexItem grow={false}>
      <EuiFlexGroup direction="row" justifyContent="center" responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiButton fill>Create a goal</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexItem>
  </EuiFlexGroup>
);
