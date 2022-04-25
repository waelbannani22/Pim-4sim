import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Container, Modal, Stack } from '@mui/material';
import { ChapterModal } from '../pages';
import { PdfViewer } from '../pages';
import axios from 'axios';
import PDFViewer from 'pdf-viewer-reactjs';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { AddCommentModal } from '../pages';
import { green } from '@mui/material/colors';


export default class AddComment extends React.Component {
  state = {
    prop: []
  };

  addChapterHandler = async (e) => {
    e.preventDefault();

    try {
      var data2 = JSON.stringify({
        commantaire: commantaire,
        user : sessionStorage.getItem("id")
      });

      var config2 = {
        method: 'post',
        url: 'http://localhost:5000/api/commantaire/add',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data2
      };
      console.log(config2);
      axios(config2)
        .then(function (response1) {
          console.log('ssucess added');

          // navigate('/dashboard/app', { replace: false });
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });

      //console.log(data);
    } catch (error) {
      console.log('failure');
    }
  };

  componentDidMount() {
    var data2 = JSON.stringify({
      "lessons": JSON.parse(sessionStorage.getItem("class"))._id
     

    });
    const headers = { 
      'Content-Type': 'application/json',
  };
    axios.post('http://localhost:5000/api/commantaire/findbylesson',data2,{headers}).then((res) => {
      const prop = res.data.data;
      this.setState({ prop });
    });
  }
  deleteRow(id, e) {
    e.preventDefault();
    const commantaireID = id;
    axios
      .post('http://localhost:5000/api/commantaire/delete', { commantaireID: id })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        const prop = this.state.prop.filter((item) => item._id !== id);
        this.setState({ prop });
      });
  }
  render() {
    return (
     
      <Stack spacing={3}>
          <AddCommentModal />
          <Stack direction="column" alignItems="" justifyContent="space-around" mb={5} spacing={3}>
            {this.state.prop.map((commantaire) => (
              <Card sx={{ maxWidth: 1000 }}>
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
                title={commantaire.user}
                subheader={commantaire.created}
              />
                <CardContent >
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0} spacing={3}>
                  <Typography paragraph>{commantaire.commantaire}</Typography>{' '}
                  <Button
                    onClick={(e) => this.deleteRow(commantaire._id, e)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button></Stack>
                </CardContent>
                
              </Card>
            ))}
          </Stack>
          </Stack>
      
    );
  }
}
