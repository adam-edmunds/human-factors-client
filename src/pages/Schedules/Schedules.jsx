/* eslint-disable react-hooks/exhaustive-deps */
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Chip,
  Grid,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import { capitalize, isEmpty } from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';
import { updateDate } from '../../redux/reducers/scheduleReducer';
import { getScheduleColor } from '../../utils/utils';

const DatePicker = styled(StaticDatePicker)((theme) => ({
  color: 'primary.title',
  minHeight: '40vh',
  '& .css-epd502': {
    overflowX: 'visible !important',
  },
  '& .MuiCalendarPicker-root': {
    overflowX: 'visible !important',
  },
  // Labels
  '& .MuiDayPicker-weekDayLabel': {
    color: theme.theme.palette.primary.title,
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  // background
  '& .MuiPickerStaticWrapper-content': {
    backgroundColor: 'transparent',
    minWidth: '0px',
  },
  // Day
  '& .MuiPickersDay-root': {
    backgroundColor: theme.theme.palette.primary.darkMedium,
    color: theme.theme.palette.primary.title,
    fontWeight: 'bold',
    transition: '0.25s',
    // Selected Day
    '&.Mui-selected': {
      backgroundColor: '#808080 !important',
      fontWeight: 'bold',
      color: `black !important`,
    },
    // Hovered Day
    '&:hover': {
      backgroundColor: 'grey !important',
      transition: '0.25s',
      color: `black !important`,
    },
    // Remove border on active day
    '&:not(.Mui-selected)': {
      border: 'none',
    },
    // Clicked Day
    '&:focus': {
      backgroundColor: `grey !important`,
      color: `black !important`,
    },
  },
  '& .MuiPickersArrowSwitcher-button': {
    color: theme.theme.palette.primary.title,
  },
  '& .MuiPickersCalendarHeader-switchViewButton': {
    color: theme.theme.palette.primary.title,
  },
  '& .PrivatePickersMonth-root': {
    transition: '0.25s',
    '&:hover': {
      backgroundColor: '#43444D',
      transition: '0.25s',
      color: `${theme.theme.palette.primary.title} !important`,
      fontWeight: 'bold',
    },
    '&:focus': {
      backgroundColor: '#2C2D34',
      transition: '0.25s',
    },
    '&.Mui-selected': {
      backgroundColor: '#43444D !important',
      color: 'white !important',
      fontWeight: 'bold',
    },
  },
}));

export const Schedules = () => {
  const { date, data } = useSelector((state) => state.schedule);
  const [searchedData, setSearchedData] = useState(data);
  const { isDark, colorBlindMode, readTextAloud } = useSelector(
    (state) => state.settings
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { speak, cancel } = useSpeechSynthesis();

  useEffect(() => {
    setSearchedData(data);
  }, [data]);

  const search = (e) => {
    const { value } = e.target;
    if (isEmpty(value)) {
      setSearchedData(data);
      return;
    }
    const tempData = [];
    for (const route in data) {
      const x = data[route];
      for (const y in x) {
        const data2 = x[y];
        if (
          typeof data2 !== 'object' &&
          data2.toLowerCase().includes(value.toLowerCase())
        ) {
          tempData.push(x);
          break;
        }
      }
    }
    setSearchedData(tempData);
  };

  return (
    <Fragment>
      <Box
        borderRadius={4}
        mt={{ xs: 2, md: 0 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark ? 'primary.darkMedium' : '#f5f5f5',
        }}
        onMouseOver={() =>
          readTextAloud && speak({ text: 'search for a route' })
        }
        onMouseOut={() => cancel()}
      >
        <SearchIcon sx={{ fontSize: '2rem', ml: 1 }} />
        <TextField
          label='Search for a route'
          type='search'
          variant='filled'
          onInput={search}
          fullWidth
          elevation={0}
          sx={{
            borderRadius: 4,
            color: 'primary.title',
            '& .MuiFilledInput-root:before': {
              border: 'none !important',
            },
            '& .MuiFilledInput-root:after': {
              border: 'none',
            },
            '& .MuiFilledInput-root:hover': {
              border: 'none',
            },
            '& .MuiInputLabel-root': {
              color: 'primary.title',
              '&.Mui-focused': {
                color: 'primary.title',
              },
            },
          }}
          inputProps={{
            style: {
              fontSize: '1.25rem',
              background: isDark ? '#33343B' : '#f5f5f5',
              borderRadius: 8,
            },
          }}
        />
      </Box>
      <Container mt={2}>
        <Grid container>
          <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }} p={2}>
            {isEmpty(searchedData) ? (
              <Typography
                variant='h5'
                fontWeight={600}
                onMouseOver={() =>
                  readTextAloud &&
                  speak({ text: 'No Data for' + dayjs(date).format('LL') })
                }
                onMouseOut={() => cancel()}
              >
                No Data for {dayjs(date).format('LL')}
              </Typography>
            ) : (
              <Stack spacing={2}>
                {searchedData.map((schedule) => {
                  return (
                    <Box
                      key={schedule.id}
                      backgroundColor='primary.medium'
                      borderRadius={2}
                      p={2}
                      onClick={() => navigate('/route/' + schedule.id)}
                      sx={{
                        '&:hover': {
                          backgroundColor: isDark ? '#5F616F' : 'darkgrey',
                          transition: '0.25s',
                          cursor: 'pointer',
                        },
                      }}
                    >
                      <Stack direction='row'>
                        <Typography
                          variant='h6'
                          fontWeight={600}
                          onMouseOver={() =>
                            readTextAloud && speak({ text: 'route' })
                          }
                          onMouseOut={() => cancel()}
                        >
                          Route
                        </Typography>
                        <Grid container justifyContent='flex-end'>
                          <Typography
                            variant='h6'
                            fontWeight={600}
                            onMouseOver={() =>
                              readTextAloud && speak({ text: schedule.id })
                            }
                            onMouseOut={() => cancel()}
                          >
                            #{schedule.id}
                          </Typography>
                        </Grid>
                      </Stack>
                      <Typography
                        onMouseOver={() =>
                          readTextAloud && speak({ text: schedule.collector })
                        }
                        onMouseOut={() => cancel()}
                      >
                        {schedule.collector}
                      </Typography>
                      <Grid container justifyContent='flex-end'>
                        <Chip
                          label={capitalize(schedule.status)}
                          sx={{
                            fontWeight: 'bold',
                            backgroundColor: colorBlindMode
                              ? 'black'
                              : getScheduleColor(schedule.status).color,
                            color: 'white',
                            cursor: 'pointer',
                          }}
                          onMouseOver={() =>
                            readTextAloud && speak({ text: schedule.status })
                          }
                          onMouseOut={() => cancel()}
                        />
                      </Grid>
                    </Box>
                  );
                })}
              </Stack>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            order={{ xs: 1, md: 2 }}
            onMouseOver={() => readTextAloud && speak({ text: 'date picker' })}
            onMouseOut={() => cancel()}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                displayStaticWrapperAs='desktop'
                openTo='day'
                value={date}
                onChange={(newValue) => {
                  dispatch(updateDate(newValue.format('YYYY-MM-DD')));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onMouseOver={() =>
                      readTextAloud && speak({ text: 'date picker' })
                    }
                    onMouseOut={() => cancel()}
                  />
                )}
                views={['month', 'day']}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};
