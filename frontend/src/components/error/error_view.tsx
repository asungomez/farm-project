import './error_view.scss';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import React from 'react';

import { ReactComponent as Image } from '../../assets/images/internal-error.svg';

const refresh = () => window.location.reload();

export const ErrorView: React.FC<{}> = () => (
  <EuiFlexGroup direction="column" alignItems="center" gutterSize="xs">
    <EuiFlexItem grow={false}>
      <EuiFlexGroup direction="row" justifyContent="center" responsive={false}>
        <EuiFlexItem grow={false}>
          <Image className="error__image" />
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
      <EuiText>Oops! Something went wrong.</EuiText>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiFlexGroup direction="row" justifyContent="center" responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiButton fill onClick={refresh}>
            Refresh the page
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexItem>
  </EuiFlexGroup>
);
