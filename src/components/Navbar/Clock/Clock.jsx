import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const Clock = () => {
  const [date, setDate] = useState(new Date());
  const dayOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Stack ml={4}>
      <Typography fontWeight={600} color='primary.title'>
        {date.toLocaleDateString('en-GB', dayOptions)}
      </Typography>
      <Typography fontWeight={600} color='primary.title'>
        {date.toLocaleString('en-US', timeOptions)}
      </Typography>
    </Stack>
  );
};
