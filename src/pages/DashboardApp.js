// material
import {Link as RouterLink} from 'react-router-dom';
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
  Typography,

} from '@mui/material';

// components
import Page from '../components/Page';

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
            Add new lesson 
          </Button>       
        </Stack> 

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
