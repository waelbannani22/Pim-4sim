import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {Box,Stack} from '@mui/material';
import AddNewCard from './AddNewCard';
import Students from './Student';
import AddChapter from './AddChapter';
import SeeAllChapter from './SeeAllChapter';
import { AddComment } from '@mui/icons-material';
import AddChapterNew from './addchapternew';
import Commentaire from './Comment';
import LessonStudents from './lessonStudent';
import HomeWork from './HomeWork';

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

export default function DetailLesson() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    
    setValue(index);
  };

  return (
    <Stack  alignItems="center"  mb={5} spacing={3}>
    <Box alignItems="center" sx={{ bgcolor: 'background.paper', width: 1000 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab  label="Chapters" {...a11yProps(0)} />
          <Tab label="members" {...a11yProps(1)} />
          <Tab label="Feedbacks" {...a11yProps(2)} />
          <Tab label="Homework" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <AddChapterNew/>
         
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <LessonStudents/>
        </TabPanel>
       
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Commentaire/>
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
          <HomeWork/>
        </TabPanel>
        
      </SwipeableViews>
    </Box>
    </Stack>
  );
}
