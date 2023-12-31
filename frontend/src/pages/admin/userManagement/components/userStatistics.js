import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { content } from '../content';

const MainCard = lazy(() => import('../../../../components/mainCard/mainCard'));

const UserStatistics = ({ color, title, count, percentage, extra }) => {
  return (
    <MainCard
      border={false}
      sx={{
        margin: '1rem',
        backgroundColor: '#f2f2f2',
        border: '1px solid #e6e6e6',
      }}
      contentSX={{ p: 2.25 }}
    >
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
          </Grid>
          {percentage && (
            <Grid item>
              <Chip
                variant="combined"
                color={color}
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="textSecondary">
          {content.YOU_MADE_EXTRA}{' '}
          <Typography
            component="span"
            variant="caption"
            sx={{ color: `${color || 'primary'}.main` }}
          >
            {extra}
          </Typography>{' '}
          {content.THIS_YEAR}
        </Typography>
      </Box>
    </MainCard>
  );
};

UserStatistics.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

UserStatistics.defaultProps = {
  color: 'primary',
  title: '',
  count: '',
  percentage: 0,
  extra: '',
};

export default UserStatistics;
