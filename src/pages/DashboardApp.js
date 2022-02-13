// material
<<<<<<< Updated upstream
import { Box, Grid, Container, Typography } from '@mui/material';
=======
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import {
  ProductImgStyle,
  Link,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
>>>>>>> Stashed changes
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
import { color } from '@mui/system';
import { red } from '@mui/material/colors';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
<<<<<<< Updated upstream
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
        </Grid>
=======
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
            Add new lesson 
          </Button>       
        </Stack> 
>>>>>>> Stashed changes
      </Container>


      <Container>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lesson name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Go to Lesson</Button>
      </CardActions>
    </Card>
      </Container>
      

    </Page>
  );
}
