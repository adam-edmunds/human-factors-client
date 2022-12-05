/* eslint-disable react-hooks/exhaustive-deps */
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Grid, Stack, TextField, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components';
import useSpeechSynthesis from '../../hooks/useSpeechSysthesis/useSpeechSysthesis';

export const Collectors = () => {
  const isDark = useSelector((state) => state.settings.isDark);
  const { collectors } = useSelector((state) => state.collectors);
  const [searchedData, setSearchedData] = useState(collectors);
  const navigate = useNavigate();
  const readTextAloud = useSelector((state) => state.settings.readTextAloud);
  const { speak, cancel } = useSpeechSynthesis();

  useEffect(() => {
    setSearchedData(collectors);
  }, [collectors]);

  const search = (e) => {
    const { value } = e.target;
    if (isEmpty(value)) {
      setSearchedData(collectors);
      return;
    }
    const tempData = [];
    for (const collector in collectors) {
      const x = collectors[collector];
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
      >
        <SearchIcon sx={{ fontSize: '2rem', ml: 1 }} />
        <TextField
          label='Search for a collector'
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
          onMouseOver={() =>
            readTextAloud && speak({ text: 'Search for a collector' })
          }
          onMouseOut={() => cancel()}
        />
      </Box>
      <Container mt={2}>
        <Grid container p={2}>
          {isEmpty(searchedData) ? (
            <Typography
              variant='h5'
              fontWeight={600}
              onMouseOver={() => readTextAloud && speak({ text: 'No data' })}
              onMouseOut={() => cancel()}
            >
              No Data
            </Typography>
          ) : (
            searchedData.map((collector) => {
              return (
                <Grid
                  item
                  xs={12}
                  key={collector.id}
                  backgroundColor='primary.medium'
                  borderRadius={2}
                  p={2}
                  m={1}
                  onClick={() => navigate('/collector/' + collector.id)}
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
                        readTextAloud && speak({ text: 'collector' })
                      }
                      onMouseOut={() => cancel()}
                    >
                      Collector
                    </Typography>
                    <Grid container justifyContent='flex-end'>
                      <Typography
                        variant='h6'
                        fontWeight={600}
                        onMouseOver={() =>
                          readTextAloud &&
                          speak({ text: 'Collector' + collector.id })
                        }
                        onMouseOut={() => cancel()}
                      >
                        #{collector.id}
                      </Typography>
                    </Grid>
                  </Stack>
                  <Typography
                    onMouseOver={() =>
                      readTextAloud &&
                      speak({
                        text: collector.firstName + collector.lastName,
                      })
                    }
                    onMouseOut={() => cancel()}
                  >
                    {collector.firstName} {collector.lastName}
                  </Typography>
                  <Grid container justifyContent='flex-end'>
                    <Avatar
                      src={collector.picture}
                      onMouseOver={() =>
                        readTextAloud &&
                        speak({
                          text:
                            collector.firstName +
                            collector.lastName +
                            "'s profile picture",
                        })
                      }
                      onMouseOut={() => cancel()}
                    />
                  </Grid>
                </Grid>
              );
            })
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};
