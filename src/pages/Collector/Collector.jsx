/* eslint-disable react-hooks/exhaustive-deps */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  Container as MuiContainer,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Container } from '../../components';
import useSpeechSynthesis from '../../hooks/useSpeechSysthesis/useSpeechSysthesis';
import { getSchedules } from '../../utils/apiFunctions';
import { NotFound } from '../NotFound';

export const Collector = () => {
  const { id } = useParams();
  const { collectors } = useSelector((state) => state.collectors);
  const { readTextAloud, isDark } = useSelector((state) => state.settings);
  const [loading, setLoading] = useState(false);
  const [collector, setCollector] = useState({});
  const [collectorRoutes, setCollectorRoutes] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

  const { speak, cancel } = useSpeechSynthesis();

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  useEffect(() => {
    setLoading(true);
    let collectorName;
    for (const collector of collectors) {
      if (collector.id === id) {
        setCollector(collector);
        collectorName = collector.firstName;
      }
    }
    const allSchedules = getSchedules();
    const assignedRoutes = [];
    for (const day in allSchedules) {
      for (const route in allSchedules[day]) {
        if (allSchedules[day][route].collector === collectorName) {
          assignedRoutes.push(allSchedules[day][route]);
        }
      }
    }
    setCollectorRoutes(assignedRoutes);
    setSearchedData(assignedRoutes);
    setLoading(false);
  }, [collectors]);

  const search = (e) => {
    const { value } = e.target;
    if (isEmpty(value)) {
      setSearchedData(collectorRoutes);
      return;
    }
    const tempData = [];
    for (const collectorRoute in collectorRoutes) {
      const x = collectorRoutes[collectorRoute];
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

  return loading ? (
    <NotFound />
  ) : (
    <Fragment>
      <Stack
        mt={2}
        direction='row'
        alignItems='center'
        component={NavLink}
        to='/collectors'
        sx={{
          color: 'primary.title',
          textDecoration: 'none',
          transition: '0.25s',
          width: 'fit-content',
          '&:hover': {
            color: 'primary.salmon',
            transition: '0.25s',
          },
        }}
        onMouseOver={() => readTextAloud && speak({ text: 'Go back' })}
        onMouseOut={() => cancel()}
      >
        <ArrowBackIcon />
        <Typography variant='h5' fontWeight={600} sx={{ width: 'inherit' }}>
          Back
        </Typography>
      </Stack>
      <Box
        borderRadius={4}
        mt={1}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark ? 'primary.darkMedium' : '#f5f5f5',
        }}
        onMouseOver={() =>
          readTextAloud && speak({ text: 'Search for an assigned route' })
        }
        onMouseOut={() => cancel()}
      >
        <SearchIcon sx={{ fontSize: '2rem', ml: 1 }} />
        <TextField
          label='Search for an assigned route'
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
        {isEmpty(collector) ? (
          <Grid container p={2} justifyContent='center'>
            <Typography
              variant='h4'
              fontWeight={600}
              ml={2}
              onMouseOver={() => readTextAloud && speak({ text: 'No Data' })}
              onMouseOut={() => cancel()}
            >
              No Data
            </Typography>
          </Grid>
        ) : (
          <MuiContainer p={2} maxWidth={false}>
            <Box p={2}>
              <Typography
                variant='h4'
                fontWeight={600}
                onMouseOver={() =>
                  readTextAloud && speak({ text: 'collector' })
                }
                onMouseOut={() => cancel()}
              >
                Collector
              </Typography>
            </Box>

            <Stack spacing={3} mb={4} p={2}>
              <Stack direction='row'>
                <Typography
                  variant='h5'
                  onMouseOver={() =>
                    readTextAloud &&
                    speak({ text: collector.firstName + collector.lastName })
                  }
                  onMouseOut={() => cancel()}
                >
                  {collector.firstName} {collector.lastName}
                </Typography>
                <Grid container justifyContent='flex-end'>
                  <Avatar
                    onMouseOver={() =>
                      readTextAloud &&
                      speak({ text: 'Collector profile picture' })
                    }
                    onMouseOut={() => cancel()}
                  />
                </Grid>
              </Stack>
              <Box
                backgroundColor='primary.medium'
                borderRadius={4}
                p={2}
                minHeight='15vh'
              >
                <Typography
                  variant='h5'
                  fontWeight={600}
                  mb={2}
                  onMouseOver={() =>
                    readTextAloud && speak({ text: 'preferences' })
                  }
                  onMouseOut={() => cancel()}
                >
                  Preferences
                </Typography>
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <Typography
                      onMouseOver={() =>
                        readTextAloud &&
                        speak({ text: 'city' + collector.preferences.location })
                      }
                      onMouseOut={() => cancel()}
                    >
                      <b>City:</b> {collector.preferences.location}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      onMouseOver={() =>
                        readTextAloud &&
                        speak({
                          text: 'start time' + collector.preferences.startTime,
                        })
                      }
                      onMouseOut={() => cancel()}
                    >
                      <b>Start:</b> {collector.preferences.startTime}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      onMouseOver={() =>
                        readTextAloud &&
                        speak({
                          text: 'end time' + collector.preferences.endTime,
                        })
                      }
                      onMouseOut={() => cancel()}
                    >
                      <b>End:</b> {collector.preferences.endTime}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              {isEmpty(searchedData) ? (
                <Typography
                  variant='h4'
                  fontWeight={600}
                  onMouseOver={() =>
                    readTextAloud && speak({ text: 'No data' })
                  }
                  onMouseOut={() => cancel()}
                >
                  No data
                </Typography>
              ) : (
                searchedData.map((route) => {
                  return (
                    <Box
                      backgroundColor='primary.medium'
                      borderRadius={4}
                      p={2}
                      key={route.id}
                    >
                      <Typography
                        variant='h6'
                        fontWeight={600}
                        onMouseOver={() =>
                          readTextAloud && speak({ text: 'Route ' + route.id })
                        }
                        onMouseOut={() => cancel()}
                      >
                        Route: #{route.id}
                      </Typography>
                      <Typography
                        variant='body1'
                        onMouseOver={() =>
                          readTextAloud &&
                          speak({ text: 'location ' + route.location })
                        }
                        onMouseOut={() => cancel()}
                      >
                        <b>Location</b>: {route.location}
                      </Typography>
                      <Typography
                        variant='body1'
                        onMouseOver={() =>
                          readTextAloud &&
                          speak({
                            text:
                              'Date ' +
                              new Date(route.time * 1000).toLocaleDateString(
                                'en-GB',
                                dateOptions
                              ),
                          })
                        }
                        onMouseOut={() => cancel()}
                      >
                        <b>Date</b>:{' '}
                        {new Date(route.time * 1000).toLocaleDateString(
                          'en-GB',
                          dateOptions
                        )}
                      </Typography>
                    </Box>
                  );
                })
              )}
            </Stack>
          </MuiContainer>
        )}
      </Container>
    </Fragment>
  );
};
