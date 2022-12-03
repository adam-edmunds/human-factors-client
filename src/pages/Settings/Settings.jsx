import { useAuth0 } from '@auth0/auth0-react';
import { Fragment } from 'react';
import { ProfileEdit } from './ProfileEdit';
import { SettingsEdit } from './SettingsEdit';

export const Settings = () => {
  const { isAuthenticated } = useAuth0();
  const components = [];

  if (isAuthenticated) {
    components.push(<ProfileEdit />);
  }
  components.push(<SettingsEdit />);

  return components.map((component, index) => (
    <Fragment key={index}>{component}</Fragment>
  ));
};
