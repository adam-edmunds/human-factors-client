/* eslint-disable react-hooks/exhaustive-deps */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Alert,
  Box,
  Button,
  Container as MuiContainer,
  Divider,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { isEmpty, map } from 'lodash';
import { useSnackbar } from 'notistack';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Container, CustomModal } from '../../components';
import useSpeechSynthesis from '../../hooks/useSpeechSysthesis/useSpeechSysthesis';
import { moveRoute } from '../../redux/reducers/scheduleReducer';
import { NotFound } from '../NotFound';

export const Route = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const routes = useSelector((state) => state.schedule.data);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [routeData, setRouteData] = useState({});
  const [loading, setLoading] = useState(false);
  const { readTextAloud, colorBlindMode, isDark } = useSelector(
    (state) => state.settings
  );
  const { speak, cancel } = useSpeechSynthesis();

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    for (const schedule of routes) {
      if (schedule.id === id) {
        setRouteData(schedule);
      }
    }
    setLoading(false);
  }, [routes]);

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const openModal = (collection, collector) => {
    setModalData({ ...collection, collector });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRouteChange = (newRoute, object) => {
    // delete the name of the collector
    delete object.collector;
    const id = object.id;
    // set copy of routes for editting
    let tempNewRoutes = { ...routes };
    let updatedObject;
    // iterate through all collections in routes
    // if id is same as passed in id update the collection for the route
    for (const index in tempNewRoutes) {
      for (const collection in tempNewRoutes[index].collections) {
        if (tempNewRoutes[index].collections[collection].id === id) {
          const temp = tempNewRoutes[index].collections.filter(
            (item) => item.id !== object.id
          );
          updatedObject = { ...tempNewRoutes[index], collections: temp };
        }
      }
    }
    // update temp routes array with new updated routes values
    // basically deletes the route you want to move
    tempNewRoutes = map(tempNewRoutes, (item) => {
      let found = false;
      for (const collection of item.collections) {
        if (collection.id === id) {
          found = true;
          break;
        }
      }
      if (found) {
        return updatedObject;
      } else {
        return item;
      }
    });
    // add the collection to the new route and update state and send feedback to client
    for (const index in tempNewRoutes) {
      if (tempNewRoutes[index].id === newRoute) {
        let updatedRoute = { ...tempNewRoutes[index] };
        updatedRoute.collections = [
          ...tempNewRoutes[index].collections,
          object,
        ];
        const updatedRoutes = tempNewRoutes.map((route, i) =>
          i.toString() === index ? updatedRoute : route
        );
        dispatch(moveRoute(updatedRoutes));
        setOpen(false);
        enqueueSnackbar('Route changed successfully', { variant: 'success' });
      }
    }
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
        to='/schedules'
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
        onMouseOver={() =>
          readTextAloud && speak({ text: 'click to go back to schedules page' })
        }
        onMouseOut={() => cancel()}
      >
        <ArrowBackIcon />
        <Typography variant='h5' fontWeight={600} sx={{ width: 'inherit' }}>
          Back
        </Typography>
      </Stack>
      <Container mt={1}>
        {!routeData.collections ? (
          <Grid container p={2} justifyContent='center'>
            <Typography
              variant='h4'
              fontWeight={600}
              ml={2}
              onMouseOver={() => readTextAloud && speak({ text: 'no data' })}
              onMouseOut={() => cancel()}
            >
              No Data
            </Typography>
          </Grid>
        ) : (
          <Fragment>
            <Box
              p={2}
              onMouseOver={() =>
                readTextAloud && speak({ text: 'route' + routeData.id })
              }
              onMouseOut={() => cancel()}
            >
              <Typography variant='h4' fontWeight={600} ml={2}>
                Route: {routeData.id}
              </Typography>
            </Box>
            <MuiContainer maxWidth='false'>
              <Stack spacing={3} mb={4}>
                {routeData.collections?.map((collection) => {
                  return (
                    <Stack
                      p={2}
                      backgroundColor='primary.medium'
                      borderRadius={4}
                      key={collection.id}
                      onClick={() => openModal(collection, routeData.collector)}
                      sx={{
                        transition: '0.25s',
                        '&:hover': {
                          transition: '0.25s',
                          backgroundColor: isDark ? '#5F616F' : 'darkgrey',
                          cursor: 'pointer',
                        },
                      }}
                    >
                      <Typography
                        variant='h6'
                        fontWeight={600}
                        onMouseOver={() =>
                          readTextAloud &&
                          speak({ text: 'collection' + collection.id })
                        }
                        onMouseOut={() => cancel()}
                      >
                        Collection #{collection.id}
                      </Typography>
                      <Typography
                        onMouseOver={() =>
                          readTextAloud && speak({ text: routeData.collector })
                        }
                        onMouseOut={() => cancel()}
                      >
                        {routeData.collector}
                      </Typography>
                      <Typography
                        onMouseOver={() =>
                          readTextAloud &&
                          speak({ text: collection.location.city })
                        }
                        onMouseOut={() => cancel()}
                      >
                        {collection.location.city}
                      </Typography>
                      <Typography
                        onMouseOver={() =>
                          readTextAloud &&
                          speak({
                            text: new Date(
                              collection.time * 1000
                            ).toLocaleDateString('en-GB', dateOptions),
                          })
                        }
                        onMouseOut={() => cancel()}
                      >
                        {new Date(collection.time * 1000).toLocaleDateString(
                          'en-GB',
                          dateOptions
                        )}
                      </Typography>
                      <Typography
                        onMouseOver={() =>
                          readTextAloud &&
                          speak({
                            text: new Date(
                              collection.time * 1000
                            ).toLocaleTimeString('en-US'),
                          })
                        }
                        onMouseOut={() => cancel()}
                      >
                        {new Date(collection.time * 1000).toLocaleTimeString(
                          'en-US'
                        )}
                      </Typography>
                    </Stack>
                  );
                })}
              </Stack>
            </MuiContainer>
          </Fragment>
        )}
      </Container>
      {!isEmpty(modalData) && (
        <CustomModal
          open={open}
          close={handleClose}
          layout={
            <Box
              sx={(theme) => {
                return {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: { xs: '75vw', xl: '55vw' },
                  border: '1px solid #000',
                  boxShadow: 24,
                  color: theme.palette.primary.title,
                  p: 6,
                  backgroundColor: theme.palette.primary.darkMedium,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '12px',
                  overflowY: 'auto',
                  height: '75%',
                  display: 'block',
                  '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                    backgroundColor: 'transparent',
                    width: 16,
                  },
                  '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                    borderRadius: '16px',
                    backgroundClip: 'content-box',
                    border: '6px solid transparent',
                  },
                };
              }}
              textAlign='center'
              justifyContent='center'
              alignItems='center'
              boxShadow={5}
              color='white'
            >
              <Typography
                variant='h3'
                mb={1}
                onMouseOver={() =>
                  readTextAloud && speak({ text: 'collection details' })
                }
                onMouseOut={() => cancel()}
              >
                Collection Details
              </Typography>
              <Divider color='black' />

              <Box mt={1}>
                <Typography
                  variant='h5'
                  mb={1}
                  onMouseOver={() =>
                    readTextAloud && speak({ text: 'id' + modalData.id })
                  }
                  onMouseOut={() => cancel()}
                >
                  <b>ID:</b> {modalData.id}
                </Typography>
                <Typography
                  variant='h5'
                  mb={1}
                  onMouseOver={() =>
                    readTextAloud &&
                    speak({
                      text:
                        'date' +
                        new Date(modalData.time * 1000).toLocaleDateString(
                          'en-GB',
                          dateOptions
                        ),
                    })
                  }
                  onMouseOut={() => cancel()}
                >
                  <b>Date:</b>{' '}
                  {new Date(modalData.time * 1000).toLocaleDateString(
                    'en-GB',
                    dateOptions
                  )}
                </Typography>
                <Typography
                  variant='h5'
                  mb={1}
                  onMouseOver={() =>
                    readTextAloud &&
                    speak({
                      text:
                        'time' +
                        new Date(modalData.time * 1000).toLocaleTimeString(
                          'en-US'
                        ),
                    })
                  }
                  onMouseOut={() => cancel()}
                >
                  <b>Time:</b>{' '}
                  {new Date(modalData.time * 1000).toLocaleTimeString('en-US')}
                </Typography>
                <Typography
                  variant='h5'
                  mb={1}
                  onMouseOver={() =>
                    readTextAloud &&
                    speak({
                      text: `Address ${modalData.location.street},
  ${modalData.location.city},
  ${modalData.location.county},
  ${modalData.location.postcode}`,
                    })
                  }
                  onMouseOut={() => cancel()}
                >
                  <b>Address:</b>{' '}
                  {`${modalData.location.street},
                    ${modalData.location.city},
                    ${modalData.location.county},
                    ${modalData.location.postcode}`}
                </Typography>
                <Typography
                  variant='h5'
                  mb={1}
                  onMouseOver={() =>
                    readTextAloud &&
                    speak({ text: 'collector' + modalData.collector })
                  }
                  onMouseOut={() => cancel()}
                >
                  <b>Collector:</b> {modalData.collector}
                </Typography>
                <Divider color='black' />
                <Typography
                  variant='h5'
                  mb={1}
                  mt={1}
                  fontWeight={600}
                  onMouseOver={() =>
                    readTextAloud && speak({ text: 'reschedule collection' })
                  }
                  onMouseOut={() => cancel()}
                >
                  Reschedule Collection
                </Typography>
                {modalData.canReschedule ? (
                  <Box mb={2}>
                    <Select
                      value={routeData.id}
                      onChange={(e) =>
                        handleRouteChange(e.target.value, modalData)
                      }
                      autoWidth
                      sx={{
                        color: 'primary.title',
                      }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            backgroundColor: isDark ? '#33343b' : 'white',
                          },
                        },
                      }}
                      onMouseOver={() =>
                        readTextAloud && speak({ text: 'select new route' })
                      }
                      onMouseOut={() => cancel()}
                    >
                      {routes.map((route) => {
                        return (
                          <MenuItem value={route.id} key={route.id}>
                            {route.id}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                ) : (
                  <Alert
                    severity='error'
                    sx={{
                      backgroundColor: 'primary.error.background',
                      color: 'primary.error.color',
                    }}
                    onMouseOver={() =>
                      readTextAloud &&
                      speak({
                        text: 'ERROR: this collection cannot be rescheduled',
                      })
                    }
                    onMouseOut={() => cancel()}
                  >
                    <Typography fontWeight={600}>
                      This collection cannot be rescheduled!
                    </Typography>
                  </Alert>
                )}
              </Box>
              <Divider color='black' sx={{ mt: 2 }} />
              <Button
                sx={{
                  color: 'white',
                  mt: 4,
                  fontWeight: 500,
                  backgroundColor: colorBlindMode ? 'black' : '#0065e8',
                  '&:hover': {
                    backgroundColor: colorBlindMode ? '#1C1C1C' : '#4C98FA',
                  },
                }}
                variant='contained'
                onClick={() => setOpen(false)}
                onMouseOver={() =>
                  readTextAloud && speak({ text: 'button to close modal' })
                }
                onMouseOut={() => cancel()}
              >
                Close
              </Button>
            </Box>
          }
        />
      )}
    </Fragment>
  );
};
