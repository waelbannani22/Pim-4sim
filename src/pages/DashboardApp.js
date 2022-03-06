// material
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Stack,
  Button,
  Container,
  Typography
} from '@mui/material';

// components

import Page from '../components/Page';
import { CardProf, CardStudent } from '../pages';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Lessons
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/card"
            startIcon={<Icon icon={plusFill} />}
          >
            Add new card
          </Button>
        </Stack>
      </Container>

      <Container>

      <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="flex-start"
          sx={{ mb: 5 }}
          spacing={1} flexShrink={0}
        >
          
          <CardProf />
          <CardStudent/>
         
        </Stack>
     

      </Container>
    </Page>
  );
}
