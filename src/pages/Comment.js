import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {Box,Stack,Card,Button} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { AddCommentModal } from '../pages';
import { green } from '@mui/material/colors';
import AddNewCard from './AddNewCard';
import Students from './Student';
import AddChapter from './AddChapter';
import SeeAllChapter from './SeeAllChapter';
import { AddComment } from '@mui/icons-material';
import AddChapterNew from './addchapternew';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Commentaire() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [prop,setProp] = React.useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const getCommentaires = () => {
    var data2 = JSON.stringify({
      "lessons": JSON.parse(sessionStorage.getItem("class"))._id
   });
    var config2 = {
      method: 'post',
      url: 'http://localhost:5000/api/commantaire/findbylesson',
      headers: { 
          'Content-Type': 'application/json',
        
      },
      data: data2
    };
    axios(config2)
  .then(function (response1) {
   
    
    setProp(response1.data.data)
    console.log(response1.data.data)
   
  })
  .catch(function (error) {
    console.log(error);
  });
  };
  const deletecommentaire = (id) => {
    var data2 = JSON.stringify({
      "commantaireID": id
   });
    var config2 = {
      method: 'post',
      url: 'http://localhost:5000/api/commantaire/delete',
      headers: { 
          'Content-Type': 'application/json',
        
      },
      data: data2
    };
    axios(config2)
  .then(function (response1) {
   
    
    window.location.reload()
    console.log(response1.data.data)
   
  })
  .catch(function (error) {
    console.log(error);
  });
  };
  React.useEffect(()=>{
    getCommentaires()
  },[])

  return (
    <Stack spacing={3}>
         <AddCommentModal />
          <Stack direction="column" alignItems="" justifyContent="space-around" mb={5} spacing={3}>
           {prop.map((commentaire)=>(
              <Card sx={{ maxWidth: 1000 }}>
                  <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                  
                  </IconButton>
                }
                title={commentaire.user}
                subheader={commentaire.created}
              />
                <CardContent >
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0} spacing={3}>
                  <Typography paragraph>{commentaire.commantaire}</Typography>{' '}
                  {commentaire.user == sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname")?<Button
                   
                   variant="outlined"
                   color="error"
                   onClick={(e)=>deletecommentaire(commentaire._id)}
                 >
                   Delete
                 </Button>:
                 <Button></Button>
                 }
                 </Stack>
                </CardContent>
                
              </Card>
           ))}
          </Stack>
          </Stack>
  );
}
