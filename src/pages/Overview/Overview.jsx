/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Chip, Grid, Paper, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { capitalize, map } from 'lodash';
import { useSnackbar } from 'notistack';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '../../components';
import useSpeechSynthesis from '../../hooks/useSpeechSysthesis/useSpeechSysthesis';
import { getScheduleColor } from '../../utils/utils';
dayjs.extend(advancedFormat);

export const Overview = () => {
  const data = useSelector((state) => state.schedule.currentData);
  const [currentData, setCurrentData] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const { readTextAloud, colorBlindMode } = useSelector(
    (state) => state.settings
  );
  const { speak, cancel } = useSpeechSynthesis();

  useEffect(() => {
    let tempCurrentData = { collections: {} };
    for (const schedule of data) {
      for (const collection of schedule.collections) {
        if (!(collection.time in tempCurrentData.collections)) {
          tempCurrentData.collections[collection.time] = [
            {
              ...collection,
              name: schedule.collector,
            },
          ];
        } else {
          tempCurrentData.collections[collection.time].push({
            ...collection,
            name: schedule.collector,
          });
        }
      }
    }
    setCurrentData(tempCurrentData);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      const num = Math.floor(Math.random() * 10);
      if (num === 8) {
        enqueueSnackbar('Schedule Updated by another user', {
          variant: 'success',
        });
      } else if (num === 3) {
        enqueueSnackbar('Schedule Removed by another user', {
          variant: 'error',
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container mt={{ xs: 2, md: 0 }}>
      <Grid
        container
        p={2}
        justifyContent='center'
        sx={{
          backgroundColor: 'primary.medium',
          borderRadius: '16px 16px 0 0',
        }}
      >
        <Stack justifyContent='center' alignItems='center'>
          <Typography
            variant='h4'
            fontWeight={500}
            onMouseOver={() => readTextAloud && speak({ text: 'schedule' })}
            onMouseOut={() => cancel()}
          >
            Schedule
          </Typography>
          <Typography
            variant='h6'
            fontWeight={500}
            onMouseOver={() =>
              readTextAloud &&
              speak({
                text: dayjs(new Date('2022-12-01')).format('Do MMMM YYYY'),
              })
            }
            onMouseOut={() => cancel()}
          >
            {dayjs(new Date('2022-12-01')).format('Do MMMM YYYY')}
          </Typography>
        </Stack>
      </Grid>
      <Grid container>
        <Grid item xs={12} lg={2} sx={{ borderRight: '1px solid grey' }}>
          <Paper
            elevation={0}
            sx={{
              height: '100%',
              display: 'flex',
              backgroundColor: 'transparent',
            }}
          >
            <Grid container>
              {map(currentData.collections, (time) => {
                for (const route of time) {
                  return (
                    <Grid
                      container
                      item
                      xs={12}
                      key={route.id}
                      justifyContent='center'
                      alignItems='center'
                      sx={{
                        borderTop: '1px solid grey',
                      }}
                    >
                      <Typography
                        variant='h6'
                        fontWeight={600}
                        textAlign='center'
                        onMouseOver={() =>
                          readTextAloud &&
                          speak({
                            text: dayjs(route.time * 1000).format('h:mm A'),
                          })
                        }
                        onMouseOut={() => cancel()}
                      >
                        {dayjs(route.time * 1000).format('h:mm A')}
                      </Typography>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={10} pt={4}>
          <Paper
            elevation={0}
            sx={{
              height: '100%',
              display: 'flex',
              backgroundColor: 'transparent',
            }}
          >
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              spacing={4}
            >
              {map(currentData.collections, (time) => {
                return (
                  <Grid
                    item
                    xs={12}
                    key={time.id}
                    pb={4}
                    sx={{
                      borderTop: '1px solid grey',
                    }}
                  >
                    <Stack
                      direction='row'
                      spacing={2}
                      justifyContent='space-evenly'
                    >
                      {time.map((route) => {
                        return (
                          <Box
                            backgroundColor='primary.medium'
                            p={2}
                            borderRadius={4}
                            minWidth={250}
                            key={route.id}
                          >
                            {route.status === 'inactive' ? (
                              <Box sx={{ minHeight: '96px' }}></Box>
                            ) : (
                              <Fragment>
                                <Typography
                                  variant='h6'
                                  fontWeight={500}
                                  onMouseOver={() =>
                                    readTextAloud &&
                                    speak({ text: 'Collection' + route.id })
                                  }
                                  onMouseOut={() => cancel()}
                                >
                                  Collection #{route.id}
                                </Typography>
                                <Typography
                                  variant='h6'
                                  fontWeight={500}
                                  onMouseOver={() =>
                                    readTextAloud && speak({ text: route.name })
                                  }
                                  onMouseOut={() => cancel()}
                                >
                                  {route.name}
                                </Typography>
                                <Grid container justifyContent='flex-end'>
                                  <Chip
                                    label={capitalize(route.status)}
                                    onMouseOver={() =>
                                      readTextAloud &&
                                      speak({ text: route.status })
                                    }
                                    onMouseOut={() => cancel()}
                                    sx={{
                                      color: 'white',
                                      fontWeight: 600,
                                      backgroundColor: colorBlindMode
                                        ? 'black'
                                        : getScheduleColor(route.status).color,
                                    }}
                                  />
                                </Grid>
                              </Fragment>
                            )}
                          </Box>
                        );
                      })}
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
