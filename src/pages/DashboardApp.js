// material

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
import { Link as RouterLink,Navigate,useNavigate } from 'react-router-dom';

import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

import { useEffect } from 'react';
import { CardProf, CardStudent } from '.';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  
     const navigate = useNavigate();

  var c;

  c=sessionStorage.getItem("firstname")

console.log(c)
if (c ==null)
{
console.log("fefefefefe")
  //navigate('/login',{replace:true});
  return(
    <Navigate replace to ="/login" />
  )
}
  
 

  
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
          
          <CardProf/>
          <CardStudent/>
         
        </Stack>
     

      </Container>
    </Page>
  );
}
