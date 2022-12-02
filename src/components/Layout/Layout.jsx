import { Container, Toolbar } from '@mui/material';
import { drawerWidth } from '../../utils/constants';

export const Layout = ({ children }) => {
  return (
    <Container
      maxWidth='false'
      sx={{
        ml: `${drawerWidth}px`,
        maxWidth: `calc(100% - ${drawerWidth}px)`,
      }}
    >
      <Toolbar id='back-to-top-anchor' />
      {children}
    </Container>
  );
};
