import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

export const Clock = () => {
  const [date, setDate] = useState(dayjs(new Date()));

  useEffect(() => {
    const interval = setInterval(() => setDate(dayjs(new Date())), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Stack>
      <Typography fontWeight={600} color='primary.title'>
        {date.format('dddd Do MMMM YYYY')}
      </Typography>
      <Typography fontWeight={600} color='primary.title'>
        {date.format('h:mm A')}
      </Typography>
    </Stack>
  );
};
