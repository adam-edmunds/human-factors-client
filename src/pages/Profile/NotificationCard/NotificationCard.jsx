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
import useSpeechSynthesis from '../../../hooks/useSpeechSysthesis/useSpeechSysthesis';
import { updateUser } from '../../../redux/reducers/userReducer';
import { getNotificationColor } from '../../../utils/utils';

export const NotificationCard = ({ notification, index }) => {
  const userData = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const { color } = getNotificationColor(notification.type);
  const { isDark, readTextAloud, colorBlindMode } = useSelector(
    (state) => state.settings
  );
  const { speak, cancel } = useSpeechSynthesis();

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
        <Typography
          variant='h5'
          onMouseOver={() =>
            readTextAloud && speak({ text: notification.title })
          }
          onMouseOut={() => cancel()}
        >
          {notification.title}
        </Typography>
        <Typography
          variant='subtitle'
          onMouseOver={() =>
            readTextAloud && speak({ text: notification.time })
          }
          onMouseOut={() => cancel()}
        >
          {notification.time}
        </Typography>
      </Stack>
      <Divider
        color={isDark ? 'white' : 'black'}
        variant='fullWidth'
        sx={{ mb: 1 }}
      />
      <Typography
        onMouseOver={() => readTextAloud && speak({ text: notification.body })}
        onMouseOut={() => cancel()}
      >
        {notification.body}
      </Typography>
      <Stack direction='row' mt={1}>
        {!notification.viewed && (
          <Button
            variant='outlined'
            onClick={handleConfirm}
            sx={{
              textTransform: 'none',
              borderColor: colorBlindMode ? 'black' : 'primary.button.border',
              color: colorBlindMode
                ? isDark
                  ? 'white'
                  : 'black'
                : 'primary.button.color',
              '&:hover': {
                borderColor: colorBlindMode
                  ? 'black'
                  : 'primary.button.hover.border',
                color: colorBlindMode ? 'white' : 'primary.button.hover.color',
                backgroundColor: colorBlindMode
                  ? '#1c1c1c'
                  : 'primary.button.hover.background',
              },
            }}
            onMouseOver={() =>
              readTextAloud &&
              speak({ text: 'button to mark notification as red' })
            }
            onMouseOut={() => cancel()}
          >
            Confirm
          </Button>
        )}
        <Grid container justifyContent='flex-end'>
          <Chip
            label={capitalize(notification.type)}
            sx={{
              backgroundColor: colorBlindMode ? 'black' : color,
              color: 'white',
              fontWeight: 600,
            }}
            onMouseOver={() =>
              readTextAloud && speak({ text: notification.type })
            }
            onMouseOut={() => cancel()}
          />
        </Grid>
      </Stack>
    </Box>
  );
};
