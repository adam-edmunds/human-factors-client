import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSpeechSynthesis from '../../../hooks/useSpeechSysthesis/useSpeechSysthesis';

dayjs.extend(advancedFormat);

export const Clock = () => {
  const [date, setDate] = useState(dayjs(new Date()));
  const readTextAloud = useSelector((state) => state.settings.readTextAloud);
  const { speak, cancel } = useSpeechSynthesis();

  useEffect(() => {
    const interval = setInterval(() => setDate(dayjs(new Date())), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Stack>
      <Typography
        fontWeight={600}
        color='primary.title'
        onMouseOver={() =>
          readTextAloud && speak({ text: date.format('dddd Do MMMM YYYY') })
        }
        onMouseOut={() => cancel()}
      >
        {date.format('dddd Do MMMM YYYY')}
      </Typography>
      <Typography
        fontWeight={600}
        color='primary.title'
        onMouseOver={() =>
          readTextAloud && speak({ text: date.format('h:mm A') })
        }
        onMouseOut={() => cancel()}
      >
        {date.format('h:mm A')}
      </Typography>
    </Stack>
  );
};
