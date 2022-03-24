import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardActionArea from '@mui/material/CardActionArea';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Stack,TextField} from '@mui/material';
import { UpdateModal } from '../pages';
import { Row } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default class CardProf extends React.Component {
  state = {
    prop: [],
    isOpen : false,
    title: "",
    description: ""
  };

  

  toggleModal=() =>{
    this.setState({isOpen:!this.state.isOpen});
  
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/cour/').then((res) => {
      const prop = res.data.response;
      this.setState({ prop });
    });
  }
  update(id, e) {
    e.preventDefault();
    const courseID = id;
    axios.post('http://localhost:5000/api/cour/update', 
    {"courseID":courseID,"title":this.state.title,"description":this.state.description})
    .then((res) => {
      console.log(res);
      console.log(res.data);
      
    });
  }
  deleteRow(id, e) {
    e.preventDefault();
    const courseID = id;
    axios.post('http://localhost:5000/api/cour/delete', {"courseID":id}).then((res) => {
      console.log(res);
      console.log(res.data);
      const prop = this.state.prop.filter((item) => item._id !== id);
      this.setState({ prop });
    });
  }


  render() {
    return (
      <Container>
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          paddingTop={2}
          sx={{ mb: 5 }}
        >
          {this.state.prop.map((course) => (
            <Card sx={{ maxWidth: 345 ,  my: 3}} direction="row" spacing={1} >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={course.title}
                subheader="September 14, 2021"
              />
              <CardActionArea component={RouterLink} to="/dashboard/addChapter">
                <CardMedia
                  component="img"
                  sx={{ width: 345, height: 200 }}
                  image={'http://localhost:5000/' + course.idPhoto}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <br />
              <Stack direction="row" alignItems="center" justifyContent="space-around" mb={5}>
                <div>
                  <Dialog open={this.state.isOpen} onClose={this.toggleModal}>
                    <DialogTitle>Add new chapter</DialogTitle>
                    <DialogContent>
                      <DialogContentText>Please insert your title</DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="title"
                        type="text"
                        fullWidth
                        value={course.title}
                        variant="standard"
                        onChange={(e) => this.setState({title:e.target.value})}
                      />
                      <DialogContentText>Please insert your description</DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        label="description"
                        type="text"
                        fullWidth
                        value={course.description}
                        variant="standard"
                        onChange={(e) => this.setState({description:e.target.value})}
                      />
                      
                      
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.toggleModal}>Cancel</Button>
                      <Button onClick={(e)=>this.update(course._id,e)}>update</Button>
                    </DialogActions>
                  </Dialog>
                </div>
                

                <Button
                
                  onClick={this.toggleModal}
                  variant="outlined"
                  color="success"
                >
                  update
                </Button>
                
                <Button
                  onClick={(e) => this.deleteRow(course._id, e)}
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
                </Stack>
            </Card>
          ))}
        </Stack>
      </Container>
    );
  }
}
