import { Grid } from '@mui/material';

export const Container = ({ mt, children }) => {
  return (
    <Grid container mt={mt}>
      <Grid
        item
        xs={12}
        minHeight='15em'
        elevation={4}
        backgroundColor='primary.darkMedium'
        borderRadius={4}
      >
        {children}
      </Grid>
    </Grid>
  );
};
