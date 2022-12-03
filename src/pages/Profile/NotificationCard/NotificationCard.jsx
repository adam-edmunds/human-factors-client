import {
  Box,
  Button,
  capitalize,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/reducers/userReducer';
import { getNotificationColor } from '../../../utils/utils';

export const NotificationCard = ({ notification, index }) => {
  const userData = useSelector((state) => state.user.data);
  const isDark = useSelector((state) => state.settings.isDark);
  const dispatch = useDispatch();
  const { color, textColor } = getNotificationColor(notification.type);

  const handleConfirm = (e) => {
    e.preventDefault();
    const updatedNotification = { ...notification, viewed: true };
    const updatedNotifications = userData.notifications.map((notification, i) =>
      i === index ? updatedNotification : notification
    );
    const newObject = { ...userData, notifications: updatedNotifications };
    dispatch(updateUser(newObject));
  };

  return (
    <Box elevation={1} backgroundColor='primary.medium' borderRadius={2} p={2}>
      <Stack mb={1}>
        <Typography variant='h5'>{notification.title}</Typography>
        <Typography variant='subtitle'>{notification.time}</Typography>
      </Stack>
      <Divider
        color={isDark ? 'white' : 'black'}
        variant='fullWidth'
        sx={{ mb: 1 }}
      />
      <Typography>{notification.body}</Typography>
      <Stack direction='row' mt={1}>
        {!notification.viewed && (
          <Button
            variant='outlined'
            onClick={handleConfirm}
            sx={{
              textTransform: 'none',
              borderColor: 'primary.button.border',
              color: 'primary.button.color',
              '&:hover': {
                borderColor: 'primary.button.hover.border',
                color: 'primary.button.hover.color',
                backgroundColor: 'primary.button.hover.background',
              },
            }}
          >
            Confirm
          </Button>
        )}
        <Grid container justifyContent='flex-end'>
          <Chip
            label={capitalize(notification.type)}
            sx={{
              backgroundColor: color,
              color: textColor,
              fontWeight: 600,
            }}
          />
        </Grid>
      </Stack>
    </Box>
  );
};
